import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { UserProfile, VerificationItem } from "../types";
import { X } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
  profile: UserProfile;
  verificationItems: VerificationItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function AppShell({ 
  children, 
  profile, 
  verificationItems, 
  activeTab, 
  setActiveTab, 
  onLogout 
}: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false); // Auto-close drawer on mobile tab select
  };

  return (
    <div className="flex bg-[#07080d] min-h-screen text-zinc-100 font-sans" id="app-shell-container">
      
      {/* 1. Desktop Sidebar (Sticky, Hidden on mobile) */}
      <div className="hidden lg:block w-64 shrink-0 border-r border-zinc-800 bg-[#0a0b12] h-screen sticky top-0">
        <Sidebar 
          profile={profile} 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          onLogout={onLogout} 
        />
      </div>

      {/* 2. Responsive Mobile Sidebar / Drawer (Slide-out menu with overlay) */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay mask */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            id="mobile-drawer-overlay"
          />
          {/* Menu Drawer */}
          <div 
            className="fixed top-0 left-0 bottom-0 w-72 bg-[#0a0b12] border-r border-zinc-800 z-55 lg:hidden flex flex-col shadow-2xl animate-in slide-in-from-left duration-200"
            id="mobile-drawer-menu"
          >
            {/* Header with close option */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base">
                  C
                </div>
                <span className="font-extrabold text-white text-lg tracking-tight">CredBridge</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg cursor-pointer"
                aria-label="Close menu"
                id="close-mobile-menu-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar inside drawer */}
            <div className="flex-1 overflow-y-auto">
              <Sidebar 
                profile={profile} 
                activeTab={activeTab} 
                setActiveTab={handleTabChange} 
                onLogout={onLogout} 
                isCollapsedStyle={false}
              />
            </div>
          </div>
        </>
      )}

      {/* 3. Main Viewport Pane */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar 
          profile={profile} 
          verificationItems={verificationItems} 
          onMenuToggle={handleMenuToggle}
          isMobileMenuOpen={isMobileMenuOpen}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
        />

        {/* Content Panel Scroll Frame */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8 lg:px-10" id="main-content-viewport">
          <div className="max-w-7xl mx-auto w-full pb-12">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
