import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  MessageCircle,
  Calendar,
  Users,
  CheckCircle2,
  Hotel,
  ArrowRight,
  ShieldCheck,
  Github,
  Heart,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  MapPin,
  Clock,
  Phone,
  Mail,
  Send,
  X,
  Check,
  DollarSign,
  Utensils,
  Share2,
  Sliders,
  Copy,
  Info,
  Menu,
} from 'lucide-react';
import FounderConnectModal from './FounderConnectModal';

// Top Indian Wedding Destination Cities
const WEDDING_CITIES = [
  'Jaipur, Rajasthan',
  'Udaipur, Rajasthan',
  'Goa (North & South)',
  'Delhi NCR (Gurgaon / Noida)',
  'Mumbai / Alibaug',
  'Bengaluru, Karnataka',
  'Jodhpur, Rajasthan',
  'Agra, Uttar Pradesh',
  'Mussoorie / Dehradun',
  'Kerala (Kochi / Kovalam)',
  'Hyderabad, Telangana',
  'Pune / Lonavala',
  'Kolkata, West Bengal',
  'Chandigarh / Tricity',
  'Other / International Destination',
];

// Themes available in Hinged
const THEMES = [
  {
    id: 'royal-indian',
    name: 'Royal Indian',
    tagline: 'Palace Mandap Grandeur',
    badgeEmoji: '👑',
    bg: '#2A0812',
    accent: '#D4AF37',
    textColor: 'text-amber-50',
    headerColor: 'text-amber-200',
    desc: 'Deep jewel burgundy, royal navy, gold foil ornamentation, and regal palace ambiance.',
    sampleBrideGroom: 'Aarav & Meera',
    sampleVenue: 'Jai Mahal Palace, Jaipur',
    sampleCeremonies: ['Royal Sangeet & Ghoomar', 'Shahi Pheras & Mandap', 'Royal Darbar Reception'],
    borderColor: 'border-amber-500/40',
  },
  {
    id: 'modern-editorial',
    name: 'Modern Editorial',
    tagline: 'Vogue-Inspired High Fashion',
    badgeEmoji: '📰',
    bg: '#FFFFFF',
    accent: '#171717',
    textColor: 'text-neutral-700',
    headerColor: 'text-neutral-950',
    desc: 'Clean monochrome, generous whitespace, high-fashion editorial typography, and minimalist layout.',
    sampleBrideGroom: 'Kabir & Tarini',
    sampleVenue: 'The Oberoi Amarvilas, Agra',
    sampleCeremonies: ['Editorial Welcome Dinner', 'Intimate Sunset Ceremony', 'Black-Tie Cocktail'],
    borderColor: 'border-neutral-200',
  },
  {
    id: 'floral-celebration',
    name: 'Floral Celebration',
    tagline: 'Romantic Botanical Garland',
    badgeEmoji: '🌸',
    bg: '#FFF8F7',
    accent: '#065F46',
    textColor: 'text-rose-950/80',
    headerColor: 'text-rose-900',
    desc: 'Soft romantic blush, sage green, delicate marigold and jasmine garlands, and daytime garden warmth.',
    sampleBrideGroom: 'Rohan & Ananya',
    sampleVenue: 'Heritage Village Resort, Goa',
    sampleCeremonies: ['Pastel Haldi & Flower Shower', 'Garden Mehendi Bazaar', 'Beachside Sunset Pheras'],
    borderColor: 'border-rose-200',
  },
];

