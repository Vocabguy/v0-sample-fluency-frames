import { Search, Plus, Video, Phone, MoreHorizontal } from "lucide-react"

// Task data from SVG - checklist items
const checklistItems = [
  {
    id: 1,
    name: "Jake Fischer",
    avatarColor: "from-amber-400 to-orange-500",
    message: "Group name",
    date: "10 min",
    badge: 8,
    checkGreen: true,
    doubleCheck: false,
  },
  {
    id: 2,
    name: "Nick Land",
    avatarColor: "from-blue-400 to-blue-600",
    message: "Sent attachments",
    date: "40 min",
    badge: 2,
    checkGreen: true,
    doubleCheck: true,
  },
  {
    id: 3,
    initials: "FH",
    name: "Falcon Heavy",
    message: "Yes, I'll be there",
    date: "13d",
    checkGreen: false,
    doubleCheck: true,
  },
  {
    id: 4,
    name: "Olivia Smith",
    avatarColor: "from-pink-400 to-pink-600",
    message: "How are you doing?",
    date: "2d",
    checkGreen: false,
    doubleCheck: true,
  },
  {
    id: 5,
    name: "Hailey Peterson",
    avatarColor: "from-purple-400 to-purple-600",
    message: "Now watching",
    date: "2d",
    checkGreen: false,
    doubleCheck: true,
  },
  {
    id: 6,
    name: "Elyes Bou",
    avatarColor: "from-teal-400 to-teal-600",
    message: "Shipped some features",
    date: "Yes",
    checkGreen: true,
    doubleCheck: true,
  },
  {
    id: 7,
    name: "Gill Williams",
    avatarColor: "from-indigo-400 to-indigo-600",
    message: "Build the flow",
    date: "3 hrs",
    checkGreen: false,
    doubleCheck: true,
  },
  {
    id: 8,
    name: "Jasmine Smith",
    avatarColor: "from-rose-400 to-rose-600",
    message: "Sent some updates",
    date: "1d",
    checkGreen: false,
    doubleCheck: true,
  },
  {
    id: 9,
    name: "Jasmine Smith",
    avatarColor: "from-cyan-400 to-cyan-600",
    message: "Lift it to the top",
    date: "3 hrs",
    checkGreen: false,
    doubleCheck: true,
  },
  {
    id: 10,
    name: "Jasmine Smith",
    avatarColor: "from-emerald-400 to-emerald-600",
    message: "Abtesting",
    date: "1d",
    checkGreen: true,
    doubleCheck: false,
  },
]

