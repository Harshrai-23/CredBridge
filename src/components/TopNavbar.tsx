import { useState } from "react";
import { UserProfile, VerificationItem } from "../types";
import { 
  Bell, 
  Menu, 
  X, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  LayoutDashboard,
  UserCircle,
  CheckCircle2,
  Compass,
  ChevronRight,
  SlidersHorizontal,
  LogOut,
  ChevronDown
} from "lucide-react";

interface TopNavbarProps {
  profile: UserProfile;
  verificationItems: VerificationItem[];
  unreadCount?: number;
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function TopNavbar({ 
  profile, 
  verificationItems, 
  unreadCount = 2, 
  onMenuToggle, 
  isMobileMenuOpen,
  setActiveTab,
  onLogout
}: TopNavbarProps) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Dynamic calculations for navbar stats
  const totalItems = verificationItems.length;
  const verifiedItemsCount = verificationItems.filter(item => item.status === "verified").length;
  const verificationProgress = Math.round((verifiedItemsCount / totalItems) * 100);

  // Score tier
  let scoreTier = "Starter";
  let tierColorClass = "text-rose-400 bg-rose-500/10 border-rose-500/20";
  
  if (profile.currentTrustScore >= 851) {
    scoreTier = "Finance Ready";
    tierColorClass = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  } else if (profile.currentTrustScore >= 751) {
    scoreTier = "Opportunity Ready";
    tierColorClass = "text-amber-400 bg-amber-500/10 border-amber-500/20";
  } else if (profile.currentTrustScore >= 601) {
    scoreTier = "Achiever";
    tierColorClass = "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
  } else if (profile.currentTrustScore >= 451) {
    scoreTier = "Builder";
    tierColorClass = "text-blue-400 bg-blue-500/10 border-blue-500/20";
  }

  // Raw mock notification list from verification actions
  const mockNotifications = [
    {
      id: "nt-1",
      title: "GitHub Skill Signature Synced",
      description: "Indexed 14 developer repositories & calculated contribution index score.",
      status: "success",
      time: "2 mins ago"
    },
    {
      id: "nt-2",
      title: "Academic Transcript OCR Cleared",
      description: "Validated CGPA of 9.55 and registrar's credentials signature matches Digilocker.",
      status: "success",
      time: "1 hour ago"
    },
    {
      id: "nt-3",
      title: "Internship Offer Letter Audit Requested",
      description: "Upload a valid PDF offer letter to boost score and unlock Level 3 perks.",
      status: "pending",
      time: "3 hours ago"
    }
  ];

  const handleDropdownSelect = (tabId: string) => {
    setActiveTab(tabId);
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md px-6 py-3.5 flex items-center justify-between select-none" id="top-navbar-main">
      
      {/* Mobile Hamburger Drawer Trigger & Left Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle Menu"
          id="toggle-menu-btn"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            CB
          </div>
          <span className="font-bold tracking-tight text-white text-base font-sans">CredBridge</span>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-xs font-semibold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
            DURABLE CREDIBILITY LAYER
          </span>
        </div>
      </div>

      {/* Center/Right Metrics & Action controls */}
      <div className="flex items-center gap-4 lg:gap-6">
        
        {/* Core Stats Overview Pills - Only on Desktop */}
        <div className="hidden md:flex items-center gap-4 text-xs font-mono">
          {/* TrustScore Tier Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-medium font-sans ${tierColorClass}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{scoreTier}</span>
          </div>

          {/* Profile Completion Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-900 bg-zinc-900/50 text-zinc-400 font-semibold font-sans">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verifications Weight: {verificationProgress}%</span>
          </div>

          {/* System status node */}
          <div className="flex items-center gap-1 text-zinc-500 px-2 py-1">
            <Activity className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Node Live</span>
          </div>
        </div>

        {/* Action center Controls */}
        <div className="flex items-center gap-3 relative">
          
          {/* Notifications Button & Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
              id="top-navbar-bell-btn"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-zinc-950 animate-pulse" />
              )}
            </button>

            {isNotifOpen && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setIsNotifOpen(false)} 
                />
                <div 
                  className="absolute right-0 mt-2.5 w-80 md:w-96 rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl z-40 text-left animate-in fade-in slide-in-from-top-2 duration-150"
                  id="navbar-notification-dropdown"
                >
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-800 mb-3">
                    <span className="text-sm font-bold text-white">Cryptographic Verification Events</span>
                    <button 
                      onClick={() => setIsNotifOpen(false)}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
                    >
                      Clear Audits
                    </button>
                  </div>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {mockNotifications.map((notif) => (
                      <div key={notif.id} className="p-2.5 rounded-lg bg-zinc-950/50 hover:bg-zinc-950 border border-zinc-850/45 transition-colors flex gap-3">
                        <div className="mt-0.5 shrink-0 animate-pulse">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="space-y-0.5 text-xs text-zinc-300 font-semibold leading-relaxed">
                          <p className="font-bold text-white">{notif.title}</p>
                          <p className="text-zinc-400 leading-normal">{notif.description}</p>
                          <span className="text-[10px] text-zinc-500 font-mono block mt-1">{notif.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* REQUIRED POST-LOGIN USER CAPSULE & ELEVENTH HOUR PRECISE DROPDOWN MENU */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-850 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-90 w-full hover:bg-zinc-900/80 transition duration-150 cursor-pointer"
              id="top-navbar-profile-dropdown-trigger"
            >
              {/* TrustScore badge in the navbar capsule */}
              <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20 rounded-lg text-[10px] font-mono leading-none tracking-wide">
                {profile.currentTrustScore} TrustScore
              </span>
              
              <div className="text-right hidden sm:block">
                <span className="text-xs font-black text-white block leading-none">{profile.name}</span>
              </div>
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-7 h-7 rounded-lg bg-zinc-850 border border-zinc-800 object-cover p-px"
              />
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            </button>

            {/* Profile Menu Dropdown Overlay block list */}
            {isProfileMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setIsProfileMenuOpen(false)} 
                />
                <div 
                  className="absolute right-0 mt-2.5 w-64 rounded-2xl border border-zinc-800 bg-[#0a0b12] p-2 shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-150"
                  id="top-navbar-profile-dropdown-menu"
                >
                  {/* Account Summary Header */}
                  <div className="p-3 border-b border-zinc-900 text-left space-y-1">
                    <span className="text-[10px] text-indigo-400 font-bold font-mono tracking-widest block uppercase">Verifiable Identity</span>
                    <h4 className="text-xs font-extrabold text-white leading-tight truncate">{profile.name}</h4>
                    <span className="text-[10px] text-zinc-500 font-mono block truncate">{profile.university}</span>
                  </div>

                  {/* Dropdown Menu Item Groups */}
                  <div className="py-2 space-y-0.5 text-xs">
                    {[
                      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                      { id: "passport", label: "Financial Passport", icon: UserCircle },
                      { id: "verification", label: "Verification Gateway", icon: CheckCircle2 },
                      { id: "marketplace", label: "Opportunities Catalog", icon: Compass },
                      { id: "roadmap", label: "Roadmap Milestones", icon: ChevronRight },
                      { id: "simulator", label: "Predictive Simulator", icon: SlidersHorizontal }
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleDropdownSelect(item.id)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors text-left font-semibold cursor-pointer"
                        >
                          <Icon className="w-4 h-4 text-zinc-500" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}

                    <div className="border-t border-zinc-900 my-1 pb-1" />

                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-350 hover:bg-rose-500/10 transition-colors text-left font-bold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-455 text-rose-400" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
