import { useState } from "react";
import { UserProfile, SimulatorFactor, Opportunity } from "../types";
import { 
  SlidersHorizontal, 
  Unlock, 
  TrendingUp, 
  Sparkles
} from "lucide-react";

interface GrowthSimulatorProps {
  profile: UserProfile;
  opportunities: Opportunity[];
  factors: SimulatorFactor[];
}

export default function GrowthSimulator({ profile, opportunities, factors: initialFactors }: GrowthSimulatorProps) {
  const [factors, setFactors] = useState<SimulatorFactor[]>(initialFactors);

  const toggleFactor = (id: string) => {
    setFactors(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f));
  };

  const activePointsGained = factors.filter(f => f.active).reduce((acc, f) => acc + f.pointsImpact, 0);
  const projectedScore = Math.min(900, profile.currentTrustScore + activePointsGained);

  // SVG Gauge calculations
  const minScore = 300;
  const maxScore = 900;
  const percentage = Math.min(Math.max(((projectedScore - minScore) / (maxScore - minScore)) * 100, 0), 100);

  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine which options are newly unlocked under this projection
  const newlyUnlocked = opportunities.filter(op => {
    const wasLocked = profile.currentTrustScore < op.requiredScore;
    const isProjectedUnlocked = projectedScore >= op.requiredScore;
    return wasLocked && isProjectedUnlocked;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="growth-simulator-view">
      
      {/* Upper Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs text-indigo-400 font-mono tracking-widest uppercase block mb-1">
            SCORE MODELLING ENGINE
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Simulator</h1>
          <p className="text-zinc-400 text-xs mt-1 md:mt-1.5 leading-relaxed">
            Simulate credential milestones to see their mathematical weight and preview newly unlocked opportunities instantly.
          </p>
        </div>
        <div className="px-3.5 py-1.5 border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm">
          <SlidersHorizontal className="w-4 h-4 text-indigo-400 shrink-0" /> Live Predictive Engine
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Milestones Switches (7 Columns) */}
        <div className="lg:col-span-7 bg-[#0c0d15] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div>
            <h2 className="text-sm font-bold font-mono text-zinc-450 uppercase tracking-widest text-zinc-400">Dynamic Milestones</h2>
            <p className="text-xs text-zinc-500 mt-1">Toggle action items to map credential weights directly onto your credit model.</p>
          </div>

          <div className="space-y-4">
            {factors.map((f) => (
              <button
                key={f.id}
                onClick={() => toggleFactor(f.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-4 cursor-pointer select-none ${
                  f.active
                    ? "border-indigo-500 bg-indigo-600/10 shadow-lg shadow-indigo-950/10"
                    : "border-zinc-800/80 bg-zinc-950/20 hover:bg-zinc-90 w-full hover:bg-zinc-900/40 hover:border-zinc-700"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {f.active ? (
                    <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-bold leading-none">
                      ✓
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded border border-zinc-700 bg-zinc-950" />
                  )}
                </div>

                <div className="flex-1 space-y-1 overflow-hidden">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-white leading-tight block">{f.label}</span>
                    <span className="text-xs font-bold font-mono text-indigo-400 shrink-0">+{f.pointsImpact} PTS</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-semibold leading-relaxed max-w-xl">
                    {f.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Projected Score Gauge Widget (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Circular Wheel projection card */}
          <div className="bg-[#0c0d15] border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-between min-h-[300px]">
            <div className="w-full text-center pb-2">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest font-mono block">Projected Result</span>
              <p className="text-xs font-bold text-zinc-350 mt-1 uppercase text-zinc-400">Calculated Score Weight</p>
            </div>

            {/* Custom SVG circle gauge */}
            <div className="relative my-4" style={{ width: size, height: size }}>
              <svg className="transform -rotate-90 w-full h-full">
                <circle cx={size / 2} cy={size / 2} r={radius} className="stroke-zinc-800 fill-none" strokeWidth={strokeWidth} />
                <circle 
                  cx={size / 2} 
                  cy={size / 2} 
                  r={radius} 
                  className="stroke-indigo-500 transition-all duration-300 fill-none" 
                  strokeWidth={strokeWidth} 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col justify-center items-center select-none">
                <span className="text-4xl font-extrabold text-white tracking-tight flex items-baseline gap-0.5">
                  {projectedScore}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-wider mt-1 flex items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" /> +{activePointsGained} PTS
                </span>
              </div>
            </div>

            <div className="w-full pt-4 border-t border-zinc-800/80 text-center text-xs">
              <span className="text-zinc-500 font-medium block">Baseline current score rating is {profile.currentTrustScore} PTS.</span>
            </div>
          </div>

          {/* Newly Unlocked Programs Block */}
          {newlyUnlocked.length > 0 ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 space-y-3 shadow-lg">
              <div className="flex items-center gap-1.5 font-bold text-[10px] text-emerald-450 uppercase tracking-widest font-mono select-none">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Newly Unlocked Opportunities
              </div>
              <div className="space-y-2">
                {newlyUnlocked.map((op) => (
                  <div key={op.id} className="text-xs flex items-center justify-between bg-zinc-950/60 border border-emerald-500/10 p-3 rounded-lg shadow-inner">
                    <div className="overflow-hidden pr-2">
                      <span className="font-bold text-white block leading-tight truncate">{op.title}</span>
                      <span className="text-[9px] text-zinc-500 font-bold block uppercase mt-1 font-mono tracking-wider truncate">{op.provider}</span>
                    </div>
                    <span className="text-[9px] bg-emerald-500/20 border border-emerald-500/35 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono shrink-0">
                      {op.rewardValue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-zinc-950/30 text-zinc-500 border border-zinc-800/80 text-center text-xs font-semibold py-8 shadow-inner font-mono">
              Toggle milestones to run predictions.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
