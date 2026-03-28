import { Video, Phone, Check } from "lucide-react"

// Situation list items from the SVG
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

// Chat messages
const chatMessages = [
  {
    id: 1,
    type: "received",
    content: "I know what I need to do now. Thank you for the guidance, really appreciate it.",
    time: "05 min",
  },
  {
    id: 2,
    type: "sent",
    content: "asertain get sth by evidence ...",
    time: "05 min",
    isVocab: true,
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
function Avatar({ initials, size = 45 }: { initials?: string; size?: number }) {
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
  return (
    <div
      className="rounded-full bg-gradient-to-br from-amber-200 via-orange-300 to-orange-400"
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
function SituationsPanel() {
  return (
    <div className="w-[320px] flex-shrink-0 bg-white rounded-[7.5px] border border-[#E7E5E4] flex flex-col overflow-hidden">
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
function ActiveChatPanel() {
  return (
    <div className="flex-1 flex flex-col bg-white rounded-[7.5px] border border-[#E7E5E4] overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-[#E7E5E4] flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar size={45} />
            <OnlineIndicator />
          </div>
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

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
        {/* Received message - left aligned */}
        <div className="flex justify-start mb-4">
          <div className="max-w-[500px]">
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
          <div className="max-w-[500px]">
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
        <div className="p-6 flex items-end gap-4">
          {/* Left side: Syntax Box and Options */}
          <div className="flex-1">
            {/* The Syntax Box */}
            <div className="bg-white border border-[#E7E5E4] rounded-full px-6 py-3 mb-4">
              <p className="text-[14px] text-[#0C0A09]">
                I agree, but I{" "}
                <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 rounded text-[13px] font-medium">
                  [know.receive]
                </span>{" "}
                it too late.
              </p>
            </div>

            {/* The Options Grid - Vocabulary options */}
            <div className="flex flex-wrap gap-3">
              <span className="text-[13px] text-[#22C55E]">ascertain get sth by evidence ...</span>
              <span className="text-[13px] text-[#22C55E]">perceive become aware of ...</span>
              <span className="text-[13px] text-[#22C55E]">discern recognize or distinguish ...</span>
            </div>
          </div>

          {/* Right side: User Avatar with Progress Ring */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* User info stack */}
            <div className="text-right">
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
                <div className="w-[43px] h-[43px] rounded-full bg-gradient-to-br from-purple-300 via-pink-300 to-rose-300" />
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FluencyFramesApp() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen p-6 gap-4">
        {/* Left Column: Situations List */}
        <SituationsPanel />

        {/* Right Column: Active Chat */}
        <ActiveChatPanel />
      </div>
    </div>
  )
}
