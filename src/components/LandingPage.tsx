import { motion } from "motion/react";
import { 
  ArrowRight, 
  Shield, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Github, 
  Linkedin, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Globe 
} from "lucide-react";

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#040509] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      
      {/* Decorative Blur glows in Dark Theme */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid background overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#1f293706_1px,transparent_1px),linear-gradient(to_bottom,#1f293706_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none opacity-20" />

      {/* LANDING PAGE NAVBAR */}
      <header className="relative max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-zinc-900/80 z-20">
        {/* Logo and Tagline block */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-indigo-700 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/20">
              CB
            </div>
            <span className="text-lg font-bold tracking-tight text-white font-sans">CredBridge</span>
          </div>
          <span className="hidden xl:inline text-xs text-zinc-500 font-mono pl-4 border-l border-zinc-900 self-center tracking-wide leading-none py-1 h-3.5 select-none">
            Building Financial Credibility Before Credit History
          </span>
        </div>

        {/* Right Side Navigation */}
        <nav className="flex items-center gap-8 text-xs font-semibold text-zinc-400">
          <a href="#features" className="hover:text-white transition select-none">Features</a>
          <a href="#how-it-works" className="hover:text-white transition select-none">How It Works</a>
          <button 
            onClick={() => onNavigate("/login")} 
            className="hover:text-white transition cursor-pointer select-none"
            id="nav-signin-btn"
          >
            Sign In
          </button>
          
          <button
            onClick={() => onNavigate("/signup")}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white font-bold tracking-wide transition-all duration-200 shadow-sm hover:bg-zinc-950 cursor-pointer"
            id="nav-get-started-btn"
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 antialiased shadow-inner">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-bold text-indigo-300 tracking-wider uppercase font-mono">
              Student Alternative Credit Authority
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08] mb-6 font-sans"
        >
          Build Financial Credibility <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-500 to-indigo-300">
            Before Credit History.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed font-semibold"
        >
          CredBridge transforms standard student achievements—registrar grades, active coding indices, and GDG leadership signatures—into a verified <strong>Financial Passport</strong> and high TrustScore alternative. Unlock elite developer hardware, starter VC funding, and low-interest lines instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-24"
        >
          <button
            onClick={() => onNavigate("/signup")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-605 bg-indigo-605 hover:from-purple-700 hover:to-indigo-715 text-white font-bold transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] shadow-lg shadow-indigo-950/45 cursor-pointer"
            id="hero-create-passport-btn"
          >
            Create Financial Passport
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onNavigate("/login")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-950 hover:bg-zinc-90 w-full hover:bg-zinc-900 border border-zinc-800 text-zinc-350 hover:border-zinc-700 font-bold transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            id="hero-view-demo-btn"
          >
            Explore Interactive Demo
          </button>
        </motion.div>
      </section>

      {/* DASHBOARD PREVIEW MOCK (SaaS Landing Feature Section) */}
      <section className="max-w-6xl mx-auto px-6 pb-28 text-center z-10" id="how-it-works">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border border-zinc-800 bg-zinc-950/40 rounded-3xl p-4 md:p-6 shadow-[0px_30px_100px_rgba(99,102,241,0.12)] max-w-5xl mx-auto overflow-hidden relative select-none"
        >
          {/* Mock Window Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-900/60 mb-5">
            <div className="flex gap-1.5 items-center">
              <div className="w-3 h-3 rounded-full bg-zinc-800" />
              <div className="w-3 h-3 rounded-full bg-zinc-800" />
              <div className="w-3 h-3 rounded-full bg-zinc-800" />
            </div>
            <div className="text-[10px] font-mono font-bold text-zinc-600 bg-zinc-950 border border-zinc-900 px-4 py-1.5 rounded-full select-none">
              SECURE SEC-COMPLIANT ACCOUNT GATEWAY PROXIES // CREDBRIDGE.APP
            </div>
            <div className="w-12 h-2" />
          </div>

          {/* Quick Mock App View */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-left text-xs font-sans">
            <div className="md:col-span-4 bg-zinc-900/40 p-4 border border-zinc-800/80 rounded-xl space-y-4">
              <span className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase font-bold block">PASSPORT INDEX DATA</span>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/30 flex items-center justify-center">HR</div>
                <div>
                  <h4 className="font-bold text-white leading-none">Harsh Rai</h4>
                  <span className="text-[9px] text-zinc-500 block font-mono mt-1">CGPA 9.55 Verified</span>
                </div>
              </div>
              <div className="border-t border-zinc-800 pt-3 flex justify-between font-mono text-[10px]">
                <span className="text-zinc-500">Live TrustScore:</span>
                <span className="text-white font-extrabold text-indigo-400">742 PTS</span>
              </div>
            </div>

            <div className="md:col-span-8 bg-zinc-900/40 p-4 border border-zinc-800/80 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-emerald-400 font-mono tracking-widest uppercase font-bold block">ELITE OFFERS RESOLVING</span>
                <h4 className="text-sm font-bold text-white mt-1">Y-Combinator Summer Batch Opportunity</h4>
                <p className="text-zinc-400 text-xs mt-1 leading-relaxed">Direct Fast-Track Pre-Screening evaluated instantly based on GitHub developer performance streaks and leadership validation parameters.</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[10px] text-zinc-500 font-mono">Unlock Requirement: 740+ PTS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* DETAILED FEATURES SECTIONS */}
      <section className="bg-zinc-950/20 border-y border-zinc-900/80 py-24 relative select-none" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs text-indigo-400 font-mono tracking-widest uppercase font-bold block mb-1">AGGREGATING REAL-TIME ACHIEVEMENT REVENUE</span>
            <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none">Alternative Credibility Indicators</h2>
            <p className="text-zinc-400 text-xs mt-3 leading-relaxed font-semibold">We analyze your active, verified educational, technical, and leadership achievements as dynamic credit indices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-zinc-90 w-full bg-[#0c0d12] border border-zinc-850 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-indigo-500/20">
              <div className="w-11 h-11 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-5">
                <GraduationCap className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2 font-sans uppercase">Academic Consistency</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Direct OAuth integration to academic registrars, certifying grades and full-time enrollment validity to decrease core financial liabilities.
              </p>
            </div>

            <div className="bg-zinc-90 w-full bg-[#0c0d12] border border-zinc-850 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-purple-500/20">
              <div className="w-11 h-11 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-5">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2 font-sans uppercase">Developer Skills</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Indexes code repository depth, original pipelines, and contribution consistencies directly to formulate a dynamic skills rating.
              </p>
            </div>

            <div className="bg-zinc-90 w-full bg-[#0c0d12] border border-zinc-850 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-blue-500/20">
              <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-5">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2 font-sans uppercase">Professional Roadmap</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Uploads corporate summer internship offers and checks work profiles, using modern secure OCR models to index direct incoming wage potential.
              </p>
            </div>

            <div className="bg-zinc-90 w-full bg-[#0c0d12] border border-zinc-850 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-emerald-500/20">
              <div className="w-11 h-11 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-5">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2 font-sans uppercase">Chapter Governance</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                Highlights verifiable leader coordination, Google Developer Group lead status, and hackathon organization indices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF WATERMARKS */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center select-none">
        <span className="text-[10px] font-bold text-zinc-650 font-mono tracking-widest text-zinc-500 uppercase mb-8 block">CONNECTED TRUST CHANNELS & AUDITED CHIPS</span>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40 grayscale hover:opacity-85 transition-opacity duration-200">
          <div className="flex items-center gap-2 font-bold text-xs text-zinc-400 font-mono">
            <Github className="w-4 h-4" /> GITHUB CORES
          </div>
          <div className="flex items-center gap-2 font-bold text-xs text-zinc-400 font-mono">
            <Linkedin className="w-4 h-4" /> LINKEDIN SIGNATURES
          </div>
          <div className="flex items-center gap-2 font-bold text-xs text-zinc-400 font-mono">
            <Globe className="w-4 h-4" /> REGISTRAR GLOBAL OAUTH
          </div>
          <div className="flex items-center gap-2 font-bold text-xs text-zinc-400 font-mono">
            <Shield className="w-4 h-4" /> COGNITIVE SHIELD RULES
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 text-zinc-550 border-t border-zinc-900 py-12 text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 select-none">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-650 flex items-center justify-center text-white font-extrabold text-sm">CB</div>
            <span className="text-white font-bold text-xs font-sans tracking-wide">CredBridge</span>
          </div>
          <p className="text-[11px] font-mono">
            &copy; 2026 CredBridge Systems Inc. Designed with fintech visual exactness. Durable credibility layer verified.
          </p>
          <div className="flex gap-4 text-xs">
            <button onClick={() => onNavigate("/signup")} className="hover:text-white transition cursor-pointer">Privacy Gateway</button>
            <button onClick={() => onNavigate("/signup")} className="hover:text-white transition cursor-pointer">Terms of Mint</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
