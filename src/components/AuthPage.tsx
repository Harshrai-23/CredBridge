import React, { useState, useEffect } from "react";
import { VerificationItem } from "../types";
import { 
  ShieldCheck, 
  Sparkles, 
  Unlock, 
  Lock, 
  ArrowRight, 
  User, 
  Mail, 
  School, 
  GraduationCap, 
  ArrowLeft,
  Loader2,
  Check
} from "lucide-react";

interface AuthPageProps {
  mode: "login" | "signup";
  onNavigate: (path: string) => void;
  onAuthSuccess: (userData: {
    name: string;
    email: string;
    college: string;
    category: string;
    degree?: string;
    graduationYear?: string;
    currentTrustScore?: number;
    gpa?: number;
    verificationItems?: VerificationItem[];
  }, rememberMe: boolean) => void;
}

const demoProfiles: {
  id: string;
  name: string;
  email: string;
  college: string;
  category: string;
  degree: string;
  graduationYear: string;
  gpa: number;
  currentTrustScore: number;
  avatar: string;
  verificationItems: VerificationItem[];
}[] = [
  {
    id: "harsh",
    name: "Harsh Rai",
    email: "harsh.rai@iitm.ac.in",
    college: "Indian Institute of Technology Madras",
    category: "Engineering / Technology",
    degree: "B.Tech Computer Science",
    graduationYear: "2027",
    gpa: 3.82,
    currentTrustScore: 680,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Harsh&backgroundColor=e0f2fe",
    verificationItems: [
      {
        id: "v-student-status",
        name: "Enrolled Student Status",
        category: "academic",
        sourceName: "University OAuth Registrar",
        status: "verified",
        lastUpdated: "2026-05-15",
        points: 150,
        details: "Verifies standard full-time student status, year, and institution validity."
      },
      {
        id: "v-transcript",
        name: "Official CGPA Transcript",
        category: "academic",
        sourceName: "National Digilocker Core API",
        status: "verified",
        lastUpdated: "2026-05-18",
        points: 200,
        details: "CGPA of 9.55 / 10.00 verified with active academic record."
      },
      {
        id: "v-github",
        name: "Developer Skill Signature",
        category: "skills",
        sourceName: "GitHub OAuth API Gateway",
        status: "verified",
        lastUpdated: "2026-05-20",
        points: 180,
        details: "14 repositories indexed, including 3 original systems. 52 contributions resolved."
      },
      {
        id: "v-linkedin",
        name: "Linkedin Professional Profile",
        category: "professional",
        sourceName: "LinkedIn Talent API Integration",
        status: "verified",
        lastUpdated: "2026-05-22",
        points: 100,
        details: "Verified headline match: 'CS Junior @ IIT Madras | Budding Systems Engineer'."
      },
      {
        id: "v-internship",
        name: "Software Engineering Summer Offer",
        category: "professional",
        sourceName: "Corporate HR System Integration or PDF Audit",
        status: "pending",
        lastUpdated: "Not Verified",
        points: 120,
        details: "Requires upload of Signed Summer 2026 Internship Offer Letter or HR manager endorsement."
      },
      {
        id: "v-club-leadership",
        name: "Google Developer Group Lead Status",
        category: "leadership",
        sourceName: "GDG Global Director Registry",
        status: "not_connected",
        lastUpdated: "Never",
        points: 100,
        details: "Connect GDG/DSC community records or official student body certificate."
      }
    ]
  },
  {
    id: "priya",
    name: "Priya Sharma",
    email: "priya.sharma@aiims.edu",
    college: "All India Institute of Medical Sciences",
    category: "Medical / Healthcare",
    degree: "MBBS Medicine",
    graduationYear: "2026",
    gpa: 3.91,
    currentTrustScore: 710,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Priya&backgroundColor=fef2f2",
    verificationItems: [
      {
        id: "v-student-status",
        name: "Enrolled Student Status",
        category: "academic",
        sourceName: "AIIMS Registrar OAuth",
        status: "verified",
        lastUpdated: "2026-05-15",
        points: 150,
        details: "Confirmed senior MBBS student enrollment status."
      },
      {
        id: "v-transcript",
        name: "Official Clinical Transcript",
        category: "academic",
        sourceName: "NMC Digilocker Node",
        status: "verified",
        lastUpdated: "2026-05-18",
        points: 200,
        details: "CGPA of 9.78 / 10.00 verified with perfect clinical rotation remarks."
      },
      {
        id: "v-github",
        name: "Medical Bio-informatics Code",
        category: "skills",
        sourceName: "GitHub OAuth API Gateway",
        status: "verified",
        lastUpdated: "2026-05-20",
        points: 180,
        details: "Indexed 4 original computational disease modeling pipelines."
      },
      {
        id: "v-linkedin",
        name: "Linkedin Professional Profile",
        category: "professional",
        sourceName: "LinkedIn Talent API Integration",
        status: "verified",
        lastUpdated: "2026-05-22",
        points: 100,
        details: "Verified profile: 'Medical Student & Computational Bio Researcher @ AIIMS'."
      },
      {
        id: "v-internship",
        name: "Global Health Clinical Rotation",
        category: "professional",
        sourceName: "WHO / NHS Hospital HR Registry",
        status: "pending",
        lastUpdated: "Not Verified",
        points: 120,
        details: "Requires upload of verified overseas rotation invitation letter."
      },
      {
        id: "v-club-leadership",
        name: "Student Council Bio-Ethics Chair",
        category: "leadership",
        sourceName: "AIIMS Chapter Director Registry",
        status: "not_connected",
        lastUpdated: "Never",
        points: 100,
        details: "Upload verified leadership certificate to unlock Level 4 benefits."
      }
    ]
  },
  {
    id: "rohit",
    name: "Rohit Verma",
    email: "rohit.verma@srcc.du.ac.in",
    college: "Shri Ram College of Commerce",
    category: "Commerce / Finance",
    degree: "B.Com Honors",
    graduationYear: "2026",
    gpa: 3.55,
    currentTrustScore: 640,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Rohit&backgroundColor=f0fdf4",
    verificationItems: [
      {
        id: "v-student-status",
        name: "Enrolled Student Status",
        category: "academic",
        sourceName: "DU Registrar OAuth Link",
        status: "verified",
        lastUpdated: "2026-05-12",
        points: 150,
        details: "Verified active full-time enrollment."
      },
      {
        id: "v-transcript",
        name: "Academics Commerce Transcript",
        category: "academic",
        sourceName: "Digilocker Ministry API",
        status: "verified",
        lastUpdated: "2026-05-14",
        points: 180,
        details: "Verified CGPA of 8.88 / 10.00 with top percentile scoring in Fin-Modeling."
      },
      {
        id: "v-github",
        name: "Algorithmic Trading Portals",
        category: "skills",
        sourceName: "GitHub OAuth API Gateway",
        status: "verified",
        lastUpdated: "2026-05-19",
        points: 155,
        details: "CFA python backtesting frameworks verified in repositories."
      },
      {
        id: "v-linkedin",
        name: "Linkedin Professional Profile",
        category: "professional",
        sourceName: "LinkedIn Talent API Integration",
        status: "verified",
        lastUpdated: "2026-05-22",
        points: 100,
        details: "Verified headline: 'Finance Student SRCC | Incoming Analyst'."
      },
      {
        id: "v-internship",
        name: "Investment Analyst Summer Internship",
        category: "professional",
        sourceName: "Capital Fund HR Audit",
        status: "pending",
        lastUpdated: "Not Verified",
        points: 120,
        details: "Requires upload of summer internship confirmation credentials."
      },
      {
        id: "v-club-leadership",
        name: "Finance & Investment Society Head",
        category: "leadership",
        sourceName: "College Dean Verification Registry",
        status: "not_connected",
        lastUpdated: "Never",
        points: 100,
        details: "Connect student organization credentials to boost score."
      }
    ]
  },
  {
    id: "ananya",
    name: "Ananya Iyer",
    email: "ananya.iyer@iisc.ac.in",
    college: "Indian Institute of Science",
    category: "Science / Research",
    degree: "B.Sc Physics",
    graduationYear: "2027",
    gpa: 3.96,
    currentTrustScore: 780,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Ananya&backgroundColor=faf5ff",
    verificationItems: [
      {
        id: "v-student-status",
        name: "Enrolled Scholar Status",
        category: "academic",
        sourceName: "IISc Dean Student OAuth",
        status: "verified",
        lastUpdated: "2026-05-15",
        points: 150,
        details: "Confirmed BS Science Scholar Status."
      },
      {
        id: "v-transcript",
        name: "Scientific Honors Transcript",
        category: "academic",
        sourceName: "Academic Digilocker Node",
        status: "verified",
        lastUpdated: "2026-05-17",
        points: 210,
        details: "Perfect CGPA 9.90 / 10.00 verified across theoretical models."
      },
      {
        id: "v-github",
        name: "Quantum Simulation Libraries",
        category: "skills",
        sourceName: "GitHub OAuth API Gateway",
        status: "verified",
        lastUpdated: "2026-05-18",
        points: 230,
        details: "Contributor to 2 mainline scientific packages. Highly vetted logic."
      },
      {
        id: "v-linkedin",
        name: "Linkedin Professional Profile",
        category: "professional",
        sourceName: "LinkedIn Talent API Integration",
        status: "verified",
        lastUpdated: "2026-05-19",
        points: 100,
        details: "Verified headline: 'BS Scholar IISc | Quantum Computing Researcher'."
      },
      {
        id: "v-internship",
        name: "CERN Summer Research Fellowship",
        category: "professional",
        sourceName: "CERN HR Fellowship Audit",
        status: "pending",
        lastUpdated: "Not Verified",
        points: 120,
        details: "Requires CERN research coordinator invitation letter PDF upload."
      },
      {
        id: "v-club-leadership",
        name: "Quantum Computing Society Lead",
        category: "leadership",
        sourceName: "Global Quantum Alliance Registry",
        status: "not_connected",
        lastUpdated: "Never",
        points: 100,
        details: "Connect verified lead certificate. Unlocks Elite Venture rewards."
      }
    ]
  }
];

