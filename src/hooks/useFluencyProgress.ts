import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useFluencyProgress(userId: string | null | undefined) {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateScore = async (
    threadId: string,
    pointsEarned: number,
    isComplete: boolean = false
  ) => {
    if (!userId) {
      console.warn('useFluencyProgress: missing userId');
      return;
    }

    setIsUpdating(true);

    try {
      const status = isComplete ? 'completed' : 'in_progress';
      const last_interacted_at = new Date().toISOString();

      const { error } = await supabase
        .from('thread_progress')
        .upsert(
          {
            user_id: userId,
            thread_id: threadId,
            status,
            current_score: pointsEarned,
            last_interacted_at,
          },
          { onConflict: 'user_id, thread_id' }
        );

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating fluency progress:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateScore, isUpdating };
}
