import {
  Search,
  Plus,
  Video,
  Phone,
  MoreHorizontal,
  Home,
  MessageSquare,
  Calendar,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Smile,
  Paperclip,
  Mic,
  Send,
} from "lucide-react"

// Contact/chat list data from the SVG
const chatContacts = [
  {
    id: 1,
    name: "Jake Fischer",
    message: "Group name",
    time: "10 min",
    badge: 8,
    checkGreen: true,
    doubleCheck: false,
    hasAvatar: true,
  },
  {
    id: 2,
    name: "Nick Land",
    message: "Sent attachments",
    time: "40 min",
    badge: 2,
    checkGreen: true,
    doubleCheck: true,
    hasAvatar: true,
  },
  {
    id: 3,
    name: "Falcon Heavy",
    initials: "FH",
    message: "Yes, I'll be there",
    time: "13d",
    checkGreen: false,
    doubleCheck: true,
  },
  {
    id: 4,
    name: "Olivia Smith",
    message: "How are you doing?",
    time: "2d",
    checkGreen: false,
    doubleCheck: true,
    hasAvatar: true,
  },
  {
    id: 5,
    name: "Hailey Peterson",
    message: "Now watching",
    time: "2d",
    checkGreen: false,
    doubleCheck: true,
    hasAvatar: true,
  },
  {
    id: 6,
    name: "Elyes Bou",
    message: "Shipped some features",
    time: "Yes",
    checkGreen: true,
    doubleCheck: true,
    hasAvatar: true,
  },
  {
    id: 7,
    name: "Gill Williams",
    message: "Build the flow",
    time: "3 hrs",
    checkGreen: false,
    doubleCheck: true,
    hasAvatar: true,
  },
  {
    id: 8,
    name: "Jasmine Smith",
    message: "Sent some updates",
    time: "1d",
    checkGreen: false,
    doubleCheck: true,
    hasAvatar: true,
  },
  {
    id: 9,
    name: "Jasmine Smith",
    message: "Lift it to the top",
    time: "3 hrs",
    checkGreen: false,
    doubleCheck: true,
    hasAvatar: true,
  },
  {
    id: 10,
    name: "Jasmine Smith",
    message: "Abtesting",
    time: "1d",
    checkGreen: true,
    doubleCheck: false,
    hasAvatar: true,
  },
]

// Messages in the chat from SVG - these are the actual message bubbles
const messages = [
  {
    id: 1,
    type: "received",
    content: "I know what I need to do now. Thank you for the guidance, really appreciate it.",
    time: "05 min",
  },
  {
    id: 2,
    type: "sent",
    time: "05 min",
    isAttachment: true,
    attachmentType: "file",
    fileName: "readme.doc",
    fileSize: "(10KB)",
  },
  {
    id: 3,
    type: "sent",
    pills: ["Download", "Preview"],
    time: "05 min",
  },
  {
    id: 4,
    type: "received",
    content: "Sounds good, let me know how it goes",
    time: "2d",
  },
  {
    id: 5,
    type: "sent",
    time: "2d",
    isAttachment: true,
    attachmentType: "video",
  },
  {
    id: 6,
    type: "received",
    content: "Now watching",
    time: "2d",
  },
  {
    id: 7,
    type: "sent",
    content: "How does it look?",
    time: "Yes",
  },
  {
    id: 8,
    type: "received",
    content: "Gill Williams: Love it, let me know what you think about the new features",
    time: "1d",
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
  return <div className="absolute bottom-0 right-0 w-[11.25px] h-[11.25px] rounded-full bg-[#4ADE80] border-2 border-white" />
}

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

  // Random gradient avatar placeholder
  return (
    <div
      className="rounded-full bg-gradient-to-br from-amber-200 via-orange-300 to-orange-400"
      style={{ width: size, height: size }}
    />
  )
}

