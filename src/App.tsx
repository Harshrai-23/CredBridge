import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import AppShell from "./components/AppShell";
import TrustScoreOverview from "./components/TrustScoreOverview";
import FinancialPassport from "./components/FinancialPassport";
import OpportunityMarketplace from "./components/OpportunityMarketplace";
import VerificationCenter from "./components/VerificationCenter";
import OpportunityRoadmap from "./components/OpportunityRoadmap";
import GrowthSimulator from "./components/GrowthSimulator";
import AiTrustCoach from "./components/AiTrustCoach";

import { 
  initialProfile, 
  initialVerificationItems, 
  initialOpportunities, 
  roadmapLevels, 
  simulatorFactors 
} from "./data";
import { UserProfile, VerificationItem, Opportunity, RoadmapLevel, SimulatorFactor } from "./types";

// Dynamic routing URL & activeTab bindings
const tabToPathMap: Record<string, string> = {
  dashboard: "/dashboard",
  passport: "/passport",
  verification: "/verification",
  marketplace: "/marketplace",
  roadmap: "/roadmap",
  simulator: "/simulator",
  coach: "/coach"
};

const pathToTabMap: Record<string, string> = {
  "/dashboard": "dashboard",
  "/passport": "passport",
  "/verification": "verification",
  "/marketplace": "marketplace",
  "/roadmap": "roadmap",
  "/simulator": "simulator",
  "/coach": "coach"
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  // Initialize Auth state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const session = localStorage.getItem("credbridge_session");
    if (session) {
      try {
        const data = JSON.parse(session);
        return !!data.isLoggedIn;
      } catch {
        return false;
      }
    }
    return false;
  });

  // Dynamic Profile initializing with stored session if exists
  const [profile, setProfile] = useState<UserProfile>(() => {
    const session = localStorage.getItem("credbridge_session");
    if (session) {
      try {
        const data = JSON.parse(session);
        return {
          name: data.name || "Harsh Rai",
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(data.name || "Harsh Rai")}&backgroundColor=e0f2fe`,
          university: data.college || "Indian Institute of Technology Madras",
          major: (data.category || "Engineering / Technology") + (data.degree ? ` (${data.degree})` : ""),
          gpa: 3.82,
          graduationYear: parseInt(data.graduationYear) || 2027,
          currentTrustScore: 680,
          category: data.category || "Engineering / Technology",
        };
      } catch {
        return initialProfile;
      }
    }
    return initialProfile;
  });

  // App state managers
  const [verificationItems, setVerificationItems] = useState<VerificationItem[]>(initialVerificationItems);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [levels, setLevels] = useState<RoadmapLevel[]>(roadmapLevels);
  const [factors, setFactors] = useState<SimulatorFactor[]>(simulatorFactors);

  // Synchronize popstate back/forward actions
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Router navigator helper
  const navigate = (path: string) => {
    window.history.pushState(null, "", path);
    setCurrentPath(path);
  };

  // Guard routing and automatic redirection
  useEffect(() => {
    const isProtectedRoute = ["/dashboard", "/passport", "/verification", "/marketplace", "/roadmap", "/simulator", "/coach"].includes(currentPath);
    
    if (isProtectedRoute && !isLoggedIn) {
      // User tried to access dashboard while unauthenticated -> Redirect to login
      navigate("/login");
    } else if (isLoggedIn && (currentPath === "/" || currentPath === "/login" || currentPath === "/signup")) {
      // User is logged in but browsing auth pages -> Redirect to dashboard
      navigate("/dashboard");
    }
  }, [currentPath, isLoggedIn]);

  const activeTab = pathToTabMap[currentPath] || "dashboard";

  const handleTabChange = (tabId: string) => {
    const path = tabToPathMap[tabId];
    if (path) {
      navigate(path);
    }
  };

  // Handle Sign Up & Login successes
  const handleAuthSuccess = (
    userData: {
      name: string;
      email: string;
      college: string;
      category: string;
      degree?: string;
      graduationYear?: string;
      avatar?: string;
      currentTrustScore?: number;
      gpa?: number;
      verificationItems?: any[];
    },
    rememberMe: boolean
  ) => {
    // 1. Build and store the current session
    const sessionData = {
      ...userData,
      isLoggedIn: true,
      timestamp: Date.now()
    };
    localStorage.setItem("credbridge_session", JSON.stringify(sessionData));

    // 2. Build and store Remember Me details if checked
    if (rememberMe) {
      localStorage.setItem("credbridge_remembered", JSON.stringify(userData));
    }

    // 3. Update core student profile dynamically
    setProfile({
      name: userData.name,
      avatar: userData.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(userData.name)}&backgroundColor=e0f2fe`,
      university: userData.college,
      major: userData.category + (userData.degree ? ` (${userData.degree})` : ""),
      gpa: userData.gpa !== undefined ? userData.gpa : 3.82,
      graduationYear: parseInt(userData.graduationYear || "2027") || 2027,
      currentTrustScore: userData.currentTrustScore !== undefined ? userData.currentTrustScore : 680,
      category: userData.category || "Engineering / Technology"
    });

    // Reset or populate custom verification items
    if (userData.verificationItems && Array.isArray(userData.verificationItems)) {
      setVerificationItems(userData.verificationItems);
    } else {
      setVerificationItems(initialVerificationItems);
    }
    
    setOpportunities(initialOpportunities);
    setLevels(roadmapLevels);
    setFactors(simulatorFactors);

    // 4. Authenticate & route to main board
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  // Trigger when a PDF offer letter is uploaded & verified in the VerificationCenter
  const handleVerifyInternship = (offerLetterName: string) => {
    // 1. Update verification item
    setVerificationItems(prev => prev.map(item => {
      if (item.id === "v-internship") {
        return {
          ...item,
          status: "verified",
          lastUpdated: new Date().toISOString().split("T")[0],
          details: `Summer 2026 Systems Engineer offer verified from PDF: '${offerLetterName}'. Employer credentials cleared compliance filters.`,
        };
      }
      return item;
    }));

    // 2. Increase direct score: +45 points sandbox boost (680 -> 725)
    const newScore = 725;
    setProfile(prev => ({
      ...prev,
      currentTrustScore: newScore,
    }));

    // 3. Update roadmap levels active highlights
    setLevels(prev => prev.map(lvl => {
      if (lvl.minScore <= newScore) {
        return { ...lvl, status: "unlocked" };
      }
      return lvl;
    }));

    // 4. Update unlocked opportunities matching score 725
    setOpportunities(prev => prev.map(op => {
      if (op.requiredScore <= newScore) {
        return { ...op, status: "unlocked" };
      }
      return op;
    }));
  };

  // Trigger when connecting the club leadership authority
  const handleConnectClub = () => {
    setVerificationItems(prev => prev.map(item => {
      if (item.id === "v-club-leadership") {
        return {
          ...item,
          status: "verified",
          lastUpdated: new Date().toISOString().split("T")[0],
          details: "Verified Google Student Developer Club lead coordinates via global director registry credentials signature.",
        };
      }
      return item;
    }));

    // Boost score: +30 points sandbox boost (e.g. 725 -> 755 or 680 -> 710)
    setProfile(prev => {
      const prevScore = prev.currentTrustScore;
      const newScore = Math.min(850, prevScore + 30);
      
      // Cascade-update opportunities and levels inside setProfile block
      setTimeout(() => {
        setOpportunities(ops => ops.map(op => {
          if (op.requiredScore <= newScore) {
            return { ...op, status: "unlocked" };
          }
          return op;
        }));

        setLevels(lvls => lvls.map(lvl => {
          if (lvl.minScore <= newScore) {
            return { ...lvl, status: "unlocked" };
          }
          return lvl;
        }));
      }, 0);

      return {
        ...prev,
        currentTrustScore: newScore,
      };
    });
  };

  const handleLogout = () => {
    // Clear session & Remember me data from localStorage as per system specifications
    localStorage.removeItem("credbridge_session");
    localStorage.removeItem("credbridge_remembered");

    setIsLoggedIn(false);
    
    // Reset back to absolute defaults
    setProfile(initialProfile);
    setVerificationItems(initialVerificationItems);
    setOpportunities(initialOpportunities);
    setLevels(roadmapLevels);
    setFactors(simulatorFactors);
    
    // Router redirect back to Landing Page
    navigate("/");
  };

  // ROUTER CONTROLLING RENDER TREES
  if (currentPath === "/") {
    return <LandingPage onNavigate={navigate} />;
  }

  if (currentPath === "/signup") {
    return <AuthPage mode="signup" onNavigate={navigate} onAuthSuccess={handleAuthSuccess} />;
  }

  if (currentPath === "/login") {
    return <AuthPage mode="login" onNavigate={navigate} onAuthSuccess={handleAuthSuccess} />;
  }

  // Fallback to login if somehow visited dashboard state without auth
  if (!isLoggedIn) {
    return <AuthPage mode="login" onNavigate={navigate} onAuthSuccess={handleAuthSuccess} />;
  }

  // Otherwise return full authorized Dashboard layout shell
  return (
    <AppShell
      profile={profile}
      verificationItems={verificationItems}
      activeTab={activeTab}
      setActiveTab={handleTabChange}
      onLogout={handleLogout}
    >
      {activeTab === "dashboard" && (
        <TrustScoreOverview 
          profile={profile} 
          verificationItems={verificationItems} 
          setActiveTab={handleTabChange} 
        />
      )}

      {activeTab === "passport" && (
        <FinancialPassport 
          profile={profile} 
          verificationItems={verificationItems} 
          setActiveTab={handleTabChange} 
        />
      )}

      {activeTab === "marketplace" && (
        <OpportunityMarketplace 
          profile={profile} 
          opportunities={opportunities} 
        />
      )}

      {activeTab === "verification" && (
        <VerificationCenter 
          profile={profile} 
          verificationItems={verificationItems} 
          onVerifyInternship={handleVerifyInternship}
          onConnectClub={handleConnectClub}
        />
      )}

      {activeTab === "roadmap" && (
        <OpportunityRoadmap 
          profile={profile} 
          levels={levels} 
        />
      )}

      {activeTab === "simulator" && (
        <GrowthSimulator 
          profile={profile} 
          opportunities={opportunities} 
          factors={factors}
        />
      )}

      {activeTab === "coach" && (
        <AiTrustCoach 
          profile={profile} 
        />
      )}
    </AppShell>
  );
}
