import { UserProfile } from "../types";
import { 
  LayoutDashboard, 
  UserCircle, 
  GraduationCap, 
  CheckCircle2, 
  Compass, 
  SlidersHorizontal, 
  MessageSquareCode, 
  LogOut,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  profile: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  isCollapsedStyle?: boolean;
}

export default function Sidebar({ 
  profile, 
  activeTab, 
  setActiveTab, 
  onLogout,
  isCollapsedStyle = false
}: SidebarProps) {
  
  // Exact sidebar items requested
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "passport", label: "Financial Passport", icon: UserCircle },
    { id: "verification", label: "Verification", icon: CheckCircle2 },
    { id: "marketplace", label: "Marketplace", icon: Compass },
    { id: "roadmap", label: "Roadmap", icon: ChevronRight },
    { id: "simulator", label: "Simulator", icon: SlidersHorizontal },
    { id: "coach", label: "AI Trust Coach", icon: MessageSquareCode },
  ];

  // Map tiers
  let scoreTier = "Starter Team";
  if (profile.currentTrustScore >= 851) scoreTier = "Finance Ready";
  else if (profile.currentTrustScore >= 751) scoreTier = "Opportunity Ready";
  else if (profile.currentTrustScore >= 601) scoreTier = "Achiever";
  else if (profile.currentTrustScore >= 451) scoreTier = "Builder";

  return (
    <aside className="w-full h-full bg-zinc-950 text-zinc-300 flex flex-col justify-between" id="sidebar-aside-frame">
      <div className="flex flex-col flex-grow">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-zinc-900 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-indigo-500/20 shadow-md">
            CB
          </div>
          <div className="overflow-hidden">
            <span className="text-sm font-extrabold tracking-tight text-white block">CredBridge</span>
            <span className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase block">Identity Mint</span>
          </div>
        </div>

        {/* User summary badge block */}
        <div className="p-4 mx-4 my-6 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex items-center gap-2.5">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/30 object-cover"
          />
          <div className="overflow-hidden">
            <span className="text-xs font-bold text-white block truncate">{profile.name}</span>
            <span className="text-[10px] text-zinc-500 block truncate flex items-center gap-1 font-mono">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              Grad {profile.graduationYear}
            </span>
          </div>
        </div>

        {/* Sidebar Sections */}
        <nav className="flex-1 px-3 space-y-1 block">
          <span className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest block mb-1.5 font-mono">
            Platform Hub
          </span>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-indigo-600/10 border border-indigo-500/30 text-white shadow-xl shadow-indigo-950/20"
                    : "border border-transparent text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
                id={`sidebar-tab-${item.id}`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <IconComponent className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Segment: TrustScore indicator panel */}
      <div className="p-4 border-t border-zinc-900 select-none">
        <div className="p-3.5 rounded-xl bg-zinc-900/30 border border-zinc-800/60 flex flex-col items-center">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest font-mono">My TrustScore</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-extrabold text-white tracking-tight">{profile.currentTrustScore}</span>
            <span className="text-[10px] text-zinc-500 font-mono">/ 900</span>
          </div>
          <span className="text-[9px] text-indigo-400 font-bold tracking-wider mt-0.5">{scoreTier}</span>
          <div className="w-full bg-zinc-800/50 h-1 rounded-full mt-2.5 overflow-hidden">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, Math.max(0, ((profile.currentTrustScore - 300) / 600) * 100))}%` }}
            />
          </div>
        </div>

        {/* Exit Account Option */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 mt-4 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer"
          id="exit-account-btn"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Account</span>
        </button>
      </div>
    </aside>
  );
}