// Left sidebar navigation
function Sidebar() {
  return (
    <div className="w-[75px] bg-white border-r border-[#E7E5E4] flex flex-col items-center py-6 flex-shrink-0">
      {/* Logo */}
      <div className="w-10 h-10 bg-[#0C0A09] rounded-lg flex items-center justify-center mb-8">
        <span className="text-white font-bold text-lg">S</span>
      </div>

      {/* Navigation icons */}
      <nav className="flex flex-col items-center gap-6 flex-1">
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-[#78716C] hover:bg-[#F5F5F4]">
          <Home size={20} strokeWidth={1.5} />
        </button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#F5F5F4] text-[#0C0A09]">
          <MessageSquare size={20} strokeWidth={1.5} />
        </button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-[#78716C] hover:bg-[#F5F5F4]">
          <Calendar size={20} strokeWidth={1.5} />
        </button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-[#78716C] hover:bg-[#F5F5F4]">
          <FileText size={20} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-6">
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-[#78716C] hover:bg-[#F5F5F4]">
          <Settings size={20} strokeWidth={1.5} />
        </button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-[#78716C] hover:bg-[#F5F5F4]">
          <HelpCircle size={20} strokeWidth={1.5} />
        </button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-[#78716C] hover:bg-[#F5F5F4]">
          <LogOut size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}

// Chats list panel
function ChatsPanel() {
  return (
    <div className="w-[360px] bg-white rounded-[7.5px] border border-[#E7E5E4] shadow-sm flex-shrink-0 flex flex-col">
      {/* Header */}
      <div className="p-[23px] pb-[16px]">
        <div className="flex items-center justify-between mb-[23px]">
          <h1 className="text-[16px] font-semibold text-[#0C0A09]">Chats</h1>
          <button className="h-[37.5px] px-[14px] rounded-[5.5px] border border-[#E7E5E4] bg-white flex items-center justify-center gap-1.5">
            <svg width="12.5" height="12.5" viewBox="0 0 13 13" fill="none">
              <circle cx="6.25" cy="6.25" r="6.25" stroke="#0C0A09" strokeWidth="1.25" fill="none" />
              <path d="M3.75 6.25H8.75" stroke="#0C0A09" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.25 3.75V8.75" stroke="#0C0A09" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[13px] text-[#0C0A09]">New</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center h-[37.5px] px-[14px] rounded-[5.5px] border border-[#E7E5E4] bg-white">
          <Search size={15} strokeWidth={1.25} className="text-[#78716C] mr-2" />
          <span className="text-[13px] text-[#78716C]">Channels, chats, or people</span>
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#E7E5E4]">
        {chatContacts.map((contact, index) => (
          <div
            key={contact.id}
            className={`px-[23px] py-[15px] flex items-start gap-[14px] cursor-pointer hover:bg-[#F5F5F4] ${index === 0 ? "bg-[#E5E7EB]" : ""}`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Avatar initials={contact.initials} size={45} />
              <OnlineIndicator />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[14px] font-semibold text-[#0C0A09]">{contact.name}</h3>
                <span className="text-[13px] text-[#78716C]">{contact.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckmarkIcon green={contact.checkGreen} double={contact.doubleCheck} />
                <span className="text-[13px] text-[#78716C] truncate">{contact.message}</span>
              </div>
            </div>

            {/* Badge */}
            {contact.badge && (
              <div className="flex-shrink-0">
                <StatusBadge count={contact.badge} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Message bubble component
function MessageBubble({ message }: { message: (typeof messages)[0] }) {
  const isReceived = message.type === "received"

  if (message.isAttachment) {
    if (message.attachmentType === "file") {
      return (
        <div className={`flex ${isReceived ? "justify-start" : "justify-end"} mb-4`}>
          <div className="max-w-[580px]">
            <div className="bg-white rounded-[7.5px] border border-[#E7E5E4] p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-[30px] h-[30px] bg-[#F5F5F4] rounded flex items-center justify-center opacity-50">
                  <FileText size={18} strokeWidth={1.5} className="text-[#0C0A09]" />
                </div>
                <div>
                  <p className="text-[13px] text-[#0C0A09]">readme.doc {message.fileSize}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-[5.5px] border border-[#E7E5E4] text-[13px] text-[#0C0A09]">
                  Download
                </button>
                <button className="px-3 py-1.5 rounded-[5.5px] border border-[#E7E5E4] text-[13px] text-[#0C0A09]">
                  Preview
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-1">
              <span className="text-[13px] text-[#78716C]">{message.time}</span>
              <MoreHorizontal size={15} className="text-[#78716C]" />
            </div>
          </div>
        </div>
      )
    }

    if (message.attachmentType === "video") {
      return (
        <div className={`flex ${isReceived ? "justify-start" : "justify-end"} mb-4`}>
          <div className="max-w-[195px]">
            <div className="w-[195px] h-[146.25px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-[7.5px] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white/80 border-b-[10px] border-b-transparent ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 text-white/80 text-xs">2:35</div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-1">
              <span className="text-[13px] text-[#78716C]">{message.time}</span>
              <MoreHorizontal size={15} className="text-[#78716C]" />
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className={`flex ${isReceived ? "justify-start" : "justify-end"} mb-4`}>
      <div className="max-w-[580px]">
        <div className="bg-white rounded-[7.5px] border border-[#E7E5E4] px-4 py-3 shadow-sm">
          <p className="text-[13px] text-[#0C0A09] leading-relaxed">{message.content}</p>
        </div>
        <div className={`flex items-center gap-2 mt-1 ${isReceived ? "justify-start" : "justify-end"}`}>
          <span className="text-[13px] text-[#78716C]">{message.time}</span>
          <MoreHorizontal size={15} className="text-[#78716C]" />
        </div>
      </div>
    </div>
  )
}

// Main chat area
function ChatArea() {
  return (
    <div className="flex-1 flex flex-col bg-white rounded-[7.5px] border border-[#E7E5E4] shadow-sm overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-[#E7E5E4] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar size={45} />
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
          <button className="w-8 h-8 flex items-center justify-center">
            <MoreHorizontal size={15} strokeWidth={1.25} className="text-[#0C0A09]" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Message Input */}
      <div className="px-6 py-4 border-t border-[#E7E5E4]">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#78716C] hover:bg-[#F5F5F4]">
            <Smile size={20} strokeWidth={1.5} />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#78716C] hover:bg-[#F5F5F4]">
            <Paperclip size={20} strokeWidth={1.5} />
          </button>
          <div className="flex-1 h-[45px] px-4 rounded-[7.5px] border border-[#E7E5E4] bg-white flex items-center">
            <input
              type="text"
              placeholder="Type your message here..."
              className="w-full text-[13px] text-[#0C0A09] placeholder:text-[#78716C] outline-none bg-transparent"
            />
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#78716C] hover:bg-[#F5F5F4]">
            <Mic size={20} strokeWidth={1.5} />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#0C0A09] flex items-center justify-center text-white">
            <Send size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SohoChatApp() {
  return (
    <div className="min-h-screen bg-[#F5F5F4]">
      <div className="flex h-screen">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex p-[45px] gap-[15px]">
          {/* Chats List */}
          <ChatsPanel />

          {/* Chat Area */}
          <ChatArea />
        </div>
      </div>
    </div>
  )
}