function CheckmarkIcon({ green, double }: { green?: boolean; double?: boolean }) {
  const color = green ? "#22C55E" : "#78716C"
  
  if (double) {
    return (
      <div className="flex items-center">
        <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
          <path
            d="M11.5 1.5L4.625 8.375L1.5 5.25"
            stroke={color}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" style={{ marginLeft: "-5px" }}>
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

function StatusBadge({ count }: { count: number }) {
  return (
    <div className="w-[22.5px] h-[22.5px] rounded-full bg-[#22C55E] flex items-center justify-center">
      <span className="text-white text-xs font-medium">{count}</span>
    </div>
  )
}

function OnlineIndicator() {
  return (
    <div className="absolute bottom-0 right-0 w-[11.25px] h-[11.25px] rounded-full bg-[#4ADE80] border-2 border-white" />
  )
}

function Avatar({ avatarColor, initials }: { avatarColor?: string; initials?: string }) {
  if (initials) {
    return (
      <div className="w-[45px] h-[45px] rounded-full bg-[#F5F5F4] flex items-center justify-center">
        <span className="text-[14px] font-semibold text-[#0C0A09]">{initials}</span>
      </div>
    )
  }
  
  return (
    <div className={`w-[45px] h-[45px] rounded-full bg-gradient-to-br ${avatarColor || "from-gray-300 to-gray-400"}`} />
  )
}

export default function TaskManagerApp() {
  return (
    <div className="min-h-screen bg-[#F5F5F4] p-[45px]">
      <div className="flex gap-[15px]">
        {/* Left Sidebar - Checklist */}
        <div className="w-[360px] bg-white rounded-[7.5px] border border-[#E7E5E4] shadow-sm flex-shrink-0">
          {/* Header */}
          <div className="p-[23px] pb-[16px]">
            <div className="flex items-center justify-between mb-[23px]">
              <h1 className="text-[16px] font-semibold text-[#0C0A09]">Checklist</h1>
              <button className="h-[37.5px] px-[14px] rounded-[5.5px] border border-[#E7E5E4] bg-white flex items-center justify-center gap-1.5">
                <svg width="12.5" height="12.5" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.25" cy="6.25" r="6.25" stroke="#0C0A09" strokeWidth="1.25" fill="none"/>
                  <path d="M3.75 6.25H8.75" stroke="#0C0A09" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.25 3.75V8.75" stroke="#0C0A09" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[13px] text-[#0C0A09]">project</span>
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <div className="flex items-center h-[37.5px] px-[14px] rounded-[5.5px] border border-[#E7E5E4] bg-white">
                <Search size={15} strokeWidth={1.25} className="text-[#78716C] mr-2" />
                <span className="text-[13px] text-[#78716C]">Channels, chats, or people</span>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="divide-y divide-[#E7E5E4]">
            {checklistItems.map((item) => (
              <div key={item.id} className="px-[23px] py-[15px] flex items-start gap-[14px]">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <Avatar avatarColor={item.avatarColor} initials={item.initials} />
                  <OnlineIndicator />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[14px] font-semibold text-[#0C0A09]">{item.name}</h3>
                    <span className="text-[13px] text-[#78716C]">{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckmarkIcon green={item.checkGreen} double={item.doubleCheck} />
                    <span className="text-[13px] text-[#78716C]">{item.message}</span>
                  </div>
                </div>
                
                {/* Badge */}
                {item.badge && (
                  <div className="flex-shrink-0">
                    <StatusBadge count={item.badge} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-0">
          {/* Top Row - Profile Card and Action Buttons */}
          <div className="flex items-center justify-between mb-4">
            {/* Profile Card */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-[45px] h-[45px] rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
                <OnlineIndicator />
              </div>
              <div>
                <h2 className="text-[14px] font-semibold text-[#0C0A09]">Jake Fischer</h2>
                <p className="text-[13px] text-[#78716C]">Click here for group profile</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="w-[47px] h-[37.5px] rounded-[5.5px] border border-[#E7E5E4] bg-white flex items-center justify-center">
                <Video size={15} strokeWidth={1.25} className="text-[#0C0A09]" />
              </button>
              <button className="w-[47px] h-[37.5px] rounded-[5.5px] border border-[#E7E5E4] bg-white flex items-center justify-center">
                <Phone size={15} strokeWidth={1.25} className="text-[#0C0A09]" />
              </button>
              <div className="flex items-center justify-center w-8">
                <MoreHorizontal size={15} strokeWidth={1.25} className="text-[#0C0A09]" />
              </div>
            </div>
          </div>

          {/* Search Panel */}
          <div className="bg-white rounded-[7.5px] border border-[#E7E5E4] shadow-sm mb-4">
            <div className="flex items-center h-[54px] px-[18px]">
              <Search size={15} strokeWidth={1.25} className="text-[#78716C] mr-3" />
              <span className="text-[13px] text-[#78716C]">Search articles, help guides, or resources...</span>
            </div>
          </div>

          {/* Knowledge Base Card */}
          <div className="bg-white rounded-[7.5px] border border-[#E7E5E4] p-[18px] shadow-sm">
            <div className="flex items-start gap-5">
              <div className="w-[92px] h-[92px] rounded-lg bg-[#E5E7EB] overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="8" y="6" width="24" height="28" rx="2" stroke="#6B7280" strokeWidth="2" fill="none"/>
                    <line x1="12" y1="12" x2="28" y2="12" stroke="#6B7280" strokeWidth="2"/>
                    <line x1="12" y1="18" x2="28" y2="18" stroke="#6B7280" strokeWidth="2"/>
                    <line x1="12" y1="24" x2="20" y2="24" stroke="#6B7280" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <h3 className="text-[14px] font-semibold text-[#0C0A09] mb-2">Knowledge Base</h3>
                <p className="text-[13px] text-[#78716C] leading-relaxed">
                  Find answers to frequently asked questions, browse helpful articles, and learn how to get the most out of our platform.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <CheckmarkIcon green double />
                  <span className="text-[13px] text-[#78716C]">05 items</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <StatusBadge count={8} />
              </div>
            </div>
          </div>

          {/* Counter Display */}
          <div className="flex items-center justify-between text-[13px] mt-4 px-1">
            <span className="text-[#78716C]">0</span>
            <span className="text-[#78716C]">Showing 1 of 5</span>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[300px] flex-shrink-0">
          {/* Profile Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-[45px] h-[45px] rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
              <OnlineIndicator />
            </div>
            <div className="flex-1">
              <h3 className="text-[14px] font-semibold text-[#0C0A09]">Jake Fischer</h3>
              <p className="text-[13px] text-[#78716C]">Click here for group profile</p>
            </div>
            <div className="flex items-center justify-center">
              <MoreHorizontal size={15} strokeWidth={1.25} className="text-[#0C0A09]" />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-3">
            {/* Row 1 - 10 min / 40 min */}
            <div className="bg-white rounded-[7.5px] border border-[#E7E5E4] p-[14px] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] text-[#78716C]">10 min</div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckmarkIcon green double />
                </div>
              </div>
            </div>

            {/* Row 2 - 40 min */}
            <div className="bg-white rounded-[7.5px] border border-[#E7E5E4] p-[14px] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] text-[#78716C]">40 min</div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckmarkIcon green double />
                </div>
              </div>
            </div>

            {/* Row 3 - 13d */}
            <div className="bg-white rounded-[7.5px] border border-[#E7E5E4] p-[14px] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] text-[#78716C]">13d</div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckmarkIcon double />
                </div>
              </div>
            </div>

            {/* Row 4 - 2d */}
            <div className="bg-white rounded-[7.5px] border border-[#E7E5E4] p-[14px] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] text-[#78716C]">2d</div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckmarkIcon double />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