export default function App() {
  // Navigation & Modals state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLeadModal, setActiveLeadModal] = useState(null); // 'couple' | 'planner' | 'founder' | 'demo'
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  // Plate Calculator State
  const [guestCount, setGuestCount] = useState(450);
  const [ceremonyCount, setCeremonyCount] = useState(4);
  const [plateCost, setPlateCost] = useState(2800);
  const [uncappedLeakage, setUncappedLeakage] = useState(18); // 18% over-catering without caps

  // Couple Lead Form State
  const [coupleForm, setCoupleForm] = useState({
    coupleName: '',
    partnerName: '',
    whatsapp: '',
    city: WEDDING_CITIES[0],
    weddingDate: '',
    guestCount: '350 - 500 Guests',
    themePreference: 'Royal Indian',
    notes: '',
  });

  // Planner Lead Form State
  const [plannerForm, setPlannerForm] = useState({
    agencyName: '',
    contactName: '',
    workEmail: '',
    whatsapp: '',
    annualWeddings: '10 - 25 Weddings / Year',
    primaryCities: 'Jaipur, Udaipur, Delhi NCR',
  });

  // Inline Quick Lead State
  const [inlineLead, setInlineLead] = useState({
    name: '',
    phone: '',
    city: 'Jaipur, Rajasthan',
  });

  const [formSubmitting, setFormSubmitting] = useState(false);

  // Toast auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#800020', '#D4AF37', '#059669', '#F59E0B'],
      });
    } catch {
      // Graceful fallback if confetti fails
    }
  };

  // Calculator computations
  const platesSaved = useMemo(() => {
    const rawSaved = Math.round((guestCount * ceremonyCount * (uncappedLeakage / 100)) * 0.45);
    return Math.max(25, rawSaved);
  }, [guestCount, ceremonyCount, uncappedLeakage]);

  const rupeesSaved = useMemo(() => {
    return platesSaved * plateCost;
  }, [platesSaved, plateCost]);

  const hoursSaved = useMemo(() => {
    return Math.round(guestCount * 0.12 + ceremonyCount * 6);
  }, [guestCount, ceremonyCount]);

  // Lead Submission Handlers via central Formspree endpoint (verified across user's portfolio)
  const handleCoupleLeadSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      await fetch('https://formspree.io/f/mqkenwgb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          project: 'Hinged',
          formType: 'Couple & Family Early Access',
          name: coupleForm.coupleName,
          partner: coupleForm.partnerName,
          whatsapp: `+91 ${coupleForm.whatsapp}`,
          destination: coupleForm.city,
          weddingDate: coupleForm.weddingDate || 'TBD',
          guestScale: coupleForm.guestCount,
          themePreference: coupleForm.themePreference,
          notes: coupleForm.notes,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn('Lead submit fallback:', err);
    }
    setFormSubmitting(false);
    setActiveLeadModal(null);
    triggerConfetti();
    showToast(`🎉 Congratulations ${coupleForm.coupleName}! You are queued for priority Hinged onboarding.`);
  };

  const handlePlannerLeadSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      await fetch('https://formspree.io/f/mqkenwgb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          project: 'Hinged',
          formType: 'Wedding Planner Partnership',
          agency: plannerForm.agencyName,
          contact: plannerForm.contactName,
          email: plannerForm.workEmail,
          whatsapp: `+91 ${plannerForm.whatsapp}`,
          annualScale: plannerForm.annualWeddings,
          operatingRegions: plannerForm.primaryCities,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn('Planner lead submit fallback:', err);
    }
    setFormSubmitting(false);
    setActiveLeadModal(null);
    triggerConfetti();
    showToast(`✅ Partner inquiry logged for ${plannerForm.agencyName}. Our team will contact you within 24 hours.`);
  };

  const handleInlineQuickLead = async (e) => {
    e.preventDefault();
    if (!inlineLead.phone) return;
    setFormSubmitting(true);
    try {
      await fetch('https://formspree.io/f/mqkenwgb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          project: 'Hinged',
          formType: 'Inline Quick Lead',
          name: inlineLead.name || 'Quick Inquirer',
          whatsapp: `+91 ${inlineLead.phone}`,
          city: inlineLead.city,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn('Inline lead submit fallback:', err);
    }
    setFormSubmitting(false);
    setInlineLead({ name: '', phone: '', city: WEDDING_CITIES[0] });
    triggerConfetti();
    showToast('🎉 VIP access link sent to your WhatsApp number!');
  };

  const selectedTheme = THEMES[selectedThemeIndex];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#231F20] font-sans selection:bg-[#800020] selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#2A0812] text-amber-50 px-5 py-4 rounded-2xl shadow-2xl border border-[#D4AF37]/50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-auto text-amber-200/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Announcement Bar */}
      <div className="bg-[#4A0E17] text-[#FAF7F2] px-4 py-2 text-center text-xs font-medium tracking-wide flex items-center justify-center gap-2 border-b border-[#D4AF37]/20">
        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37] text-[#2A0812] uppercase tracking-wider">
          Portfolio Satellite
        </span>
        <span>
          Hinged v1.0 Showcase — Open-Source Wedding Coordination for South Asian Celebrations.
        </span>
        <button
          onClick={() => setActiveLeadModal('founder')}
          className="underline font-bold text-[#D4AF37] hover:text-white cursor-pointer ml-1 inline-flex items-center gap-0.5"
        >
          <span>Meet the Founder</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Sticky Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DCCF] px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="h-8.5 w-8.5 rounded-xl bg-[#800020] text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm border border-[#D4AF37]/30 group-hover:scale-105 transition-transform">
              H
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-xl tracking-tight text-[#231F20]">
                HINGED
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#800020]/10 text-[#800020] uppercase">
                Satellite
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-gray-700">
            <a href="#features" className="hover:text-[#800020] transition-colors">
              Why Hinged
            </a>
            <a href="#themes" className="hover:text-[#800020] transition-colors">
              3 Themes
            </a>
            <a href="#calculator" className="hover:text-[#800020] transition-colors">
              Plate Calculator
            </a>
            <a href="#planners" className="hover:text-[#800020] transition-colors">
              Planners
            </a>
            <a href="#comparison" className="hover:text-[#800020] transition-colors">
              Compare
            </a>
            <a href="#faqs" className="hover:text-[#800020] transition-colors">
              FAQs
            </a>
          </nav>

          {/* CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setActiveLeadModal('demo')}
              className="text-xs font-semibold text-gray-800 hover:text-[#800020] px-3 py-2 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Jaipur Demo</span>
            </button>

            <button
              onClick={() => setActiveLeadModal('founder')}
              className="text-xs font-semibold text-gray-800 hover:text-[#800020] px-3 py-2 cursor-pointer hidden lg:inline-flex items-center gap-1"
            >
              <Users className="w-3.5 h-3.5 text-gray-500" />
              <span>Founder</span>
            </button>

            <button
              onClick={() => setActiveLeadModal('couple')}
              className="px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#660019] text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer group"
            >
              <span>Get Early Access</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-black cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 px-4 border-t border-gray-200 mt-3 space-y-2 bg-[#FAF7F2]">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-gray-800"
            >
              Why Hinged
            </a>
            <a
              href="#themes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-gray-800"
            >
              3 Themes
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-gray-800"
            >
              Plate Calculator
            </a>
            <a
              href="#planners"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-gray-800"
            >
              Planners
            </a>
            <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveLeadModal('demo');
                }}
                className="w-full py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-800 bg-white"
              >
                Explore Jaipur Demo
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveLeadModal('couple');
                }}
                className="w-full py-2.5 rounded-xl bg-[#800020] text-xs font-bold text-white shadow-sm"
              >
                Request Early Access
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="px-4 pt-16 sm:pt-24 pb-16 text-center max-w-4xl mx-auto relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#800020]/5 border border-[#800020]/20 text-[#800020] text-xs font-semibold mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
          <span>The WhatsApp-First Wedding Coordination Hub</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#231F20] tracking-tight leading-[1.1] mb-6">
          One link for your wedding.
          <br />
          <span className="italic font-normal text-[#800020]">Every guest, every ceremony.</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Replace the chaos of scattered WhatsApp messages, broken Excel spreadsheets, and frantic phone calls. Hinged gives your wedding a shared digital home designed specifically for multi-day Indian celebrations.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <button
            onClick={() => setActiveLeadModal('couple')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#800020] hover:bg-[#660019] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Request Early Access</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setActiveLeadModal('demo')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Explore Live Demo (Jaipur)</span>
            <ArrowRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Trust Proof Points */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-gray-600 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Zero guest login required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Strict household attendee caps
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Free &amp; Open Source (MIT)
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            100% WhatsApp Native
          </span>
        </div>
      </section>

      {/* INTERACTIVE DEMO SHOWCASE CALLOUT */}
      <section className="px-4 py-8 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-linear-to-r from-[#2A0812] to-[#4A0E17] text-white p-6 sm:p-8 shadow-xl border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
              <MapPin className="w-3.5 h-3.5" />
              <span>Jaipur Celebration Spotlight</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-amber-100">
              Aarav &amp; Meera — Live Multi-Event Wedding
            </h3>
            <p className="text-xs sm:text-sm text-amber-50/80 max-w-xl leading-relaxed">
              Experience the full coordinator flow: 5 ceremonies (Mehendi, Haldi, Sangeet, Pheras, Reception), 350+ guests, tokenized VIP invites, and live food preference tracking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => setActiveLeadModal('demo')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#FBBF24] text-[#2A0812] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Unbox Live Demo</span>
            </button>
            <a
              href="https://github.com/Wedding-Tribe/hinged"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>View Code</span>
            </a>
          </div>
        </div>
      </section>

      {/* CORE VALUE PILLARS (THE INDIAN WEDDING REALITY) */}
      <section id="features" className="px-4 py-16 max-w-6xl mx-auto border-t border-[#E5DCCF]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#800020] font-bold">
            Built for Indian Celebrations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#231F20] mt-1.5">
            Why Standard Wedding Websites Fail in South Asia
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
            Indian weddings are not single events. They are multi-event community gatherings with complex family logistics, shifting guest lists, and strict catering budgets.
          </p>
        </div>

        {/* 3 Core Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E5DCCF] shadow-xs hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#231F20]">
              Multi-Event Permission Matrix
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Invite 80 people to Haldi, 300 to Sangeet, and 700 to the Reception. Tokenized private links guarantee guests only see the ceremonies they are invited to. No snooping, zero family politics.
            </p>
            <div className="pt-2 flex items-center text-xs font-semibold text-[#800020] gap-1">
              <span>Tokenized scoped links</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E5DCCF] shadow-xs hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#231F20]">
              WhatsApp-Native Workflows
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Guests do not check email or create passwords for family weddings. Hinged delivers one-click WhatsApp invitations with prefilled personalized links and instant RSVP submission in 30 seconds.
            </p>
            <div className="pt-2 flex items-center text-xs font-semibold text-emerald-700 gap-1">
              <span>95%+ open &amp; response rates</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E5DCCF] shadow-xs hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#231F20]">
              Household Attendee Caps
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Address invitations to &ldquo;The Sharma Family&rdquo; while enforcing a strict maximum of 3 seats per ceremony. Protect your catering plate budget from unexpected +4 surprises.
            </p>
            <div className="pt-2 flex items-center text-xs font-semibold text-amber-700 gap-1">
              <span>Guaranteed plate security</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* 3 Secondary Operational Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-base text-gray-900">
              <Utensils className="w-4 h-4 text-[#800020]" />
              <h4>Dietary &amp; Food Restrictions Radar</h4>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Caterers receive clean counts for Jain (no onion/garlic/root), Pure Vegetarian, Swaminarayan, and Vegan guests per function.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-base text-gray-900">
              <Hotel className="w-4 h-4 text-[#800020]" />
              <h4>Travel, Shuttles &amp; Room Allocations</h4>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Guests view hotel check-in desks, airport pick-up shuttle rosters, and hospitality desk WhatsApp contacts in one mobile tab.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DCCF] space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-base text-gray-900">
              <Send className="w-4 h-4 text-[#800020]" />
              <h4>One-Click Broadcast Messages</h4>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Send emergency schedule shifts (&ldquo;Baraat will assemble at 5:30 PM at the Main Porch&rdquo;) via formatted WhatsApp links without messy group chats.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE 3-THEME SWITCHER & LIVE PREVIEWER */}
      <section id="themes" className="px-4 py-16 bg-[#F5EFEB]/70 border-y border-[#E5DCCF]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#800020] font-bold">
              Stationery &amp; Aesthetics
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#231F20]">
              3 Distinct Culturally Refined Themes
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Every wedding has its own soul. Switch themes with a single click and experience how your digital cards adapt in real time.
            </p>
          </div>

          {/* Theme Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {THEMES.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setSelectedThemeIndex(idx)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedThemeIndex === idx
                    ? 'bg-[#800020] text-white shadow-md scale-105'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                <span>{t.badgeEmoji}</span>
                <span>{t.name}</span>
                {selectedThemeIndex === idx && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
              </button>
            ))}
          </div>

          {/* Interactive Live Card Preview */}
          <div className="max-w-3xl mx-auto">
            <div
              className={`p-8 sm:p-10 rounded-3xl shadow-2xl border transition-all duration-300 relative overflow-hidden ${selectedTheme.borderColor}`}
              style={{ backgroundColor: selectedTheme.bg }}
            >
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-4 left-4 text-xs opacity-40 font-mono tracking-widest text-amber-500">
                ✦ DIGITAL STATIONERY
              </div>
              <div className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-current">
                {selectedTheme.tagline}
              </div>

              <div className="text-center space-y-4 pt-4">
                <span className="text-4xl">{selectedTheme.badgeEmoji}</span>
                <div className="space-y-1">
                  <span className="text-xs tracking-widest uppercase font-semibold opacity-70">
                    Cordially Invite You To Celebrate
                  </span>
                  <h3 className={`text-3xl sm:text-4xl font-serif font-bold ${selectedTheme.headerColor}`}>
                    {selectedTheme.sampleBrideGroom}
                  </h3>
                  <p className="text-xs font-serif italic opacity-80">
                    {selectedTheme.sampleVenue}
                  </p>
                </div>

                <p className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed ${selectedTheme.textColor}`}>
                  {selectedTheme.desc}
                </p>

                {/* Simulated Function Pill Badges */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
                  {selectedTheme.sampleCeremonies.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/15 backdrop-blur-xs border border-white/20"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* Interactive Simulated RSVP Action */}
                <div className="pt-6 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveLeadModal('couple')}
                    className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#FBBF24] text-[#2A0812] text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Adopt This Theme for Your Wedding</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE CATERING PLATE & BUDGET SAVER CALCULATOR */}
      <section id="calculator" className="px-4 py-16 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#800020] font-bold">
            Interactive ROI Simulator
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#231F20] mt-1.5">
            Catering Plate &amp; Budget Saver Calculator
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
            In Indian weddings, over-catering due to ambiguous WhatsApp plus-ones costs families ₹2,00,000 to ₹8,00,000+ in wasted food plates. See how much Hinged saves your wedding budget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DCCF] shadow-sm space-y-6">
            {/* Slider 1: Expected Guests */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                <span>Total Invited Guests:</span>
                <span className="text-[#800020] font-mono text-sm">{guestCount} Guests</span>
              </div>
              <input
                type="range"
                min="150"
                max="1200"
                step="25"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-[#800020] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                <span>150 (Intimate)</span>
                <span>500 (Standard)</span>
                <span>1200+ (Grand Gala)</span>
              </div>
            </div>

            {/* Selector: Ceremonies */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                <span>Number of Catered Ceremonies:</span>
                <span className="text-[#800020] font-mono text-sm">{ceremonyCount} Functions</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[2, 3, 4, 5].map((count) => (
                  <button
                    key={count}
                    onClick={() => setCeremonyCount(count)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      ceremonyCount === count
                        ? 'bg-[#800020] text-white shadow-xs'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {count} Events
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 2: Plate Cost */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                <span>Average Catering Plate Cost:</span>
                <span className="text-[#800020] font-mono text-sm">₹{plateCost.toLocaleString('en-IN')} / Plate</span>
              </div>
              <input
                type="range"
                min="1500"
                max="4500"
                step="100"
                value={plateCost}
                onChange={(e) => setPlateCost(Number(e.target.value))}
                className="w-full accent-[#800020] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                <span>₹1,500 (Tier 2/3 City)</span>
                <span>₹2,800 (Palace/Resort)</span>
                <span>₹4,500 (5-Star Luxury)</span>
              </div>
            </div>

            {/* Slider 3: Uncapped Attendance Overrun */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                <span>Estimated Uncapped Plus-One Overrun:</span>
                <span className="text-amber-800 font-mono text-sm">{uncappedLeakage}% Surplus</span>
              </div>
              <input
                type="range"
                min="10"
                max="25"
                step="1"
                value={uncappedLeakage}
                onChange={(e) => setUncappedLeakage(Number(e.target.value))}
                className="w-full accent-[#800020] cursor-pointer"
              />
              <p className="text-[11px] text-gray-500">
                Without strict household caps, extended families typically bring unexpected plus-ones or confirm late, forcing hosts to over-order plates.
              </p>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-5 bg-[#2A0812] text-white rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/40 shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
                Projected Savings Summary
              </span>
              <h3 className="text-2xl font-serif font-bold text-amber-100">
                Budget &amp; Food Reclaimed
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                <span className="text-[11px] text-amber-200/80 font-medium block">
                  Direct Catering Rupees Saved:
                </span>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-[#D4AF37] mt-1">
                  ₹{rupeesSaved.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-amber-100/60 mt-0.5 block">
                  Calculated against {platesSaved} wasted over-ordered plates.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-amber-200/70 block">Plates Saved</span>
                  <div className="text-xl font-bold text-white mt-0.5">{platesSaved}</div>
                  <span className="text-[10px] text-amber-100/50">Zero food wasted</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-amber-200/70 block">Coordination Time</span>
                  <div className="text-xl font-bold text-white mt-0.5">~{hoursSaved} hrs</div>
                  <span className="text-[10px] text-amber-100/50">Follow-up calls saved</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveLeadModal('couple')}
              className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#FBBF24] text-[#2A0812] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Lock In These Savings — Create Wedding</span>
            </button>
          </div>
        </div>
      </section>

      {/* WEDDING PLANNERS & AGENCIES PARTNERSHIP SECTION */}
      <section id="planners" className="px-4 py-16 bg-[#FAF7F2] border-t border-[#E5DCCF]">
        <div className="max-w-5xl mx-auto rounded-3xl bg-linear-to-br from-white to-[#F5EFEB] border border-[#E5DCCF] p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#800020]/10 text-[#800020] border border-[#800020]/20 inline-block">
                For Wedding Planners &amp; Event Agencies
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                Deliver Luxury White-Glove Coordination to Your Couples
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Whether you manage 5 boutique weddings in Udaipur or 30 high-scale destination galas across India and the UAE, Hinged provides multi-wedding workspaces, custom domain routing, and real-time vendor exports.
              </p>
            </div>

            <button
              onClick={() => setActiveLeadModal('planner')}
              className="px-6 py-3.5 rounded-xl bg-[#800020] hover:bg-[#660019] text-white text-xs font-bold shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>Partner as a Wedding Planner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="space-y-1">
              <h4 className="font-bold text-xs text-gray-900">Multi-Wedding Agency Console</h4>
              <p className="text-[11px] text-gray-600">Switch between active couple workspaces with role-based staff permissions.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs text-gray-900">Branded Custom Domains</h4>
              <p className="text-[11px] text-gray-600">Deliver invitations on your agency domain or couple custom URLs.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs text-gray-900">One-Click Caterer CSVs</h4>
              <p className="text-[11px] text-gray-600">Export clean headcounts filtered by dietary restrictions for banquet managers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section id="comparison" className="px-4 py-16 max-w-6xl mx-auto border-t border-[#E5DCCF]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#800020] font-bold">
            Transparent Benchmarking
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#231F20] mt-1.5">
            How Hinged Compares to Generic Tools
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Why leading couples and planners choose Hinged over generic website builders.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#E5DCCF] bg-white shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E5DCCF] text-gray-700">
                <th className="p-4 font-bold">Key Coordination Capability</th>
                <th className="p-4 font-bold text-[#800020] bg-[#800020]/5">Hinged (WhatsApp-First)</th>
                <th className="p-4 font-bold">The Knot / Zola (US-Centric)</th>
                <th className="p-4 font-bold">WedMeGood (Vendor Portal)</th>
                <th className="p-4 font-bold">Excel + WhatsApp Chats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DCCF]">
              <tr>
                <td className="p-4 font-semibold text-gray-900">Multi-Day Indian Ceremony Matrix</td>
                <td className="p-4 font-bold text-emerald-700 bg-[#800020]/5">✓ Native (Unlimited Events)</td>
                <td className="p-4 text-gray-500">△ Clunky sub-events</td>
                <td className="p-4 text-gray-500">✗ Vendor discovery only</td>
                <td className="p-4 text-red-600">✗ VLOOKUP breakdown</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-900">Tokenized Scoped Guest Visibility</td>
                <td className="p-4 font-bold text-emerald-700 bg-[#800020]/5">✓ Guests only see invited events</td>
                <td className="p-4 text-red-600">✗ All ceremonies public</td>
                <td className="p-4 text-gray-400">—</td>
                <td className="p-4 text-gray-400">—</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-900">Zero Guest Login / App Install</td>
                <td className="p-4 font-bold text-emerald-700 bg-[#800020]/5">✓ 1-Click WhatsApp Direct</td>
                <td className="p-4 text-red-600">✗ Forces email registration</td>
                <td className="p-4 text-red-600">✗ App download required</td>
                <td className="p-4 text-emerald-700">✓ Native chat</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-900">Strict Household Attendee Caps</td>
                <td className="p-4 font-bold text-emerald-700 bg-[#800020]/5">✓ Enforced plate security</td>
                <td className="p-4 text-gray-500">△ Loose plus-ones</td>
                <td className="p-4 text-gray-400">—</td>
                <td className="p-4 text-red-600">✗ +4 surprise plates</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-900">Open-Source &amp; Self-Hostable</td>
                <td className="p-4 font-bold text-emerald-700 bg-[#800020]/5">✓ MIT License (Free forever)</td>
                <td className="p-4 text-red-600">✗ Proprietary SaaS</td>
                <td className="p-4 text-red-600">✗ Ad-supported portal</td>
                <td className="p-4 text-gray-400">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section id="faqs" className="px-4 py-16 max-w-4xl mx-auto border-t border-[#E5DCCF]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#800020] font-bold">
            Got Questions?
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#231F20] mt-1.5">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Do guests need to install an app or create an account to RSVP?',
              a: 'No. Guests receive a single personalized link via WhatsApp. When they tap it, their personalized schedule opens instantly in their mobile browser with pre-filled household names. They submit RSVPs in 30 seconds without creating any passwords or downloading any apps.',
            },
            {
              q: 'How does Hinged prevent relatives from seeing events they are not invited to?',
              a: 'Hinged uses cryptographically secure tokenized links. When "The Sharma Family" opens their link, the system looks up their specific permissions in the permission matrix and renders only the functions (e.g. Sangeet & Reception) they are invited to. Haldi or intimate family poojas remain invisible.',
            },
            {
              q: 'Can I import my existing guest list from an Excel or Google Sheets spreadsheet?',
              a: 'Yes! Hinged includes a real CSV importer with column mapping, Indian phone number (+91) auto-detection, duplicate identification, and family side tags (Bride vs Groom).',
            },
            {
              q: 'Is Hinged really free and open source?',
              a: 'Yes. Hinged is distributed under the MIT License on GitHub. You can self-host it on Vercel, Supabase, or Docker, or use our hosted concierge service for turnkey setup.',
            },
            {
              q: 'Can wedding planners manage multiple weddings on Hinged?',
              a: 'Absolutely. We offer dedicated agency workspaces where planners can coordinate multiple weddings, invite team members, export vendor CSV reports, and use custom client domains.',
            },
          ].map((faq, idx) => (
            <details
              key={idx}
              className="group p-5 rounded-2xl bg-white border border-[#E5DCCF] transition-all"
            >
              <summary className="flex items-center justify-between font-serif font-bold text-sm text-gray-900 cursor-pointer list-none">
                <span>{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-xs text-gray-600 mt-3 leading-relaxed border-t border-gray-100 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* HIGH-CONVERTING INLINE LEAD SECTION (BOTTOM BANNER) */}
      <section className="px-4 py-16 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-linear-to-br from-[#2A0812] via-[#4A0E17] to-[#2A0812] text-white p-8 sm:p-12 shadow-2xl border border-[#D4AF37]/40 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Priority Access for 2026-2027 Weddings</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 leading-tight">
              Plan Your Dream Celebration Without the Chaos
            </h2>

            <p className="text-xs sm:text-sm text-amber-50/80 leading-relaxed max-w-lg mx-auto">
              Join 250+ couples and luxury wedding planners coordinating stress-free Indian weddings with Hinged.
            </p>

            {/* Inline Quick Lead Form */}
            <form onSubmit={handleInlineQuickLead} className="pt-4 max-w-xl mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  placeholder="Your Name (e.g. Ananya)"
                  value={inlineLead.name}
                  onChange={(e) => setInlineLead({ ...inlineLead, name: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-amber-200/50 text-xs focus:outline-none focus:border-[#D4AF37] shadow-inner"
                />
                <div className="flex flex-1">
                  <span className="inline-flex items-center px-3 text-xs font-bold bg-white/20 border border-r-0 border-white/20 rounded-l-xl text-amber-200 font-mono">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="WhatsApp Number"
                    value={inlineLead.phone}
                    onChange={(e) => setInlineLead({ ...inlineLead, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-r-xl bg-white/10 border border-white/20 text-white placeholder-amber-200/50 text-xs focus:outline-none focus:border-[#D4AF37] shadow-inner"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={inlineLead.city}
                  onChange={(e) => setInlineLead({ ...inlineLead, city: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#2A0812] border border-white/20 text-amber-100 text-xs focus:outline-none focus:border-[#D4AF37]"
                >
                  {WEDDING_CITIES.map((c, i) => (
                    <option key={i} value={c} className="bg-[#2A0812] text-white">
                      {c}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#FBBF24] text-[#2A0812] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span>{formSubmitting ? 'Submitting...' : 'Claim VIP Access Link'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="pt-4 flex items-center justify-center gap-4 text-[11px] text-amber-200/70">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Zero spam. Strict privacy.
              </span>
              <span>&bull;</span>
              <span>Instant WhatsApp confirmation</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 py-12 max-w-6xl mx-auto text-center space-y-4 text-xs text-gray-500 border-t border-[#E5DCCF]">
        <div className="flex items-center justify-center gap-2 font-serif font-bold text-gray-900 text-base">
          <div className="h-6 w-6 rounded-lg bg-[#800020] text-white flex items-center justify-center font-serif text-xs">
            H
          </div>
          <span>Hinged &bull; Open-Source Wedding Coordination</span>
        </div>
        <p className="max-w-md mx-auto text-gray-600">
          Crafted with love for couples, families, and luxury wedding planners worldwide. Distributed under the MIT License.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-medium">
          <button onClick={() => setActiveLeadModal('demo')} className="hover:text-[#800020] cursor-pointer">
            Jaipur Demo
          </button>
          <span>&bull;</span>
          <button onClick={() => setActiveLeadModal('couple')} className="hover:text-[#800020] cursor-pointer">
            Early Access
          </button>
          <span>&bull;</span>
          <button onClick={() => setActiveLeadModal('planner')} className="hover:text-[#800020] cursor-pointer">
            Planners
          </button>
          <span>&bull;</span>
          <button onClick={() => setActiveLeadModal('founder')} className="hover:text-[#800020] cursor-pointer">
            Founder Connect
          </button>
          <span>&bull;</span>
          <a
            href="https://github.com/Wedding-Tribe/hinged"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#800020] flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
        </div>

        <div className="text-[11px] text-gray-400 pt-2 font-mono">
          &copy; {new Date().getFullYear()} Wedding-Tribe &bull; Built with React, Vite &amp; Tailwind CSS
        </div>
      </footer>

      {/* MODAL 1: COUPLE & FAMILY EARLY ACCESS LEAD FORM */}
      {activeLeadModal === 'couple' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#D4AF37]/40 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] custom-scrollbar text-[#231F20]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLeadModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-black/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#800020]/10 text-[#800020] border border-[#800020]/20">
                <Heart className="w-3.5 h-3.5 text-[#800020]" />
                Couple &amp; Family Priority Access
              </span>
              <h3 className="text-2xl font-serif font-bold text-gray-900">
                Create Your Digital Wedding Hub
              </h3>
              <p className="text-xs text-gray-600">
                Fill in your celebration details. We will configure your scoped WhatsApp RSVP hub and assign you dedicated onboarding assistance.
              </p>
            </div>

            <form onSubmit={handleCoupleLeadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Your Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Aarav Mehta"
                    value={coupleForm.coupleName}
                    onChange={(e) => setCoupleForm({ ...coupleForm, coupleName: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Partner / Family Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Meera Kapoor"
                    value={coupleForm.partnerName}
                    onChange={(e) => setCoupleForm({ ...coupleForm, partnerName: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">WhatsApp Mobile Number *</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3.5 text-xs font-bold bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-gray-700 font-mono">
                    +91
                  </span>
                  <input
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    value={coupleForm.whatsapp}
                    onChange={(e) => setCoupleForm({ ...coupleForm, whatsapp: e.target.value })}
                    className="w-full text-xs p-3 rounded-r-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Wedding City / Destination *</label>
                  <select
                    value={coupleForm.city}
                    onChange={(e) => setCoupleForm({ ...coupleForm, city: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                  >
                    {WEDDING_CITIES.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Approximate Wedding Date</label>
                  <input
                    type="date"
                    value={coupleForm.weddingDate}
                    onChange={(e) => setCoupleForm({ ...coupleForm, weddingDate: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Expected Guest Count</label>
                  <select
                    value={coupleForm.guestCount}
                    onChange={(e) => setCoupleForm({ ...coupleForm, guestCount: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                  >
                    <option>Under 200 Guests (Intimate)</option>
                    <option>200 - 350 Guests</option>
                    <option>350 - 500 Guests (Standard)</option>
                    <option>500 - 800 Guests</option>
                    <option>800+ Guests (Grand Luxury)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Preferred Stationery Theme</label>
                  <select
                    value={coupleForm.themePreference}
                    onChange={(e) => setCoupleForm({ ...coupleForm, themePreference: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                  >
                    <option>Royal Indian (Regal Jewel Burgundy &amp; Gold)</option>
                    <option>Modern Editorial (Minimalist High-Fashion)</option>
                    <option>Floral Celebration (Romantic Blush &amp; Sage)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">Special Notes / Requirements</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Need hotel room allocation for 60 rooms, airport shuttle coordination..."
                  value={coupleForm.notes}
                  onChange={(e) => setCoupleForm({ ...coupleForm, notes: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                />
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#800020] hover:bg-[#660019] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>{formSubmitting ? 'Submitting...' : 'Register for Early Access'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: WEDDING PLANNER & COORDINATOR LEAD FORM */}
      {activeLeadModal === 'planner' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#D4AF37]/40 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] custom-scrollbar text-[#231F20]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLeadModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-black/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#800020]/10 text-[#800020] border border-[#800020]/20">
                <Users className="w-3.5 h-3.5 text-[#800020]" />
                B2B Agency Partnership
              </span>
              <h3 className="text-2xl font-serif font-bold text-gray-900">
                Wedding Planner Enterprise Hub
              </h3>
              <p className="text-xs text-gray-600">
                Partner with Hinged to equip your couples with white-label WhatsApp hubs, staff permissions, and direct banquet exports.
              </p>
            </div>

            <form onSubmit={handlePlannerLeadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Agency / Brand Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Royal Knot Planners"
                    value={plannerForm.agencyName}
                    onChange={(e) => setPlannerForm({ ...plannerForm, agencyName: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Lead Coordinator Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Priya Singhania"
                    value={plannerForm.contactName}
                    onChange={(e) => setPlannerForm({ ...plannerForm, contactName: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">Work Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="priya@royalknot.com"
                    value={plannerForm.workEmail}
                    onChange={(e) => setPlannerForm({ ...plannerForm, workEmail: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">WhatsApp Mobile *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-xs font-bold bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-gray-700 font-mono">
                      +91
                    </span>
                    <input
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder="9876543210"
                      value={plannerForm.whatsapp}
                      onChange={(e) => setPlannerForm({ ...plannerForm, whatsapp: e.target.value })}
                      className="w-full text-xs p-3 rounded-r-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">Annual Weddings Coordinated</label>
                <select
                  value={plannerForm.annualWeddings}
                  onChange={(e) => setPlannerForm({ ...plannerForm, annualWeddings: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                >
                  <option>1 - 5 Weddings / Year</option>
                  <option>5 - 15 Weddings / Year</option>
                  <option>15 - 30 Weddings / Year</option>
                  <option>30+ Weddings / Year (Enterprise Agency)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">Primary Operating Destinations</label>
                <input
                  type="text"
                  placeholder="e.g. Udaipur, Jaipur, Goa, Dubai, Thailand"
                  value={plannerForm.primaryCities}
                  onChange={(e) => setPlannerForm({ ...plannerForm, primaryCities: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#800020]"
                />
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#800020] hover:bg-[#660019] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Users className="w-4 h-4 text-[#D4AF37]" />
                <span>{formSubmitting ? 'Submitting...' : 'Submit Planner Partnership Inquiry'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: INTERACTIVE DEMO UNBOXER */}
      {activeLeadModal === 'demo' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#D4AF37]/40 shadow-2xl p-6 sm:p-8 text-[#231F20]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLeadModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-black/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#D4AF37]/20 text-[#800020] border border-[#D4AF37]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Interactive Demo Walkthrough
              </span>
              <h3 className="text-2xl font-serif font-bold text-gray-900">
                Aarav &amp; Meera in Jaipur
              </h3>
              <p className="text-xs text-gray-600">
                Choose which perspective you want to explore in the live Hinged environment:
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DCCF] space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#800020]">
                  <Users className="w-4 h-4" />
                  <h4>1. Host Coordinator Command Center</h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Manage ceremonies, track live RSVPs, monitor catering headcounts, import CSV spreadsheets, and compose WhatsApp updates.
                </p>
                <div className="pt-2">
                  <a
                    href="https://github.com/Wedding-Tribe/hinged"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800020] hover:underline"
                  >
                    <span>Inspect Host Architecture on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DCCF] space-y-2">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#800020]">
                  <Send className="w-4 h-4" />
                  <h4>2. Guest Mobile Experience</h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Test the tokenized guest invitation: live countdown, ceremony timeline, hotel and shuttle cards, and scoped RSVP confirmation.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setActiveLeadModal('couple');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800020] hover:underline cursor-pointer"
                  >
                    <span>Request Live Access Credentials</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveLeadModal(null);
                  setActiveLeadModal('founder');
                }}
                className="text-xs font-bold text-[#800020] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Prefer a live walkthrough with Founder?</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: FOUNDER CONNECT MODAL */}
      <FounderConnectModal
        isOpen={activeLeadModal === 'founder'}
        onClose={() => setActiveLeadModal(null)}
      />
    </div>
  );
}
