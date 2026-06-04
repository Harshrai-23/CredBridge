import { useState, useEffect, useRef } from "react";
import { ChatMessage, UserProfile } from "../types";
import { 
  Send, 
  Sparkles, 
  CircleAlert
} from "lucide-react";

interface AiTrustCoachProps {
  profile: UserProfile;
}

export default function AiTrustCoach({ profile }: AiTrustCoachProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-msg-1",
      sender: "bot",
      content: `Hello ${profile.name}! I am your **CredBridge AI Trust Coach**. 
      
My core engine is powered by **Gemini 3.5**. I analyze your Student Financial Passport dimensions to suggest high-impact steps to boost your TrustScore rating.

How can I help you build credibility today? See suggested topics below or type any question!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const starterPrompts = [
    { label: "Boost GitHub commit score", prompt: "How can I maximize my Developer Skill Signature score through GitHub?" },
    { label: "Verify upcoming internship", prompt: "How can I verify my Software Engineering summer internship and what points does it add?" },
    { label: "CGPA weighting explanation", prompt: "Explain how my college CGPA of 9.55 weighs into credit capability." },
    { label: "CGPA vs alternative indicators", prompt: "How does college CGPA compare to alternative indictators on CredBridge?" },
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-msg-${Date.now()}`,
      sender: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages(prev => [...prev, userMsg]);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({
            role: m.sender === "user" ? "user" : "model",
            text: m.content
          })),
          profile
        }),
      });

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: `bot-msg-${Date.now()}`,
        sender: "bot",
        content: data.reply || "I encountered an error querying the Gemini gateway.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
      const botMsg: ChatMessage = {
        id: `bot-msg-${Date.now()}`,
        sender: "bot",
        content: "Oops! I encountered a network error trying to reach the Trust Coach endpoint.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-300" id="ai-trust-coach-view">
      
      {/* Header Info Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-6 shrink-0">
        <div>
          <span className="text-xs text-indigo-400 font-mono tracking-widest uppercase block mb-1">
            GEMINI COGNITIVE ASSISTANT
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans">AI Trust Coach</h1>
          <p className="text-zinc-400 text-xs mt-1 md:mt-1.5 leading-relaxed">
            Analyze achievement configurations, map pathways, and extract strategic credential directions using Gemini AI.
          </p>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl text-xs font-semibold text-indigo-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" /> Intelligent Core Active
        </div>
      </div>

      {/* Main Grid: Messages block and Quick Tips rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Chat Interface Column (8 Columns) */}
        <div className="lg:col-span-8 bg-[#0c0d15] border border-zinc-800 rounded-2xl flex flex-col h-full overflow-hidden shadow-2xl">
          {/* Scroll container */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
            {messages.map((m) => {
              const isBot = m.sender === "bot";
              return (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-3xl ${isBot ? "mr-12" : "ml-12 justify-end"}`}
                >
                  {isBot && (
                    <div className="w-8 h-8 rounded-lg bg-indigo-505/10 bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0 text-xs font-bold font-mono">
                      TC
                    </div>
                  )}
                  <div className="space-y-1 max-w-[85%] md:max-w-[75%]">
                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed border ${
                        isBot
                          ? "bg-zinc-900/40 text-zinc-350 border-zinc-800 rounded-tl-none font-semibold text-zinc-350 line"
                          : "bg-indigo-600 text-white border-indigo-500 rounded-tr-none font-extrabold"
                      }`}
                    >
                      {/* Very simple markdown parser for bold codes */}
                      {m.content.split("\n\n").map((para, pIdx) => {
                        return (
                          <p key={pIdx} className="mb-2 last:mb-0">
                            {para.split("**").map((text, tIdx) => {
                              if (tIdx % 2 === 1) {
                                return <strong key={tIdx} className={isBot ? "font-bold text-white font-sans" : "font-black"}>{text}</strong>;
                              }
                              return text;
                            })}
                          </p>
                        );
                      })}
                    </div>
                    <span className={`text-[9px] text-zinc-500 font-mono block px-1 ${!isBot && "text-right"}`}>
                      {m.timestamp}
                    </span>
                  </div>
                  {!isBot && (
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center border border-zinc-750 shrink-0 text-xs font-mono font-bold uppercase">
                      H
                    </div>
                  )}
                </div>
              );
            })}
            
            {loading && (
              <div className="flex gap-3 max-w-3xl mr-12 items-center">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0 text-xs font-bold animated-pulse">
                  TC
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Prompt Buttons Footer */}
          <div className="border-t border-zinc-900 p-4 shrink-0 bg-zinc-950/20">
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.prompt)}
                  disabled={loading}
                  className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-semibold shadow-sm hover:bg-zinc-850 hover:text-white hover:border-zinc-700 transition shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {p.label} &rarr;
                </button>
              ))}
            </div>
          </div>

          {/* User input controller */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(userInput);
            }}
            className="border-t border-zinc-900 p-4 flex gap-3 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask me something, e.g. How do I unlock Level 3?"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-3 border border-zinc-800 rounded-xl bg-zinc-950/40 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition shadow-inner font-medium disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!userInput.trim() || loading}
              className="px-4 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 hover:bg-indigo-700 active:scale-95 transition disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Advisor Tips Rail Column (4 Columns) */}
        <div className="lg:col-span-4 bg-zinc-950/20 border border-zinc-800 rounded-2xl p-5 overflow-y-auto space-y-6 h-full shadow-xl hidden lg:block">
          <div>
            <h2 className="text-xs font-bold font-mono text-zinc-450 uppercase tracking-widest text-zinc-400">Key Dimensions</h2>
            <p className="text-[10px] text-zinc-500 mt-1">Values to target when prompting your Trust Coach.</p>
          </div>

          <div className="space-y-4 text-[10px] font-mono">
            <div className="p-3.5 border border-zinc-800/80 rounded-xl bg-zinc-900/20 flex flex-col justify-between">
              <span className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Academic Percentile</span>
              <div className="flex justify-between items-baseline mt-2">
                <span className="text-white font-extrabold text-xs">CGPA 9.55 (Verified)</span>
                <span className="text-indigo-400 font-sans font-extrabold text-xs">+200 PTS</span>
              </div>
            </div>

            <div className="p-3.5 border border-[#1d1f33]/30 border-zinc-800/80 rounded-xl bg-zinc-900/20 flex flex-col justify-between">
              <span className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Developer Skill Percentile</span>
              <div className="flex justify-between items-baseline mt-2">
                <span className="text-white font-extrabold text-xs">14 Git Repos (Verified)</span>
                <span className="text-indigo-400 font-sans font-extrabold text-xs">+180 PTS</span>
              </div>
            </div>

            <div className="p-3.5 border border-zinc-800/80 rounded-xl bg-zinc-900/20 flex flex-col justify-between">
              <span className="text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Upcoming Internship</span>
              <div className="flex justify-between items-baseline mt-2">
                <span className="text-white font-extrabold text-xs">Summer SW Eng (Pending)</span>
                <span className="text-amber-500 font-sans font-extrabold text-xs">Pending (+120)</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-indigo-500/5 text-indigo-400 border border-indigo-500/10 rounded-xl space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[9px] font-mono">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" /> Coach Intelligence
            </div>
            <p className="leading-relaxed font-semibold text-[10px] text-zinc-400">
              Your Trust Coach aggregates connected university credentials, verified source contributions, and real-time job offer compliance values seamlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
