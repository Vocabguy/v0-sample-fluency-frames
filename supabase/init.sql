-- Supabase schema initialization for profiles + thread progress

-- 1. Create a Profiles table that links to Supabase Auth
create table public.profiles (
  id uuid references auth.users not null primary key,
  display_name text,
  total_fluency_score integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create the Progress tracking table
create table public.thread_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  thread_id text not null,
  status text check (status in ('unread', 'in_progress', 'completed')) default 'unread',
  current_score integer default 0,
  last_interacted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, thread_id)
);

-- 3. Enable RLS (Crucial for production)
alter table public.profiles enable row level security;
alter table public.thread_progress enable row level security;

-- 4. Create Security Policies
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can view own progress" on public.thread_progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on public.thread_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on public.thread_progress for update using (auth.uid() = user_id);

-- 5. Auto-create profile on signup (Trigger)
create function public.handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
