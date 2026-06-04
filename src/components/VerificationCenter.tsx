import React, { useState, useRef } from "react";
import { UserProfile, VerificationItem } from "../types";
import { 
  ShieldCheck, 
  Clock, 
  Link2, 
  UploadCloud, 
  CheckCircle2, 
  FileText, 
  AlertCircle,
  Plus,
  ArrowRight
} from "lucide-react";

interface VerificationCenterProps {
  profile: UserProfile;
  verificationItems: VerificationItem[];
  onVerifyInternship: (offerLetterName: string) => void;
  onConnectClub: () => void;
}

export default function VerificationCenter({ profile, verificationItems, onVerifyInternship, onConnectClub }: VerificationCenterProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [simulatedVerifying, setSimulatedVerifying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processOfferFile(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processOfferFile(e.target.files[0].name);
    }
  };

  const triggerInputClick = () => {
    fileInputRef.current?.click();
  };

  const processOfferFile = (fileName: string) => {
    setUploadedFile(fileName);
    setSimulatedVerifying(true);
    // Simulate smart backend PDF extraction audit
    setTimeout(() => {
      setSimulatedVerifying(false);
      onVerifyInternship(fileName);
    }, 2500);
  };

  const internshipItem = verificationItems.find(item => item.id === "v-internship");

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="verification-center-view">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs text-indigo-400 font-mono tracking-widest uppercase block mb-1">
            CRYPTOGRAPHIC GATEWAY
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans">Verification Center</h1>
          <p className="text-zinc-400 text-xs mt-1 md:mt-1.5 leading-relaxed">
            Connect secure data providers or upload official files to establish compliance flags and boost your TrustScore rating.
          </p>
        </div>
        <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" /> Gateway Status: Secure
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Credentials Ledger (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-950/45 border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-sm font-bold font-mono text-zinc-450 uppercase tracking-widest mb-4">Credentials Ledger</h2>
            <div className="space-y-4">
              {verificationItems.map((item) => (
                <div 
                  key={item.id} 
                  className="border border-zinc-900 rounded-xl p-4 flex items-center justify-between gap-4 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-800 transition duration-150"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg shadow-inner mt-0.5 shrink-0">
                      {item.status === "verified" ? (
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
                      ) : item.status === "pending" ? (
                        <Clock className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                      ) : (
                        <Link2 className="w-4.5 h-4.5 text-zinc-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white font-sans">{item.name}</span>
                        {item.status === "verified" && (
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/25 px-2 py-0.5 rounded-full font-mono">VERIFIED</span>
                        )}
                        {item.status === "pending" && (
                          <span className="text-[9px] bg-amber-500/10 text-amber-400 font-bold border border-amber-500/25 px-2 py-0.5 rounded-full font-mono animate-pulse">AUDITING</span>
                        )}
                        {item.status === "not_connected" && (
                          <span className="text-[9px] bg-zinc-800 text-zinc-450 font-bold px-2 py-0.5 rounded-full font-mono">DISCONNECTED</span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-500 block mt-1 font-mono">Source: {item.sourceName}</span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {item.status === "verified" ? (
                      <span className="text-xs text-emerald-405 font-bold font-mono text-emerald-400 font-bold block">+{item.points} PTS ACTIVE</span>
                    ) : item.status === "pending" ? (
                      <span className="text-xs text-amber-505 font-bold font-mono text-amber-400 font-bold block">+{item.points} PTS PENDING</span>
                    ) : (
                      <button
                        onClick={onConnectClub}
                        className="text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded transition shadow-sm inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Connect Node
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: PDF Offer Letter Upload Portal (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#0c0d15] border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div>
              <h2 className="text-sm font-bold font-mono text-zinc-450 uppercase tracking-widest text-zinc-400">Summer Internship Verification</h2>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Upload your Software Engineer Summer 2026 offer letter. Our secure OCR and compliance pipeline verifies document authenticity instantly.
              </p>
            </div>

            {internshipItem?.status === "verified" ? (
              <div className="p-6 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl text-center space-y-4">
                <div className="w-11 h-11 bg-emerald-500/10 border border-emerald-505/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Internship Document Approved</h3>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                    Successfully verified employer credibility, employment duration, and engineering title matching 'Software Systems Summer Intern'. Added 120 points to your database rating!
                  </p>
                </div>
                <div className="p-2 border border-emerald-500/20 rounded bg-zinc-950/60 text-[10px] font-mono text-emerald-400 flex items-center justify-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 shrink-0" /> offer_letter_secured.pdf
                </div>
              </div>
            ) : simulatedVerifying ? (
              <div className="p-8 border border-dashed border-indigo-500/30 bg-indigo-500/5 rounded-2xl text-center space-y-4">
                <div className="relative w-11 h-11 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-505 border-indigo-500 border-t-transparent animate-spin" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Auditing PDF Document Structure</h3>
                  <p className="text-[11px] text-zinc-450 mt-1.5 leading-normal text-zinc-400">
                    Running OCR parsing on <span className="font-semibold text-zinc-300 font-mono">{uploadedFile}</span>. Verifying registrar endpoints, corporate signatory compliance, and title alignment.
                  </p>
                </div>
              </div>
            ) : (
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer flex flex-col items-center justify-center space-y-3 ${
                  dragActive 
                    ? "border-indigo-500 bg-indigo-500/10" 
                    : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/30 hover:bg-zinc-950/80"
                }`}
                onClick={triggerInputClick}
                id="internship-letter-dropzone"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-850 text-indigo-455 text-indigo-400 flex items-center justify-center">
                  <UploadCloud className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-300">Drag & Drop offer letter here</p>
                  <p className="text-[10px] text-zinc-500">or click to browse from desktop</p>
                </div>

                <div className="pt-2">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block bg-zinc-900 border border-zinc-850 rounded-md px-3 py-1 font-mono">
                    PDF, Word (Max 5MB)
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-2.5 items-start p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl text-[10px] text-zinc-400">
              <AlertCircle className="w-4 h-4 text-zinc-650 text-indigo-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-semibold">
                Our verification protocols maintain total compliance pipelines. Real-time document metadata is audited securely without exposing sensitive details.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
