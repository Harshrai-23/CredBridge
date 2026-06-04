import { RoadmapLevel, UserProfile } from "../types";
import { 
  Compass, 
  Lock, 
  Unlock, 
  CheckCircle2
} from "lucide-react";

interface OpportunityRoadmapProps {
  profile: UserProfile;
  levels: RoadmapLevel[];
}

export default function OpportunityRoadmap({ profile, levels }: OpportunityRoadmapProps) {
  // Dynamically resolve the student's overarching category
  const userCategory = profile.category || (() => {
    const majorLower = profile.major.toLowerCase();
    if (majorLower.includes("medical") || majorLower.includes("health") || majorLower.includes("m.b.b.s") || majorLower.includes("mbbs") || majorLower.includes("clinical")) return "Medical / Healthcare";
    if (majorLower.includes("commerce") || majorLower.includes("finance") || majorLower.includes("b.com") || majorLower.includes("bcom") || majorLower.includes("accounting") || majorLower.includes("economics")) return "Commerce / Finance";
    if (majorLower.includes("science") || majorLower.includes("research") || majorLower.includes("b.sc") || majorLower.includes("bsc") || majorLower.includes("lab") || majorLower.includes("physics") || majorLower.includes("chem") || majorLower.includes("math")) return "Science / Research";
    return "Engineering / Technology"; // default fallback
  })();

  const getCustomizedLevels = () => {
    if (userCategory === "Medical / Healthcare") {
      return [
        {
          level: 1,
          title: "Clinical Foundation",
          minScore: 500,
          perks: ["Premium medical atlas & diagnostic manuals (UpToDate, Osmosis)", "Local clinical-wear and scrubs student packages", "Access to peer-reviewed medicine journals"],
          status: "unlocked" as const,
        },
        {
          level: 2,
          title: "Clinical & Biotech Skill Set",
          minScore: 620,
          perks: ["Complimentary clinical-grade diagnostic tools (Littmann stethoscopes)", "Pfizer computational biology API server nodes", "First-aid & advanced cardiac life support sponsorships"],
          status: "active" as const,
        },
        {
          level: 3,
          title: "Therapeutic & Research Accelerator",
          minScore: 700,
          perks: ["Global Health student research funding ($12K)", "Mayo Clinic clinical rotation fast-track screening", "Sponsorship for international health conference presentations"],
          status: "locked" as const,
        },
        {
          level: 4,
          title: "Medical Education Autonomy",
          minScore: 740,
          perks: ["Low-interest medical school and board-exam prep financing", "Surgical rotation relocation micro-credit lines", "Zero-collateral tablet or clinical laptop payment plans"],
          status: "locked" as const,
        },
        {
          level: 5,
          title: "Stethoscopes & Residency Elite",
          minScore: 780,
          perks: ["Direct clinical mentoring associations with top-tier physicians", "$25K pre-approved clinical research startup pilot limits", "Priority selection by prestigious hospital residency panels"],
          status: "locked" as const,
        },
      ];
    }
    
    if (userCategory === "Commerce / Finance") {
      return [
        {
          level: 1,
          title: "Capital Markets Foundation",
          minScore: 500,
          perks: ["Wall Street Journal & premium finance news portals", "Local business professional wear student packages", "Access to academic market databases"],
          status: "unlocked" as const,
        },
        {
          level: 2,
          title: "Quantitative Analytics Skill Set",
          minScore: 620,
          perks: ["Bloomberg Terminal active academic account slots", "Proprietary paper-trading API lines & sandbox compute", "CFA, FRM, or CPA examination registration sponsorship"],
          status: "active" as const,
        },
        {
          level: 3,
          title: "FinTech Innovation & Venture Accelerator",
          minScore: 700,
          perks: ["Startup founder seed fellowships ($15K)", "Goldman Sachs Institutional Superday prioritized screening", "Pre-qualified international trading desk travel credits"],
          status: "locked" as const,
        },
        {
          level: 4,
          title: "Investment & Capital Autonomy",
          minScore: 740,
          perks: ["Proprietary trading mock capitoline interest loans", "Major metro internship relocation finance lines", "Zero-collateral finance workbench computer payment plans"],
          status: "locked" as const,
        },
        {
          level: 5,
          title: "Institutional Venture Elite",
          minScore: 780,
          perks: ["Exclusive wealth advisor and private banking matching", "$25k unsecured high-frequency trial capital lines", "Direct placements into premier hedge funds and valuation desks"],
          status: "locked" as const,
        },
      ];
    }
    
    if (userCategory === "Science / Research") {
      return [
        {
          level: 1,
          title: "Scholastic Research Foundation",
          minScore: 500,
          perks: ["Nature, Science, & premium science text archives subscription", "Lab equipment and clean-wear student discount vouchers", "Academic research workspace nodes"],
          status: "unlocked" as const,
        },
        {
          level: 2,
          title: "Laboratory & Computational Mastery",
          minScore: 620,
          perks: ["Nature Student APC publication charge waivers", "Quantum simulation cluster supercomputing nodes", "Advanced scientific software licenses (MATLAB, ChemDraw)"],
          status: "active" as const,
        },
        {
          level: 3,
          title: "Theoretical & Discovery Accelerator",
          minScore: 700,
          perks: ["National Science Foundation merit fellowships ($9K)", "CERN Switzerland summer physics lab screening bypass", "Funding for Nobel Laureate mentoring summits"],
          status: "locked" as const,
        },
        {
          level: 4,
          title: "Scholastic Project Autonomy",
          minScore: 740,
          perks: ["Low-interest scientific thesis and patent filing interest lines", "CERN or international field experiment relocation travel support", "No-collateral research-grade server cluster installment programs"],
          status: "locked" as const,
        },
        {
          level: 5,
          title: "Science Academy & Laureate Elite",
          minScore: 780,
          perks: ["Direct partnership pathways with global senior research councils", "$25K science validation and prototype tooling credits", "Priority recruiting placement with legendary top-percentile test labs"],
          status: "locked" as const,
        },
      ];
    }

    // Default Fallback: Engineering / Technology
    return [
      {
        level: 1,
        title: "Foundation Perks",
        minScore: 500,
        perks: ["Premium software subscriptions (JetBrains, GitHub Copilot)", "Local merchant student bundles", "Academic research access"],
        status: "unlocked" as const,
      },
      {
        level: 2,
        title: "Technical Excellence",
        minScore: 620,
        perks: ["AWS and Azure cloud credits", "Elite mechanical developer hardware grants", "Free technical certificates sponsorship"],
        status: "active" as const,
      },
      {
        level: 3,
        title: "Opportunity Accelerator",
        minScore: 700,
        perks: ["Tech Founders annual scholarship ($10K)", "Y-Combinator pre-screening", "Pre-qualified educational study-abroad financing"],
        status: "locked" as const,
      },
      {
        level: 4,
        title: "Financial Autonomy",
        minScore: 740,
        perks: ["Flexible low-interest tuition loans", "Moving/relocation micro-credit for internships", "No-collateral computer hardware installment plans"],
        status: "locked" as const,
      },
      {
        level: 5,
        title: "Institutions & Venture Elite",
        minScore: 780,
        perks: ["Pre-approved prime credit card partnerships", "$25K pre-approved seed capital lines", "Direct recruiting paths to senior engineering panels"],
        status: "locked" as const,
      },
    ];
  };

  const customizedLevels = getCustomizedLevels();

  const lvl1Title = customizedLevels[0].title;
  const lvl2ActiveDesc = userCategory === "Medical / Healthcare" ? "Unlocking clinical kits & biotech compute"
                      : userCategory === "Commerce / Finance" ? "Unlocking terminal keys & paper trading api nodes"
                      : userCategory === "Science / Research" ? "Unlocking laboratory wavers & study tool subscriptions"
                      : "Unlocking cloud credits & hardware grants";

  const lvl3Title = customizedLevels[2].title;

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="opportunity-roadmap-view">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs text-indigo-400 font-mono tracking-widest uppercase block mb-1">
            TRUST BRACKET ELEVATION MAP
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Roadmap</h1>
          <p className="text-zinc-400 text-xs mt-1 md:mt-1.5 leading-relaxed">
            Build your trust ranking step-by-step. Each scoring bracket unlocks elite levels of dynamic access tailored to your field.
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-400 animate-spin-slow shrink-0" />
          <span className="text-xs font-semibold text-zinc-300">
            Current Tier: <span className="font-extrabold text-indigo-400 font-mono">Achiever Level</span>
          </span>
        </div>
      </div>

      {/* Progress tracker summary banner card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-950/20 border border-zinc-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest font-mono block">Completed Milestone</span>
          <p className="text-lg font-black text-white">{lvl1Title}</p>
          <p className="text-xs text-zinc-400 font-semibold font-mono">Unlocked at 500+ TrustScore</p>
        </div>
        
        <div className="space-y-1 text-center md:text-left border-y md:border-y-0 md:border-x border-zinc-800 py-4 md:py-0 md:px-6">
          <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest font-mono block">Active Battleground</span>
          <p className="text-lg font-black text-indigo-400 flex items-center justify-center md:justify-start gap-1.5 leading-none">
            Level 2 <span className="text-xs font-mono font-medium text-zinc-300">(Score {profile.currentTrustScore})</span>
          </p>
          <p className="text-xs text-zinc-400 mt-1.5">{lvl2ActiveDesc}</p>
        </div>

        <div className="space-y-1 text-center md:text-left md:pl-6">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest font-mono block">Upcoming Gateway</span>
          <p className="text-lg font-black text-white">{lvl3Title}</p>
          <p className="text-xs text-zinc-400 font-semibold font-mono">Requires 700+ Points ({Math.max(0, 700 - profile.currentTrustScore)} to go)</p>
        </div>
      </div>

      {/* Roadmap timeline visualizer list */}
      <div className="relative border-l-2 border-zinc-800 ml-6 pl-10 py-4 space-y-12">
        {customizedLevels.map((lvl) => {
          // Determine status compared to user profile
          const isLvlUnlocked = profile.currentTrustScore >= lvl.minScore;
          const isLvlActive = !isLvlUnlocked && customizedLevels.findIndex(l => l.level === lvl.level) === customizedLevels.findIndex(l => ! (profile.currentTrustScore >= l.minScore));
          
          let circleBg = "bg-zinc-900 text-zinc-500 border-zinc-800";
          let bgCardStyle = "bg-[#0c0d15] border-zinc-800 hover:border-zinc-700";
          let badgeText = "Locked";
          let badgeColor = "bg-zinc-900 text-zinc-500 border-zinc-800/80";
          
          if (isLvlUnlocked) {
            circleBg = "bg-gradient-to-tr from-purple-500 to-indigo-600 text-white border-indigo-400/40 shadow-xl shadow-indigo-950/20";
            bgCardStyle = "bg-[#0c0d15] border-zinc-800/80 shadow-md hover:border-zinc-700";
            badgeText = "Unlocked";
            badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
          } else if (isLvlActive || lvl.status === "active") {
            circleBg = "bg-amber-500/15 text-amber-400 border-amber-500/30 animate-pulse";
            bgCardStyle = "bg-zinc-900/30 border-amber-500/20 shadow-inner hover:border-amber-500/30";
            badgeText = "Active Target";
            badgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
          }

          return (
            <div key={lvl.level} className="relative flex flex-col md:flex-row gap-6 items-start">
              
              {/* Floating level pin circle index */}
              <div className={`absolute -left-[53px] w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 font-mono ${circleBg}`}>
                {lvl.level}
              </div>

              {/* Information Item Card */}
              <div className={`flex-1 border rounded-2xl p-6 transition-all duration-300 ${bgCardStyle}`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-4 border-b border-zinc-800/80">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-white">{lvl.title}</h3>
                      <span className={`text-[9px] uppercase font-bold tracking-wider font-mono px-2 py-0.5 rounded-full border ${badgeColor}`}>
                        {badgeText}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-bold font-mono uppercase tracking-wide">Requires Cumulative Score: {lvl.minScore}+</p>
                  </div>
                  <div className="text-left md:text-right shrink-0">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest font-mono block">Threshold</span>
                    <span className="text-xs font-bold text-zinc-300 font-mono">{lvl.minScore} PTS</span>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest font-mono block">Milestone Rewards Enabled:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs text-zinc-400">
                    {lvl.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5">
                        {isLvlUnlocked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Lock className="w-4 h-4 text-zinc-650 text-zinc-600 shrink-0 mt-0.5" />
                        )}
                        <span className="leading-relaxed font-semibold">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