export default function AuthPage({ mode, onNavigate, onAuthSuccess }: AuthPageProps) {
  // Demo select and manual custom passport tab
  const [authMethod, setAuthMethod] = useState<"demo" | "custom">("custom");

  // Common Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [category, setCategory] = useState("Engineering / Technology");
  const [degree, setDegree] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Loading & Flow State
  const [isLoading, setIsLoading] = useState(false);
  const [showRememberedState, setShowRememberedState] = useState(false);
  const [rememberedUser, setRememberedUser] = useState<any>(null);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Check for remembered user in localStorage on mount or mode change
  useEffect(() => {
    if (mode === "login") {
      const stored = localStorage.getItem("credbridge_remembered");
      if (stored) {
        try {
          const user = JSON.parse(stored);
          if (user && user.name && user.email) {
            setRememberedUser(user);
            setShowRememberedState(true);
          }
        } catch (e) {
          console.error("Error parsing remembered user", e);
        }
      }
    }
  }, [mode]);

  // Handle Form field validations
  const validate = () => {
    const nextErrors: { [key: string]: string } = {};

    if (mode === "signup") {
      if (!name.trim()) nextErrors.name = "Full name is required";
      else if (name.trim().length < 2) nextErrors.name = "Enter a valid full name";
    }

    if (!email.trim()) {
      nextErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!password) {
      nextErrors.password = "Password is required";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    if (mode === "signup") {
      if (!college.trim()) nextErrors.college = "College / University is required";
      if (!category) nextErrors.category = "Please select a student category";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // Live inline validation checker
  useEffect(() => {
    if (name || email || college || password) {
      validate();
    }
  }, [name, email, college, password, category, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate cryptographic proof building pipeline
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: mode === "signup" ? name : (email.split("@")[0] || "Student"),
        email,
        college: mode === "signup" ? college : "National Institute of Technology",
        category,
        degree,
        graduationYear
      }, rememberMe);
    }, 1500);
  };

  const handleContinueAsRemembered = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: rememberedUser.name,
        email: rememberedUser.email,
        college: rememberedUser.college,
        category: rememberedUser.category,
        degree: rememberedUser.degree,
        graduationYear: rememberedUser.graduationYear
      }, true);
    }, 1000);
  };

  const handleUseAnotherAccount = () => {
    setShowRememberedState(false);
  };

  // Form validity status
  const isFormValid = (() => {
    if (mode === "signup") {
      return name.trim().length >= 2 && 
             /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && 
             college.trim().length >= 2 && 
             category !== "" &&
             password.length >= 6;
    } else {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 6;
    }
  })();

  const categoriesOpts = [
    "Engineering / Technology",
    "Medical / Healthcare",
    "Commerce / Finance",
    "Arts / Humanities",
    "Science / Research",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-[#05060b] text-white font-sans flex flex-col md:flex-row relative overflow-hidden select-none">
      
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HOME HEADER LOGO */}
      <div className="absolute top-6 left-6 z-35 flex items-center gap-3">
        <button 
          onClick={() => onNavigate("/")} 
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-900 bg-zinc-950/80 text-zinc-300 text-xs hover:text-white hover:border-zinc-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
            C
          </div>
          <span className="text-sm font-bold tracking-tight text-white font-sans">CredBridge</span>
        </div>
      </div>

      {/* LEFT SECTION (BRANDING & FINTECH INTERFACE) - Hidden on mobile, flex-1 on desktop */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 pr-6 border-r border-zinc-900 bg-zinc-950/30 relative overflow-hidden">
        {/* Glow vector circle */}
        <div className="absolute w-[350px] h-[350px] top-1/4 left-1/3 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Empty space for top navbar overlay */}
        <div className="h-12" />

        {/* Content Block */}
        <div className="space-y-8 z-10 max-w-lg mt-12">
          <div>
            <span className="text-xs text-indigo-400 font-mono tracking-widest uppercase block mb-2 font-bold select-none leading-none">
              SECURE DECENTRALIZED IDENTITY
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white font-sans leading-[1.1]">
              Build Your <br />Financial Passport
            </h1>
            <p className="text-indigo-200 text-sm mt-3 leading-relaxed font-medium">
              Unlock life-changing benefits, technical scholarships, and credit grants before credit history exists.
            </p>
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-zinc-400 font-sans">
            {[
              "Generate Your TrustScore",
              "Build Your Financial Passport",
              "Verify Achievements",
              "Discover Scholarships",
              "Unlock Opportunities",
              "Improve Financial Readiness"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                  ✓
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Demo Cards */}
        <div className="relative h-64 mt-8 flex items-center justify-center gap-6 z-10 select-none">
          {/* TrustScore Preview Card */}
          <div className="p-5 border border-indigo-900/40 bg-gradient-to-br from-indigo-950/50 via-zinc-900 to-[#121323] rounded-2xl w-56 shadow-2xl relative transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300">
            <span className="text-[9px] font-bold text-zinc-500 font-mono tracking-wider block uppercase">FINANCIAL LOG</span>
            <div className="flex justify-between items-baseline mt-2 pb-3 border-b border-zinc-800/80">
              <span className="text-2xl font-black text-white font-mono">742</span>
              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider font-mono">ACTIVE TIER</span>
            </div>
            <div className="pt-3 flex justify-between items-center text-[10px] text-zinc-400">
              <span>Confidence Index:</span>
              <span className="font-bold text-indigo-400">84%</span>
            </div>
          </div>

          {/* Opportunity preview card */}
          <div className="p-5 border border-zinc-800/80 bg-zinc-900/60 rounded-2xl w-60 shadow-2xl relative transform rotate-3 hover:translate-y-[-4px] transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold text-zinc-400 font-mono uppercase tracking-wide leading-none">Nov Apex Credit</span>
              <span className="text-[8px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold font-mono">✓ ELIGIBLE</span>
            </div>
            <h4 className="text-xs font-bold text-white mt-2 leading-tight">Relocation Micro-Credit Line</h4>
            <p className="text-[9px] text-zinc-400 mt-1 line-clamp-2">Low-interest line of credit for engineering juniors relocation expenses.</p>
            <div className="mt-3 border-t border-zinc-800/80 pt-2 flex justify-between text-[11px]">
              <span className="text-zinc-500 font-bold block">Limit</span>
              <span className="text-white font-bold">$15,000</span>
            </div>
          </div>
        </div>

        {/* Secure system watermark */}
        <div className="text-[10px] font-mono text-zinc-650 text-zinc-500">
          SECURE CREDENTIAL INDEXING ENGINE v3.5 // WORKSPACE ENABLED
        </div>
      </div>

      {/* RIGHT SECTION (FORM CARD AND PROCESSOR CONTAINER) - flex-1 */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-20 lg:p-12">
        <div className="w-full max-w-md bg-zinc-90 w-full bg-zinc-950/40 border border-zinc-900 p-6 md:p-8 rounded-3xl shadow-2xl relative z-10">
          
          {/* 1. RETURNING USER EXPERIENCE (REMEMBERED USER CHIPS) */}
          {showRememberedState && mode === "login" ? (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200 text-center py-4">
              <div className="space-y-2">
                <span className="text-2xl block">Welcome Back 👋</span>
                <h2 className="text-lg font-bold text-white tracking-tight">Access Your Financial Passport</h2>
                <p className="text-zinc-400 text-xs">Instantly connect with your stored credentials node.</p>
              </div>

              {/* Profile Selector Item */}
              <div className="p-5 border border-zinc-800 bg-zinc-900/40 rounded-2xl flex items-center gap-4 text-left mx-auto max-w-sm hover:border-indigo-500/30 transition-all duration-150">
                <img 
                  src={`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(rememberedUser?.name || "Student")}&backgroundColor=e0f2fe`} 
                  alt="Avatar"
                  className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700/60 object-cover p-0.5"
                />
                <div className="overflow-hidden space-y-1">
                  <span className="text-sm font-bold text-white block leading-tight">{rememberedUser?.name}</span>
                  <span className="text-xs text-indigo-400 block truncate leading-tight font-mono">{rememberedUser?.college}</span>
                  <span className="text-[10px] text-zinc-500 block truncate leading-tight">{rememberedUser?.category}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={handleContinueAsRemembered}
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying Cryptographic Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue as {rememberedUser?.name.split(" ")[0]}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  onClick={handleUseAnotherAccount}
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-300 font-semibold text-xs transition cursor-pointer"
                >
                  Use Another Account
                </button>
              </div>
            </div>
          ) : (
            /* Switchable UI: Demo quick login vs Custom credentials */
            <div className="space-y-6">
              {/* Tabs */}
              <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800 gap-1 animate-in fade-in duration-150" id="auth-method-tabs">
                <button
                  type="button"
                  onClick={() => setAuthMethod("demo")}
                  className={`flex-1 py-1.5 text-center rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    authMethod === "demo"
                      ? "bg-zinc-800 text-white shadow font-extrabold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  id="tab-demo-profiles-btn"
                >
                  Demo Logins
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod("custom")}
                  className={`flex-1 py-1.5 text-center rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    authMethod === "custom"
                      ? "bg-zinc-800 text-white shadow font-extrabold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  id="tab-custom-passport-btn"
                >
                  {mode === "signup" ? "New Passport" : "Manual Login"}
                </button>
              </div>

              {authMethod === "demo" ? (
                /* Demo profiles list click logic */
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="text-center space-y-1">
                    <h3 className="text-xs font-bold text-zinc-300 font-mono uppercase tracking-wider">Select Test Profile</h3>
                    <p className="text-[10px] text-zinc-400 leading-relaxed max-w-xs mx-auto font-sans">
                      Recommended for judges and organizers. Instantly logs you into a fully configured financial passport with custom indicators and documents.
                    </p>
                  </div>

                  <div className="space-y-2 max-h-[380px] overflow-y-auto pr-0.5" id="demo-profiles-picker">
                    {demoProfiles.map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => {
                          setIsLoading(true);
                          setTimeout(() => {
                            setIsLoading(false);
                            onAuthSuccess(user, rememberMe);
                          }, 750);
                        }}
                        className="w-full flex items-center gap-3 p-3 bg-[#0c0d12]/65 hover:bg-zinc-900 border border-zinc-900 hover:border-indigo-500/30 rounded-xl transition-all cursor-pointer text-left select-none group focus:border-indigo-500"
                      >
                        <div className="relative shrink-0">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/60 object-cover"
                          />
                          <span className="absolute -bottom-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white shadow font-mono">
                            ★
                          </span>
                        </div>

                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] font-bold text-white group-hover:text-indigo-300 transition-colors">
                              {user.name}
                            </span>
                            <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase font-mono">
                              Score: {user.currentTrustScore}
                            </span>
                          </div>
                          <span className="text-[10.5px] text-zinc-400 block truncate font-sans">
                            {user.college}
                          </span>
                          <span className="text-[9.5px] text-zinc-500 block font-mono uppercase">
                            {user.category} &bull; CGPA {(user.gpa && user.gpa <= 5 ? user.gpa * 2.5 : user.gpa).toFixed(2)}/10
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* 2. STANDARD SIGNUP & LOGIN FORM */
                <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-white">
                      {mode === "signup" ? "Create Your Financial Passport" : "Welcome Back"}
                    </h2>
                    <p className="text-zinc-500 text-xs mt-1">
                      {mode === "signup" 
                        ? "Start building your alternative financial credibility today." 
                        : "Access alternative credit capability lines immediately."}
                    </p>
                  </div>

              <div className="space-y-4">
                {/* Full name (Required for signup only) */}
                {mode === "signup" && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        required={mode === "signup"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full pl-9 pr-4 py-2.5 bg-zinc-900/60 border rounded-xl text-xs text-white placeholder-zinc-500 tracking-wide focus:outline-none transition ${
                          errors.name ? "border-rose-500/50 focus:border-rose-500" : "border-zinc-800 focus:border-indigo-500"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <span className="text-[10px] text-rose-450 text-rose-400 font-semibold font-mono block ml-1">{errors.name}</span>
                    )}
                  </div>
                )}

                {/* Email (Required for both signup & login) */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      placeholder="name@university.edu"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2.5 bg-zinc-900/60 border rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none transition ${
                        errors.email ? "border-rose-500/50 focus:border-rose-500" : "border-zinc-800 focus:border-indigo-500"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[10px] text-rose-450 text-rose-400 font-semibold font-mono block ml-1">{errors.email}</span>
                  )}
                </div>

                {/* Password (Required for both signup & login) */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2.5 bg-zinc-900/60 border rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none transition ${
                        errors.password ? "border-rose-500/50 focus:border-rose-500" : "border-zinc-800 focus:border-indigo-500"
                      }`}
                    />
                  </div>
                  {errors.password && (
                    <span className="text-[10px] text-rose-450 text-rose-400 font-semibold font-mono block ml-1">{errors.password}</span>
                  )}
                </div>

                {mode === "signup" && (
                  <>
                    {/* College/University */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">College / University *</label>
                      <div className="relative">
                        <School className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        <input
                          type="text"
                          placeholder="Enter your college / university"
                          required
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                          className={`w-full pl-9 pr-4 py-2.5 bg-zinc-900/60 border rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none transition ${
                            errors.college ? "border-rose-500/50 focus:border-rose-500" : "border-zinc-800 focus:border-indigo-500"
                          }`}
                        />
                      </div>
                      {errors.college && (
                        <span className="text-[10px] text-rose-450 text-rose-400 font-semibold font-mono block ml-1">{errors.college}</span>
                      )}
                    </div>

                    {/* Student Category Selection dropdown option */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">Student Category *</label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 bg-zinc-90 w-full bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition cursor-pointer appearance-none"
                        >
                          {categoriesOpts.map((opt) => (
                            <option key={opt} value={opt} className="bg-zinc-900 text-white text-xs">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-3.5 w-1.5 h-1.5 border-r border-b border-zinc-500 transform rotate-45 pointer-events-none" />
                      </div>
                    </div>

                    {/* Degree & Graduation Year (Optional fields) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono block">Degree (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. B.Tech Computer Science"
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                          className="w-full px-3 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono block">Grad Year (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. 2027"
                          value={graduationYear}
                          onChange={(e) => setGraduationYear(e.target.value)}
                          className="w-full px-3 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition font-mono"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Remember Me Option */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-400 select-none hover:text-zinc-200 transition">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-zinc-800 bg-zinc-900 text-indigo-600 focus:ring-indigo-500 outline-none w-3.5 h-3.5"
                    />
                    <span>Remember Me</span>
                  </label>
                </div>
              </div>

              {/* ACTION COMMAND BUTTON - Disabled until validation is green */}
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full py-3.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg tracking-wide ${
                  isFormValid && !isLoading
                    ? "bg-gradient-to-r from-purple-600 to-indigo-650 bg-indigo-600 hover:from-purple-700 hover:to-indigo-750 text-white cursor-pointer active:scale-98"
                    : "bg-zinc-900 border border-zinc-850 text-zinc-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Processing Secure Gateway Authentication...</span>
                  </>
                ) : (
                  <>
                    <span>{mode === "signup" ? "Create Financial Passport" : "Continue"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* cosmetic Google SSO connector */}
              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      onAuthSuccess({
                        name: "Google Student",
                        email: "student@gmail.com",
                        college: "National Institute of Technology",
                        category: "Engineering / Technology"
                      }, true);
                    }, 1000);
                  }}
                  className="w-full py-3 border border-zinc-900 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.12-3.12C17.42 1.83 14.91 1 12 1 7.35 1 3.4 3.72 1.57 7.7l3.78 2.93c.89-2.65 3.39-4.59 6.65-4.59z"/>
                    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.98 3.39-4.88 3.39-8.54z"/>
                    <path fill="#FBBC05" d="M5.35 10.63c-.23-.68-.35-1.4-.35-2.13s.12-1.45.35-2.13L1.57 3.41C.57 5.39 0 7.63 0 10s.57 4.61 1.57 6.59l3.78-2.96z"/>
                    <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.92l-3.66-2.84c-1.01.68-2.33 1.09-3.9 1.09-3.26 0-6.04-2.13-7-.53l-3.78 2.93C3.4 20.28 7.35 23 12 23z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              )}

              {/* FOOTER TRANSITION */}
              <div className="text-center text-xs text-zinc-500 pt-4 border-t border-zinc-905 border-zinc-900/60">
                {mode === "signup" ? (
                  <p>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => onNavigate("/login")}
                      className="text-indigo-400 font-bold hover:underline ml-1 cursor-pointer"
                    >
                      Sign In
                    </button>
                  </p>
                ) : (
                  <p>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => onNavigate("/signup")}
                      className="text-indigo-400 font-bold hover:underline ml-1 cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </p>
                )}
              </div>
              </form>
            )}
          </div>
        )}

        </div>
      </div>

    </div>
  );
}
