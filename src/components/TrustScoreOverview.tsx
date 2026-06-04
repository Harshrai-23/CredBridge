import { useState } from "react";
import { UserProfile, VerificationItem } from "../types";
import { 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Cpu, 
  TrendingUp, 
  ArrowRight,
  FileCheck,
  ShieldCheck,
  Zap,
  ChevronRight,
  Info
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface TrustScoreOverviewProps {
  profile: UserProfile;
  verificationItems: VerificationItem[];
  setActiveTab: (tab: string) => void;
}

export default function TrustScoreOverview({ profile, verificationItems, setActiveTab }: TrustScoreOverviewProps) {
  // Score mapping calculations
  const minScore = 300;
  const maxScore = 900;
  const relativeScore = profile.currentTrustScore;

  // Percentage for custom SVG Radial Gauge
  const percentage = Math.min(Math.max(((relativeScore - minScore) / (maxScore - minScore)) * 100, 0), 100);

  // SVG parameters
  const size = 200;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Calculations for cards
  const verifiedCount = verificationItems.filter(item => item.status === "verified").length;
  const pendingCount = verificationItems.filter(item => item.status === "pending").length;
  const totalCount = verificationItems.length;

  // Metric 1: TrustScore
  // Metric 2: Profile Confidence % (e.g., 84%)
  const profileConfidence = 84; 
  // Metric 3: Verified Evidence % (e.g., 76%)
  const verifiedEvidencePercent = 76;

  // Let's create beautiful Recharts chart data matching the PRD
  // PRD points: Jan 680, Feb 705, Mar 718, Apr 742 (and dynamic point if score shifts!)
  const baseChartData = [
    { month: "Jan", Score: 680 },
    { month: "Feb", Score: 705 },
    { month: "Mar", Score: 718 },
    { month: "Apr", Score: 742 },
  ];

  // If the user's score was increased in the simulator/sandbox, let's reflect that beautifully on the chart as a "Current" stage!
  const hasBoosted = relativeScore > 742;
  const chartData = hasBoosted 
    ? [...baseChartData, { month: "Current", Score: relativeScore }]
    : baseChartData.map((d, i) => i === baseChartData.length - 1 ? { ...d, Score: relativeScore } : d);

  // Dynamic evaluation of score tier and descriptor
  let scoreTier = "Starter Team";
  let tierColor = "text-rose-400 bg-rose-500/10 border-rose-500/20";
  let ratingDescription = "Complete primary university registration to initiate your alternative credit file.";
  let glowColor = "shadow-rose-950/20";

  if (relativeScore >= 851) {
    scoreTier = "Finance Ready";
    tierColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    ratingDescription = "Top 1% credibility score. Fully qualified for prime no-collateral line offers & institutional venture pools.";
    glowColor = "shadow-emerald-950/10";
  } else if (relativeScore >= 751) {
    scoreTier = "Opportunity Ready";
    tierColor = "text-amber-400 bg-amber-500/10 border-amber-500/30";
    ratingDescription = "Highly credible profile. Eligible for fast-track YC routing, MacBook grants, and high-tier internships.";
    glowColor = "shadow-amber-950/10";
  } else if (relativeScore >= 601) {
    scoreTier = "Achiever";
    tierColor = "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
    ratingDescription = "Deep academic and coding credentials established. Dynamic score is fully active and verified.";
    glowColor = "shadow-cyan-950/10";
  } else if (relativeScore >= 451) {
    scoreTier = "Builder";
    tierColor = "text-blue-400 bg-blue-500/10 border-blue-500/20";
    ratingDescription = "Active progress. Integrate dynamic certifications or leadership indices to increase metrics.";
    glowColor = "shadow-blue-950/10";
  }

  // Weight scoring per category calculated from verificationItems with points
  const categoryScores = {
    academic: verificationItems.filter(v => v.category === "academic" && v.status === "verified").reduce((acc, curr) => acc + curr.points, 0),
    skills: verificationItems.filter(v => v.category === "skills" && v.status === "verified").reduce((acc, curr) => acc + curr.points, 0),
    professional: verificationItems.filter(v => v.category === "professional" && v.status === "verified").reduce((acc, curr) => acc + curr.points, 0),
    leadership: verificationItems.filter(v => v.category === "leadership" && v.status === "verified").reduce((acc, curr) => acc + curr.points, 0),
  };

  // Custom tooltips for Recharts chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-xl shrink-0 text-left">
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider font-mono">Evaluation Node</p>
          <p className="text-xl font-extrabold text-white mt-0.5">{payload[0].value} <span className="text-xs text-zinc-500 font-normal">pts</span></p>
          <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            Cryptographic Rating Verified
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="credbridge-hub-dashboard">
      
      {/* 1. Header Banner & Dynamic Greeting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs text-indigo-400 font-mono tracking-widest uppercase block mb-1">
            CRITICAL CREDIBILITY ARCHITECTURE
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {profile.name}
          </h1>
          <p className="text-zinc-400 text-xs mt-1 md:mt-1.5 leading-relaxed">
            Your alternative financial identity is generated using multi-source cryptographic evidence vectors at{" "}
            <span className="text-zinc-300 font-semibold">{profile.university}</span>.
          </p>
        </div>
        
        {/* Sandbox indicator pill */}
        <div className="bg-zinc-900/60 border border-zinc-800 px-3.5 py-1.5 rounded-xl text-[11px] font-semibold text-zinc-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>Active Test Environment</span>
        </div>
      </div>

      {/* 2. Top Metric Cards Row: TrustScore Card, Profile Confidence Card, Verified Evidence Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric Card 1: TrustScore Card */}
        <div className={`p-6 rounded-2xl bg-zinc-905 border border-zinc-800 bg-[#0c0d15] flex flex-col items-center text-center relative overflow-hidden shadow-xl ${glowColor} transition-all duration-300`}>
          <div className="w-full flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-zinc-450 uppercase tracking-widest font-mono text-zinc-400">TrustScore™ Engine</span>
            <span className={`text-[10px] px-2.1 py-0.5 rounded-full font-bold uppercase border ${tierColor}`}>
              {scoreTier}
            </span>
          </div>

          {/* Graphical circular gauge */}
          <div className="relative my-4" style={{ width: size, height: size }}>
            <svg className="transform -rotate-95 w-full h-full">
              {/* Radial gradient filter definitions */}
              <defs>
                <linearGradient id="gauge-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
              {/* Background trace ring */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="stroke-zinc-800/80 fill-none"
                strokeWidth={strokeWidth}
              />
              {/* Animated foreground weight indicator */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="url(#gauge-glow)"
                strokeWidth={strokeWidth}
                className="fill-none transition-all duration-1000 ease-out"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            {/* Embedded inner labels */}
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">CURRENT VALUE</span>
              <span className="text-5xl font-black text-white tracking-tight mt-0.5">
                {relativeScore}
              </span>
              <span className="text-[10px] text-zinc-450 font-bold text-indigo-400 font-mono tracking-wide mt-1">
                Ref Range: 300-900
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-normal line-clamp-2 px-2">
            {ratingDescription}
          </p>
        </div>

        {/* Metric Card 2: Profile Confidence Card */}
        <div className="p-6 rounded-2xl bg-[#0c0d15] border border-zinc-800 flex flex-col justify-between shadow-xl">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">Profile Confidence</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-5xl font-black text-white tracking-tight">{profileConfidence}%</span>
              <span className="text-xs text-emerald-450 font-mono font-bold text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12% MoM
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-normal pt-2">
              Measures the integrity and cryptographic source validation level of your Financial Passport files.
            </p>
          </div>

          {/* Sources breakdown inside card */}
          <div className="space-y-2.5 mt-6 border-t border-zinc-900 pt-4">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest font-mono block">Connected Nodes</span>
            
            <div className="flex items-center justify-between text-xs py-0.5">
              <span className="text-zinc-300">University Registrar integration</span>
              <span className="text-emerald-400 font-semibold font-mono text-[11px] bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">SECURE</span>
            </div>
            <div className="flex items-center justify-between text-xs py-0.5">
              <span className="text-zinc-300">GitHub Open-Source Audit</span>
              <span className="text-emerald-400 font-semibold font-mono text-[11px] bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">SECURE</span>
            </div>
            <div className="flex items-center justify-between text-xs py-0.5">
              <span className="text-zinc-300">Digilocker Financial API</span>
              <span className="text-emerald-400 font-semibold font-mono text-[11px] bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">SECURE</span>
            </div>
          </div>
        </div>

        {/* Metric Card 3: Verified Evidence Card */}
        <div className="p-6 rounded-2xl bg-[#0c0d15] border border-zinc-800 flex flex-col justify-between shadow-xl">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">Verified Evidence</span>
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            </div>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-5xl font-black text-white tracking-tight">{verifiedEvidencePercent}%</span>
              <span className="text-xs text-zinc-450 font-mono font-bold text-indigo-400">Weighted strength</span>
            </div>
            <p className="text-xs text-zinc-400 leading-normal pt-2">
              The density of concrete certificates, contributions, and leadership terms attached to your alternative rating.
            </p>
          </div>

          {/* Quick interactive counters block */}
          <div className="my-6">
            <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
              <span>Dynamic Evidence Pool</span>
              <span className="font-mono">{verifiedCount} of {totalCount} verified</span>
            </div>
            <div className="w-full bg-zinc-800/60 h-2 rounded-full overflow-hidden flex">
              <div 
                className="bg-indigo-500 h-full rounded-l transition-all duration-500" 
                style={{ width: `${(verifiedCount / totalCount) * 100}%` }}
              />
              <div 
                className="bg-amber-500 h-full transition-all duration-500" 
                style={{ width: `${(pendingCount / totalCount) * 100}%` }}
              />
            </div>
            <div className="flex gap-4 mt-2 text-[10px] text-zinc-500 font-mono">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Verified</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pending Audit</span>
            </div>
          </div>

          <button 
            onClick={() => setActiveTab("passport")}
            className="w-full py-2 bg-gradient-to-r from-zinc-900 to-zinc-900 hover:from-zinc-800 hover:to-zinc-800 border border-zinc-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
          >
            Review Passport <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 3. Recharts Chart and Weights Bento Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recharts Area Chart Block (7 Columns) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0c0d15] border border-zinc-800 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-extrabold text-white">TrustScore History</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Rating progressions validated by our periodic cryptographic ledger.</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-zinc-450 text-indigo-400 block">+62 pts Earned</span>
                <span className="text-[10px] text-zinc-500 font-mono uppercase block">since sign-up</span>
              </div>
            </div>
          </div>

          {/* Area Chart Component */}
          <div className="w-full h-64 mt-6" id="trust-chart-recharts-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="chart-area-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.3} vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#4b5563" 
                  fontSize={11}
                  fontWeight="bold"
                  fontFamily="JetBrains Mono, monospace" 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#4b5563" 
                  fontSize={11}
                  fontWeight="bold"
                  fontFamily="JetBrains Mono, monospace" 
                  tickLine={false} 
                  axisLine={false}
                  domain={[300, 900]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="Score" 
                  stroke="#6366f1" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#chart-area-glow)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Category Weights Card (5 Columns) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0c0d15] border border-zinc-800 flex flex-col justify-between shadow-xl">
          <div>
            <h3 className="text-base font-extrabold text-white">Verified Trust Dimensions</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Individual components feeding into your alt credit rating structure.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 my-6">
            
            {/* Academic */}
            <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <GraduationCap className="w-4.5 h-4.5 text-indigo-400" />
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-bold px-1.5 py-0.5 rounded border border-indigo-500/20 font-mono">GPA SECURED</span>
              </div>
              <div className="mt-3">
                <span className="text-xl font-black text-white block tracking-tight">{categoryScores.academic} <span className="text-xs text-zinc-550 font-normal">pts</span></span>
                <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider text-zinc-550 font-mono block mt-0.5">Academic Progress</span>
              </div>
            </div>

            {/* Code skills */}
            <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <Cpu className="w-4.5 h-4.5 text-sky-400" />
                <span className="text-[10px] bg-sky-500/10 text-sky-400 font-bold px-1.5 py-0.5 rounded border border-sky-500/20 font-mono">GIT AUDIT</span>
              </div>
              <div className="mt-3">
                <span className="text-xl font-black text-white block tracking-tight">{categoryScores.skills} <span className="text-xs text-zinc-550 font-normal">pts</span></span>
                <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider text-zinc-550 font-mono block mt-0.5">Technical Dev</span>
              </div>
            </div>

            {/* Professional work */}
            <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <Briefcase className="w-4.5 h-4.5 text-purple-400" />
                <span className="text-[10px] bg-purple-500/10 text-purple-400 font-bold px-1.5 py-0.5 rounded border border-purple-500/20 font-mono">CAREER STEP</span>
              </div>
              <div className="mt-3">
                <span className="text-xl font-black text-white block tracking-tight">{categoryScores.professional} <span className="text-xs text-zinc-550 font-normal">pts</span></span>
                <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider text-zinc-550 font-mono block mt-0.5">Professional Experience</span>
              </div>
            </div>

            {/* Leadership terms */}
            <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <Award className="w-4.5 h-4.5 text-emerald-400" />
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">COMMUNITY</span>
              </div>
              <div className="mt-3">
                <span className="text-xl font-black text-white block tracking-tight">{categoryScores.leadership} <span className="text-xs text-zinc-550 font-normal">pts</span></span>
                <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider text-zinc-550 font-mono block mt-0.5">Leadership Status</span>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4 text-xs">
            <span className="text-zinc-500 font-mono">Need higher credibility rating?</span>
            <button 
              onClick={() => setActiveTab("verification")}
              className="text-indigo-400 font-bold hover:text-indigo-300 flex items-center gap-1 cursor-pointer hover:underline"
            >
              Verify Center <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 4. Next Best Action Card (Spotlight Banner) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-950 via-zinc-900 to-indigo-950 border border-indigo-500/20 text-indigo-150 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl relative overflow-hidden" id="dashboard-next-best-action-card">
        {/* Glow backdrop decorative */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30 font-bold uppercase tracking-widest font-mono flex items-center gap-1">
              <Zap className="w-3 h-3 animate-bounce" /> Path Upgrade Available
            </span>
          </div>
          <h2 className="text-xl font-black text-white leading-tight">
            Earn +45 points immediately: Verify your Summer Internship
          </h2>
          <p className="text-zinc-300 text-xs leading-relaxed">
            Your Software Engineering internship offer is currently pending dynamic audit signals. Uploading a valid PDF offer letter raises your rating to <strong className="text-indigo-300 font-semibold font-mono">725+ Achiever</strong> status. This instantly triggers locked hardware benefits and unlocks pre-screening pipelines for the Opportunity Marketplace.
          </p>
        </div>
        
        <button
          onClick={() => setActiveTab("verification")}
          className="shrink-0 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs shadow-lg transition hover:scale-[1.01] flex items-center gap-2 cursor-pointer"
          id="upgrade-path-offer-btn"
        >
          <FileCheck className="w-4 h-4 text-indigo-600" /> Verify Offer Letter
        </button>
      </div>

      {/* 5. Connected Sources Detailed Integrity Indicators */}
      <div className="bg-[#0c0d15] border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-base font-extrabold text-white">Dynamic Cryptographic Integrity Index</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Validated connectors proving verifiable achievements under standard compliance rules.</p>
          </div>
          <span className="text-xs font-bold font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            {verifiedCount} / {totalCount} Connected
          </span>
        </div>

        <div className="divide-y divide-zinc-800/80">
          {verificationItems.map((item) => (
            <div key={item.id} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {item.status === "verified" ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  ) : item.status === "pending" ? (
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                  ) : (
                    <button 
                      onClick={() => setActiveTab("verification")}
                      className="w-5 h-5 rounded-full bg-zinc-800 hover:bg-indigo-500/20 hover:border-indigo-500/40 border border-zinc-700 flex items-center justify-center group transition cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400" />
                    </button>
                  )}
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">{item.name}</span>
                  <p className="text-[10px] text-zinc-450 text-zinc-500 mt-0.5 font-medium leading-normal block">
                    Source: <span className="font-semibold text-zinc-400">{item.sourceName}</span> &bull; Last Audit:{" "}
                    <span className="text-zinc-500 font-mono tracking-wider">{item.lastUpdated}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-extrabold text-white block">+{item.points} Points</span>
                <span className="text-[10px] text-zinc-550 font-mono block">Scoring Weight</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
