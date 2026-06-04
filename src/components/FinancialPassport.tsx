import { useState } from "react";
import { UserProfile, VerificationItem } from "../types";
import { 
  GraduationCap, 
  Cpu, 
  Briefcase, 
  Award, 
  ChevronRight, 
  Download, 
  Clock, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink
} from "lucide-react";

interface FinancialPassportProps {
  profile: UserProfile;
  verificationItems: VerificationItem[];
  setActiveTab: (tab: string) => void;
}

export default function FinancialPassport({ profile, verificationItems, setActiveTab }: FinancialPassportProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "academic" | "skills" | "professional" | "leadership">("all");

  const categories = [
    { id: "all", label: "Full Registry View", icon: ShieldCheck },
    { id: "academic", label: "Academics", icon: GraduationCap },
    { id: "skills", label: "Skills & GitHub", icon: Cpu },
    { id: "professional", label: "Professional", icon: Briefcase },
    { id: "leadership", label: "Leadership", icon: Award },
  ];

  const filteredItems = verificationItems.filter(
    item => selectedCategory === "all" || item.category === selectedCategory
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="financial-passport-view">
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs text-indigo-400 font-mono tracking-widest uppercase block mb-1">
            CRYPTOGRAPHIC DIRECTORY
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Your Financial Passport</h1>
          <p className="text-zinc-400 text-xs mt-1 md:mt-1.5 leading-relaxed">
            Visualizing verified scholastic, technical, and leadership dimensions as dynamic credit alternative indicators.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-90 w-full md:w-auto text-zinc-300 text-xs font-semibold hover:bg-zinc-900 hover:text-white transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4 text-zinc-400" /> Export Certified Record
        </button>
      </div>

      {/* Passport Preview Card (Interactive & Sleek UI - Dark Version) */}
      <div className="bg-gradient-to-br from-indigo-950 via-zinc-900 to-[#121323] text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl border border-indigo-900/30">
        {/* Glow vector circle */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-6 right-6 font-mono text-[9px] text-zinc-400 bg-zinc-950/60 border border-zinc-800/80 px-3 py-1 rounded-full uppercase tracking-widest font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Passport: PRT-{profile.graduationYear}-{profile.name.toUpperCase()}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-800/80">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-2xl bg-zinc-900 border-2 border-indigo-500/20 p-0.5 object-cover"
            />
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">{profile.name}</h2>
              <p className="text-indigo-400 text-xs font-medium font-mono mt-0.5">{profile.major}</p>
              <p className="text-xs text-zinc-400 mt-1">{profile.university}</p>
            </div>
          </div>
          <div className="text-left md:text-right shrink-0">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block font-mono">CREDENTIAL RATING</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl font-extrabold text-white">
                {profile.currentTrustScore}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">/ 900</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 text-xs text-zinc-400">
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block font-mono">Tier Group</span>
            <span className="font-bold text-white mt-1 block">Achiever Status</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block font-mono">Registrar CGPA</span>
            <span className="font-bold text-white mt-1 block">{(profile.gpa && profile.gpa <= 5 ? (profile.gpa * 2.5) : (profile.gpa || 9.55)).toFixed(2)} / 10.00</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block font-mono">Index Frequency</span>
            <span className="font-bold text-white mt-1 block">Active Live Sync</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block font-mono">Compliance Registry</span>
            <span className="font-bold text-emerald-400 mt-1 block uppercase text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> SECURE RPC_API
            </span>
          </div>
        </div>
      </div>

      {/* Categories Switch Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-900 pb-2">
        {categories.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer ${
                isActive
                  ? "bg-indigo-600/15 border border-indigo-500/30 text-white shadow-sm"
                  : "text-zinc-400 border border-transparent hover:text-white hover:bg-zinc-900"
              }`}
            >
              <Icon className="w-4 h-4 text-indigo-400" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Registry Credentials List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          let catIcon = <ShieldCheck className="w-5 h-5 text-indigo-400" />;
          let borderGlow = "border-zinc-800 bg-zinc-950/40";
          
          if (item.category === "academic") {
            catIcon = <GraduationCap className="w-5 h-5 text-indigo-450 text-indigo-400" />;
            borderGlow = "border-zinc-800 bg-zinc-950/40 hover:border-indigo-505 hover:border-indigo-500/20";
          } else if (item.category === "skills") {
            catIcon = <Cpu className="w-5 h-5 text-sky-400" />;
            borderGlow = "border-zinc-800 bg-zinc-950/40 hover:border-sky-505 hover:border-sky-450/20";
          } else if (item.category === "professional") {
            catIcon = <Briefcase className="w-5 h-5 text-purple-400" />;
            borderGlow = "border-zinc-800 bg-zinc-950/40 hover:border-purple-505 hover:border-purple-450/20";
          } else if (item.category === "leadership") {
            catIcon = <Award className="w-5 h-5 text-emerald-400" />;
            borderGlow = "border-zinc-800 bg-zinc-950/40 hover:border-emerald-505 hover:border-emerald-450/20";
          }

          return (
            <div
              key={item.id}
              className={`border rounded-2xl p-5 ${borderGlow} transition duration-200 flex flex-col md:flex-row justify-between gap-4 items-start shadow-sm`}
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl shadow-inner shrink-0">
                  {catIcon}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{item.name}</h3>
                    <span className="text-[9px] uppercase font-bold tracking-widest font-mono px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {item.category}
                    </span>
                    {item.status === "verified" ? (
                      <span className="text-[9px] uppercase font-bold tracking-wider font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> VERIFIED
                      </span>
                    ) : item.status === "pending" ? (
                      <span className="text-[9px] uppercase font-bold tracking-wider font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-pulse" /> PENDING Verification
                      </span>
                    ) : (
                      <span className="text-[9px] uppercase font-bold tracking-wider font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-450 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> DISCONNECTED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-350 text-zinc-300 leading-relaxed max-w-3xl">
                    {item.details}
                  </p>
                  <div className="flex flex-wrap gap-4 text-[10px] text-zinc-500 font-mono font-medium pt-1">
                    <span>Source Authority: <span className="text-zinc-400 font-semibold">{item.sourceName}</span></span>
                    <span className="hidden sm:inline">&bull;</span>
                    <span>Last Check: <span className="text-zinc-400 font-semibold">{item.lastUpdated}</span></span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-zinc-900 pt-4 md:pt-0 gap-1 shrink-0">
                <span className="text-[10px] text-zinc-500 font-bold font-mono uppercase md:order-1">Credibility Gain</span>
                <span className="text-base font-black text-white font-mono md:order-2">{item.points} pts</span>
                {item.status === "not_connected" ? (
                  <button 
                    onClick={() => setActiveTab("verification")}
                    className="md:order-3 text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1 mt-2 shadow-sm cursor-pointer"
                  >
                    Connect API <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : item.status === "pending" ? (
                  <button 
                    onClick={() => setActiveTab("verification")}
                    className="md:order-3 text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition flex items-center gap-1 mt-2 cursor-pointer"
                  >
                    Verify Letter
                  </button>
                ) : (
                  <span className="md:order-3 text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-2 bg-emerald-505/10 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Connected
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
