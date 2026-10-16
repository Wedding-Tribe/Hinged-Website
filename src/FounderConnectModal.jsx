import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Mail,
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  ShieldCheck,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export default function FounderConnectModal({ isOpen, onClose, intent = 'demo' }) {
  const [copied, setCopied] = useState(false);
  const founderName = 'Harshit Agarwal';
  const founderRole = 'AI Product Manager & 0-to-1 Systems Builder';
  const founderEmail = 'agarwal.harshit97@gmail.com';
  const githubUser = 'https://github.com/1997agarwal';
  const githubRepo = 'https://github.com/Wedding-Tribe/hinged';
  const linkedinUrl = 'https://www.linkedin.com/in/1997agarwal';
  const xUrl = 'https://x.com/1997agarwal';

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(founderEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoSubject = intent === 'partnership'
    ? encodeURIComponent('Hinged Wedding Planner & Agency Inquiry - Harshit Agarwal')
    : encodeURIComponent('Hinged Architecture Demo & Product Walkthrough - Harshit Agarwal');

  const mailtoBody = encodeURIComponent(
    `Hi Harshit,\n\nI was exploring the Hinged platform showcase and would love to schedule a 1-on-1 walkthrough / discuss product and coordination opportunities for our upcoming celebrations.\n\nBest,\n`
  );

  const mailtoLink = `mailto:${founderEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#D4AF37]/30 shadow-2xl p-6 sm:p-8 overflow-hidden text-[#231F20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative background gradient */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#800020]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge & Title */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#800020]/10 text-[#800020] border border-[#800020]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Direct Founder Walkthrough
          </span>
        </div>

        <h3 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
          Connect with the Founder
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
          Hinged was engineered by <span className="font-semibold text-gray-900">{founderName}</span> to solve the chaotic multi-ceremony coordination dynamics of Indian weddings.
        </p>

        {/* Founder Bio Card */}
        <div className="mt-5 p-4 rounded-2xl bg-white border border-[#E5DCCF] shadow-xs flex items-center gap-4">
          <div className="relative">
            <div className="w-13 h-13 rounded-2xl bg-linear-to-br from-[#800020] to-[#2A0812] flex items-center justify-center text-white font-serif font-bold text-xl shadow-md border-2 border-[#D4AF37]">
              HA
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-900 truncate">{founderName}</h4>
            <p className="text-xs text-gray-500 font-medium truncate">{founderRole}</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-600">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#800020] font-semibold flex items-center gap-1 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                <span>LinkedIn</span>
              </a>
              <span>&bull;</span>
              <a
                href={githubUser}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#800020] font-semibold flex items-center gap-1 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-gray-800" />
                <span>GitHub</span>
              </a>
              <span>&bull;</span>
              <a
                href={xUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#800020] font-semibold flex items-center gap-1 transition-colors"
              >
                <span>𝕏 Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Action Pathways */}
        <div className="mt-5 space-y-3">
          <a
            href={mailtoLink}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#800020] hover:bg-[#660019] text-white text-xs sm:text-sm font-semibold transition-all shadow-md group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold">Book 1-on-1 Walkthrough &amp; Demo</div>
                <div className="text-[11px] text-white/80 font-normal">Direct calendar request via email</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-300 hover:border-gray-400 bg-white text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-all cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Email Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-500" />
                  <span>Copy Founder Email ({founderEmail})</span>
                </>
              )}
            </button>
            <a
              href={githubRepo}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl border border-gray-300 hover:border-gray-400 bg-white text-gray-700 hover:text-black transition-all flex items-center justify-center shadow-2xs"
              title="Open GitHub Repository"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-5 pt-4 border-t border-gray-200/80 flex items-center justify-between text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Zero spam. Response guaranteed within 24h.
          </span>
          <span className="font-mono text-[10px] text-gray-400">Wedding-Tribe / Hinged</span>
        </div>
      </div>
    </div>
  );
}
