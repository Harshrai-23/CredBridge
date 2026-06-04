import { useState } from "react";
import { UserProfile, Opportunity } from "../types";
import { 
  Lock, 
  Unlock, 
  Search, 
  ArrowUpRight,
  Sparkles,
  Award,
  CircleAlert
} from "lucide-react";

interface OpportunityMarketplaceProps {
  profile: UserProfile;
  opportunities: Opportunity[];
}

export default function OpportunityMarketplace({ profile, opportunities }: OpportunityMarketplaceProps) {
  const [filterCategory, setFilterCategory] = useState<"all" | "grants" | "scholarships" | "accelerators" | "financing">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  // Map database categories to tab IDs
  const getTabCategory = (cat: string) => {
    if (cat === "benefit" || cat === "credit") return "grants";
    if (cat === "scholarship") return "scholarships";
    if (cat === "accelerator") return "accelerators";
    if (cat === "financing") return "financing";
    return "grants";
  };

  // Dynamically resolve the student's overarching category
  const userCategory = profile.category || (() => {
    const majorLower = profile.major.toLowerCase();
    if (majorLower.includes("medical") || majorLower.includes("health") || majorLower.includes("m.b.b.s") || majorLower.includes("mbbs") || majorLower.includes("clinical")) return "Medical / Healthcare";
    if (majorLower.includes("commerce") || majorLower.includes("finance") || majorLower.includes("b.com") || majorLower.includes("bcom") || majorLower.includes("accounting") || majorLower.includes("economics")) return "Commerce / Finance";
    if (majorLower.includes("science") || majorLower.includes("research") || majorLower.includes("b.sc") || majorLower.includes("bsc") || majorLower.includes("lab") || majorLower.includes("physics") || majorLower.includes("chem") || majorLower.includes("math")) return "Science / Research";
    return "Engineering / Technology"; // default fallback
  })();

  // Filter out any opportunities that target other categories (keep own category and "All" or untagged)
  const userOpportunities = opportunities.filter((op) => {
    return !op.targetCategory || op.targetCategory === "All" || op.targetCategory === userCategory;
  });

  const filtered = userOpportunities.filter((op) => {
    const isCategoryMatch = filterCategory === "all" || getTabCategory(op.category) === filterCategory;
    const isSearchMatch = op.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          op.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          op.description.toLowerCase().includes(searchQuery.toLowerCase());
    return isCategoryMatch && isSearchMatch;
  });

  const handleApply = (op: Opportunity) => {
    setSelectedOpportunity(op);
    setApplicationSuccess(false);
  };

  const submitApplication = () => {
    setApplicationSuccess(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="opportunities-marketplace-view">
      
      {/* Header Grid */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs text-indigo-400 font-mono tracking-widest uppercase block mb-1">
            MEMBER DIRECT OPPORTUNITIES
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Marketplace</h1>
          <p className="text-zinc-400 text-xs mt-1 md:mt-1.5 leading-relaxed">
            Access pre-approved lines, technical scholarships, and credit grants instantly based on your verified passport weight.
          </p>
        </div>
        <div className="bg-gradient-to-r from-zinc-90 w-full md:w-auto bg-indigo-505/10 bg-indigo-500/10 border border-indigo-500/20 p-3.5 rounded-xl max-w-sm flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
          <p className="text-xs text-indigo-200 font-medium leading-normal">
            Your TrustScore is <span className="font-bold text-white font-mono">{profile.currentTrustScore}</span>. This instantly unlocks <span className="font-bold text-white font-mono">{userOpportunities.filter(o => profile.currentTrustScore >= o.requiredScore).length} of {userOpportunities.length}</span> programs.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border border-zinc-800/80 py-4.5 bg-zinc-950/20 px-4 rounded-xl">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {([
            { id: "all", label: "All Opportunities" },
            { id: "grants", label: "Grants & Hardware" },
            { id: "scholarships", label: "Scholarships" },
            { id: "accelerators", label: "Accelerators" },
            { id: "financing", label: "Financing" }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition border cursor-pointer ${
                filterCategory === tab.id
                  ? "bg-indigo-600/15 text-white border-indigo-500/30"
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search providers or perks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-zinc-800 rounded-xl bg-zinc-950/40 text-xs font-medium text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition shadow-inner"
          />
        </div>
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((op) => {
          const isUnlocked = profile.currentTrustScore >= op.requiredScore;
          return (
            <div
              key={op.id}
              className={`border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 shadow-sm relative ${
                isUnlocked 
                  ? "border-zinc-800 bg-[#0c0d15] hover:border-zinc-700 hover:shadow-2xl hover:shadow-indigo-950/5" 
                  : "border-zinc-900/60 bg-zinc-950/20 opacity-60"
              }`}
            >
              {/* Score required watermark top banner */}
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider font-mono block leading-none">{op.provider}</span>
                  <h3 className="text-sm font-bold text-white mt-1 leading-snug line-clamp-1">{op.title}</h3>
                </div>
                {isUnlocked ? (
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 border border-emerald-500/20 font-mono">
                    <Unlock className="w-3 h-3" /> Unlocked
                  </span>
                ) : (
                  <span className="text-[9px] bg-zinc-800 text-zinc-400 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 border border-zinc-700 font-mono">
                    <Lock className="w-3 h-3" /> Locked: {op.requiredScore}+
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed font-semibold mb-6">
                {op.description}
              </p>

              <div className="border-t border-zinc-800/80 pt-4 flex flex-col gap-2.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 font-semibold font-mono">Reward Details:</span>
                  <span className="font-bold text-indigo-400">{op.rewardValue}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 font-semibold font-mono">Rating Required:</span>
                  <span className="font-bold text-zinc-300 font-mono">{op.requiredScore} PTS</span>
                </div>

                {isUnlocked ? (
                  <button
                    onClick={() => handleApply(op)}
                    className="w-full mt-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {op.linkText} <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full mt-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80 text-zinc-500 font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed"
                  >
                    <Lock className="w-3.5 h-3.5" /> Requires {op.requiredScore} TrustScore
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-zinc-805 border-zinc-800 rounded-2xl bg-zinc-950/20">
            <CircleAlert className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-zinc-300">No opportunities resolved</h3>
            <p className="text-xs text-zinc-550 mt-1 text-zinc-550">Try selecting a different filter category or search query.</p>
          </div>
        )}
      </div>

      {/* Modal Application (Interactive simulated modal) */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-850 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative border-zinc-800">
            <button
              onClick={() => setSelectedOpportunity(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white text-xl p-1.5 cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>

            {!applicationSuccess ? (
              <div className="space-y-4">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-2 border border-indigo-500/20">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase font-mono">{selectedOpportunity.provider}</span>
                  <h3 className="text-base font-extrabold text-white mt-0.5">{selectedOpportunity.title}</h3>
                  <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                    By submitting this request, your verified **NIT Academic Transcript** and **GitHub Skills Signature** will be cryptographically certified and forwarded to the integrations gateway.
                  </p>
                </div>

                <div className="p-3.5 bg-zinc-950 border border-zinc-800/80 rounded-xl space-y-1.5 text-xs text-zinc-400">
                  <div className="flex justify-between">
                    <span>Certifying Entity:</span>
                    <span className="font-bold text-white">CredBridge Registrar</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified Rating Rank:</span>
                    <span className="font-bold text-indigo-400 font-mono">{profile.currentTrustScore} PTS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Privacy Gate:</span>
                    <span className="font-bold text-white flex items-center gap-1 font-mono"><Unlock className="w-3 h-3 text-emerald-400" /> AES-256</span>
                  </div>
                </div>

                <div className="pt-4 flex gap-3 text-xs">
                  <button
                    onClick={() => setSelectedOpportunity(null)}
                    className="flex-1 py-3 rounded-xl border border-zinc-800 text-zinc-300 font-semibold hover:bg-zinc-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitApplication}
                    className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer"
                  >
                    Confirm & Send Passport
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl font-bold border border-emerald-500/20 animate-bounce">
                  ✓
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Application Certified & Dispatched</h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    Your certified credentials have been forwarded successfully. The partner gateway is pre-evaluating your records. You will receive progress logs in your verified portal soon.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOpportunity(null)}
                  className="w-full mt-4 py-3 bg-zinc-805 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl font-bold text-xs shadow-sm transition cursor-pointer"
                >
                  Return to Marketplace
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
