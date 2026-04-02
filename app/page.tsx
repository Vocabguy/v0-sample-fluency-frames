"use client"

import { Video, Phone, ChevronLeft, Info } from "lucide-react"
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import AuthForm from '@/components/auth/AuthForm'
import { useAuth } from '@/contexts/AuthContext'
import { useFluencyProgress } from '@/hooks/useFluencyProgress'

// Situation list items
const situations = [
  {
    id: 1,
    name: "Jake Fischer",
    subtext: "Group name",
    time: "10 min",
    badge: 8,
    isActive: true,
  },
  {
    id: 2,
    name: "Nick Land",
    subtext: "Sent attachments",
    time: "40 min",
    badge: 2,
  },
  {
    id: 3,
    name: "Falcon Heavy",
    initials: "FH",
    subtext: "Yes, I'll be there",
    time: "13d",
    doubleCheck: true,
  },
  {
    id: 4,
    name: "Olivia Smith",
    subtext: "How are you doing?",
    time: "2d",
    doubleCheck: true,
    grayCheck: true,
  },
]

// Double checkmark SVG component
function DoubleCheck({ green = true }: { green?: boolean }) {
  const color = green ? "#22C55E" : "#78716C"
  return (
    <div className="flex items-center -space-x-1">
      <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
        <path
          d="M11.5 1.5L4.625 8.375L1.5 5.25"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
        <path
          d="M6.5 1.5L1.812 6.188L0.875 5.25"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// Single checkmark
function SingleCheck({ green = true }: { green?: boolean }) {
  const color = green ? "#22C55E" : "#78716C"
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
      <path
        d="M11.5 1.5L4.625 8.375L1.5 5.25"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Online status indicator
function OnlineIndicator() {
  return (
    <div className="absolute bottom-0 right-0 w-[11.25px] h-[11.25px] rounded-full bg-[#4ADE80] border-2 border-white" />
  )
}

// Avatar component with gradient
function Avatar({ initials, size = 45, variant = "default" }: { initials?: string; size?: number; variant?: "default" | "purple" }) {
  if (initials) {
    return (
      <div
        className="rounded-full bg-[#F5F5F4] flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="text-[14px] font-semibold text-[#0C0A09]">{initials}</span>
      </div>
    )
  }
  
  const gradientClass = variant === "purple" 
    ? "bg-gradient-to-br from-purple-300 via-pink-300 to-rose-300"
    : "bg-gradient-to-br from-amber-200 via-orange-300 to-orange-400"
    
  return (
    <div
      className={`rounded-full ${gradientClass}`}
      style={{ width: size, height: size }}
    />
  )
}

// Green badge with number
function CountBadge({ count }: { count: number }) {
  return (
    <div className="w-[22.5px] h-[22.5px] rounded-full bg-[#22C55E] flex items-center justify-center">
      <span className="text-white text-xs font-medium">{count}</span>
    </div>
  )
}

// Left column - Situations list
function SituationsPanel({ onSelectSituation }: { onSelectSituation: () => void }) {
  return (
    <div className="w-full md:w-[320px] flex-shrink-0 bg-white rounded-[7.5px] border border-[#E7E5E4] flex flex-col overflow-hidden h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#E7E5E4]">
        <div className="flex items-center justify-between">
          <h1 className="text-[16px] font-semibold text-[#0C0A09]">Situations</h1>
          <div className="px-3 py-1.5 bg-white border border-[#E7E5E4] rounded-[5.5px]">
            <span className="text-[13px] text-[#0C0A09]">1/2500</span>
          </div>
        </div>
      </div>

      {/* Situations List */}
      <div className="flex-1 overflow-y-auto">
        {situations.map((situation) => (
          <div
            key={situation.id}
            onClick={onSelectSituation}
            className={`px-6 py-4 border-b border-[#E7E5E4] flex items-start gap-3.5 cursor-pointer ${
              situation.isActive ? "bg-slate-200" : "hover:bg-slate-50"
            }`}
          >
            {/* Avatar with online indicator */}
            <div className="relative flex-shrink-0">
              <Avatar initials={situation.initials} size={45} />
              <OnlineIndicator />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[14px] font-semibold text-[#0C0A09]">{situation.name}</h3>
                <span className="text-[13px] text-[#78716C]">{situation.time}</span>
              </div>
              <div className="flex items-center gap-2">
                {situation.doubleCheck ? (
                  <DoubleCheck green={!situation.grayCheck} />
                ) : (
                  <SingleCheck green />
                )}
                <span className="text-[13px] text-[#78716C] truncate">{situation.subtext}</span>
              </div>
            </div>

            {/* Badge */}
            {situation.badge && (
              <div className="flex-shrink-0">
                <CountBadge count={situation.badge} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Right column - Active chat and bottom action stack
function ActiveChatPanel({ 
  onBack, 
  onOpenInterlocutorSheet, 
  onOpenUserSheet 
}: { 
  onBack: () => void
  onOpenInterlocutorSheet: () => void
  onOpenUserSheet: () => void
}) {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <div className="flex-1 flex flex-col bg-white rounded-[7.5px] border border-[#E7E5E4] overflow-hidden h-full">
      {/* Chat Header */}
      <div className="px-4 md:px-6 py-4 border-b border-[#E7E5E4] bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Back button - mobile only */}
            <button
              onClick={onBack}
              className="md:hidden w-[37.5px] h-[37.5px] rounded-[5.5px] border border-[#E7E5E4] bg-white flex items-center justify-center hover:bg-slate-50"
            >
              <ChevronLeft size={18} strokeWidth={1.5} className="text-[#0C0A09]" />
            </button>
            
            {/* Interlocutor avatar - clickable */}
            <button 
              onClick={onOpenInterlocutorSheet}
              className="relative cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Avatar size={45} />
              <OnlineIndicator />
            </button>
            <div>
              <h2 className="text-[14px] font-semibold text-[#0C0A09]">Jake Fischer</h2>
              <p className="text-[13px] text-[#78716C]">interlocutor role</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="w-[47px] h-[37.5px] rounded-[5.5px] border border-[#E7E5E4] bg-white flex items-center justify-center hover:bg-slate-50">
              <Video size={15} strokeWidth={1.25} className="text-[#0C0A09]" />
            </button>
            <button className="w-[47px] h-[37.5px] rounded-[5.5px] border border-[#E7E5E4] bg-white flex items-center justify-center hover:bg-slate-50">
              <Phone size={15} strokeWidth={1.25} className="text-[#0C0A09]" />
            </button>
          </div>
        </div>

        {/* Situation Context Bar */}
        <div className="mt-4 pt-4 border-t border-[#E7E5E4]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-semibold text-[#0C0A09]">Situation: Scope Alignment</h3>
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="w-[24px] h-[24px] rounded-full border border-[#E7E5E4] bg-white flex items-center justify-center hover:bg-slate-50"
              >
                <Info size={12} strokeWidth={1.5} className="text-[#78716C]" />
              </button>
            </div>
          </div>
          
          {/* Expandable Description */}
          {showDescription && (
            <p className="mt-3 text-[13px] text-[#78716C] leading-relaxed">
              Marcus is pushing for an out-of-scope mobile prototype to be delivered by tomorrow. You need to enforce project boundaries and defend the original Statement of Work without damaging the client relationship.
            </p>
          )}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
        {/* Received message - left aligned */}
        <div className="flex justify-start mb-4">
          <div className="max-w-[85%] md:max-w-[500px]">
            <div className="bg-white rounded-[7.5px] border border-[#E7E5E4] px-4 py-3">
              <p className="text-[13px] text-[#0C0A09] leading-relaxed">
                I know what I need to do now. Thank you for the guidance, really appreciate it.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[12px] text-[#78716C]">05 min</span>
            </div>
          </div>
        </div>

        {/* Sent message - right aligned */}
        <div className="flex justify-end mb-4">
          <div className="max-w-[85%] md:max-w-[500px]">
            <div className="bg-white rounded-[7.5px] border border-[#E7E5E4] px-4 py-3">
              <p className="text-[13px] text-[#22C55E] leading-relaxed">
                asertain get sth by evidence ...
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 mt-1">
              <span className="text-[12px] text-[#78716C]">05 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* THE BOTTOM ACTION STACK - Most Important Part */}
      <div className="border-t border-[#E7E5E4] bg-white">
        <div className="p-4 md:p-6 flex items-end gap-4">
          {/* Left side: Syntax Box and Options */}
          <div className="flex-1">
            {/* The Syntax Box */}
            <div className="bg-white border border-[#E7E5E4] rounded-full px-4 md:px-6 py-3 mb-4">
              <p className="text-[13px] md:text-[14px] text-[#0C0A09]">
                I agree, but I{" "}
                <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 rounded text-[12px] md:text-[13px] font-medium">
                  [know.receive]
                </span>{" "}
                it too late.
              </p>
            </div>

            {/* The Options Grid - Vocabulary options */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              <span className="text-[12px] md:text-[13px] text-[#22C55E]">ascertain get sth by evidence ...</span>
              <span className="text-[12px] md:text-[13px] text-[#22C55E]">perceive become aware of ...</span>
              <span className="text-[12px] md:text-[13px] text-[#22C55E] hidden md:inline">discern recognize or distinguish ...</span>
            </div>
          </div>

          {/* Right side: User Avatar with Progress Ring - clickable */}
          <button 
            onClick={onOpenUserSheet}
            className="flex items-center gap-3 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            {/* User info stack */}
            <div className="text-right hidden md:block">
              <p className="text-[13px] font-medium text-[#0C0A09]">user name</p>
              <p className="text-[12px] text-[#78716C]">user role</p>
              {/* Progress box */}
              <div className="mt-1 bg-white border border-[#E7E5E4] rounded px-2 py-0.5 inline-block">
                <span className="text-[12px] text-[#0C0A09]">42%</span>
              </div>
            </div>

            {/* Avatar with colored progress ring */}
            <div className="relative">
              {/* Progress ring - circular border */}
              <div className="w-[47px] h-[47px] rounded-full border-2 border-black/20 flex items-center justify-center">
                {/* Actual avatar */}
                <Avatar size={43} variant="purple" />
              </div>
              {/* Progress indicator overlay using SVG */}
              <svg
                className="absolute inset-0 w-[47px] h-[47px] -rotate-90"
                viewBox="0 0 47 47"
              >
                <circle
                  cx="23.5"
                  cy="23.5"
                  r="22"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="2"
                  strokeDasharray={`${0.42 * 138.2} ${138.2}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22C55E" />
                    <stop offset="100%" stopColor="#4ADE80" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

// Interlocutor Profile Sheet Content
function InterlocutorProfileSheet() {
  return (
    <>
      <SheetHeader>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar size={60} />
            <OnlineIndicator />
          </div>
          <div>
            <SheetTitle>Jake Fischer</SheetTitle>
            <SheetDescription>Interlocutor Role</SheetDescription>
          </div>
        </div>
      </SheetHeader>
      
      <div className="p-4 space-y-4">
        <div>
          <h4 className="text-[13px] font-semibold text-[#0C0A09] mb-2">Bio</h4>
          <p className="text-[13px] text-[#78716C] leading-relaxed">
            Pays the bills and feels entitled to everything. He constantly tries to squeeze free work out of your agency by feigning disappointment. Requires high-level corporate diplomacy to manage.
          </p>
        </div>
        
        <div className="pt-4 border-t border-[#E7E5E4]">
          <h4 className="text-[13px] font-semibold text-[#0C0A09] mb-2">Communication Style</h4>
          <p className="text-[13px] text-[#78716C] leading-relaxed">
            Direct but passive-aggressive. Often uses guilt tactics and references past business to justify unreasonable requests.
          </p>
        </div>
        
        <div className="pt-4 border-t border-[#E7E5E4]">
          <h4 className="text-[13px] font-semibold text-[#0C0A09] mb-2">Key Triggers</h4>
          <ul className="text-[13px] text-[#78716C] space-y-1">
            <li>- Feeling undervalued</li>
            <li>- Hearing the word &quot;no&quot; directly</li>
            <li>- Being compared to other clients</li>
          </ul>
        </div>
      </div>
    </>
  )
}

// User Profile Sheet Content
function UserProfileSheet() {
  return (
    <>
      <SheetHeader>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-[60px] h-[60px] rounded-full border-2 border-black/20 flex items-center justify-center">
              <Avatar size={56} variant="purple" />
            </div>
          </div>
          <div>
            <SheetTitle>User Name</SheetTitle>
            <SheetDescription>User Role</SheetDescription>
          </div>
        </div>
      </SheetHeader>
      
      <div className="p-4 space-y-6">
        {/* User Profile Section */}
        <div>
          <h4 className="text-[13px] font-semibold text-[#0C0A09] mb-3">User Profile</h4>
          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-[13px] text-[#78716C]">Email</span>
              <span className="text-[13px] text-[#0C0A09]">user@example.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[13px] text-[#78716C]">Member since</span>
              <span className="text-[13px] text-[#0C0A09]">Jan 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[13px] text-[#78716C]">Current Level</span>
              <span className="text-[13px] text-[#0C0A09]">Intermediate</span>
            </div>
          </div>
        </div>
        
        {/* Fluency Stats Section */}
        <div className="pt-4 border-t border-[#E7E5E4]">
          <h4 className="text-[13px] font-semibold text-[#0C0A09] mb-3">Fluency Stats</h4>
          <div className="bg-slate-50 rounded-lg p-4 space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[13px] text-[#78716C]">Overall Progress</span>
                <span className="text-[13px] text-[#22C55E] font-medium">42%</span>
              </div>
              <div className="w-full h-2 bg-[#E7E5E4] rounded-full">
                <div className="w-[42%] h-full bg-[#22C55E] rounded-full" />
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-[13px] text-[#78716C]">Situations Completed</span>
              <span className="text-[13px] text-[#0C0A09]">12 / 50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[13px] text-[#78716C]">Vocabulary Mastered</span>
              <span className="text-[13px] text-[#0C0A09]">156 words</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[13px] text-[#78716C]">Streak</span>
              <span className="text-[13px] text-[#0C0A09]">7 days</span>
            </div>
          </div>
        </div>
        
        {/* Billing Section */}
        <div className="pt-4 border-t border-[#E7E5E4]">
          <h4 className="text-[13px] font-semibold text-[#0C0A09] mb-3">Billing</h4>
          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-[13px] text-[#78716C]">Plan</span>
              <span className="text-[13px] text-[#0C0A09]">Pro Monthly</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[13px] text-[#78716C]">Next billing</span>
              <span className="text-[13px] text-[#0C0A09]">Apr 15, 2024</span>
            </div>
            <button className="w-full mt-2 py-2 text-[13px] text-[#78716C] border border-[#E7E5E4] rounded-lg hover:bg-white transition-colors">
              Manage Subscription
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default function FluencyFramesApp() {
  const { user, isLoading } = useAuth()
  const { updateScore, isUpdating } = useFluencyProgress(user?.id ?? null)

  // State for mobile view toggle
  const [showChat, setShowChat] = useState(false)
  
  // State for sheet modals
  const [interlocutorSheetOpen, setInterlocutorSheetOpen] = useState(false)
  const [userSheetOpen, setUserSheetOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen p-4 md:p-6 gap-4">
        {/* Left Column: Situations List */}
        {/* On mobile: shown by default, hidden when chat is active */}
        {/* On desktop (md+): always shown */}
        <div className={`${showChat ? 'hidden' : 'flex'} md:flex w-full md:w-auto`}>
          <SituationsPanel onSelectSituation={() => setShowChat(true)} />
        </div>

        {/* Right Column: Active Chat */}
        {/* On mobile: hidden by default, shown when chat is active */}
        {/* On desktop (md+): always shown */}
        <div className={`${showChat ? 'flex' : 'hidden'} md:flex flex-1`}>
          <ActiveChatPanel 
            onBack={() => setShowChat(false)}
            onOpenInterlocutorSheet={() => setInterlocutorSheetOpen(true)}
            onOpenUserSheet={() => setUserSheetOpen(true)}
          />
        </div>
      </div>

      {/* Interlocutor Profile Sheet */}
      <Sheet open={interlocutorSheetOpen} onOpenChange={setInterlocutorSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <InterlocutorProfileSheet />
        </SheetContent>
      </Sheet>

      {/* User Profile Sheet */}
      <Sheet open={userSheetOpen} onOpenChange={setUserSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <UserProfileSheet />
        </SheetContent>
      </Sheet>
    </div>
  )
}
