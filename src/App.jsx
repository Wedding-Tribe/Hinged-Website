import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Users,
  MessageCircle,
  Share2,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight,
  ChevronDown,
  X,
  Phone,
  Gift,
  ExternalLink,
  Crown,
  BookOpen,
  Flower2
} from 'lucide-react';

const THEMES = {
  royal: {
    id: 'royal',
    name: 'Royal Indian',
    icon: Crown,
    badge: 'Regal Jewel',
    bg: 'bg-[#581c24]',
    border: 'border-[#d4af37]',
    accentText: 'text-[#d4af37]',
    accentBg: 'bg-[#d4af37]',
    cardBg: 'bg-[#43141b]',
    tagline: 'Palace Mandap Grandeur with Rich Burgundy & Gold Filigree',
  },
  editorial: {
    id: 'editorial',
    name: 'Modern Editorial',
    icon: BookOpen,
    badge: 'Vogue Minimalist',
    bg: 'bg-stone-900',
    border: 'border-stone-400',
    accentText: 'text-stone-200',
    accentBg: 'bg-stone-200',
    cardBg: 'bg-stone-800',
    tagline: 'High-Fashion Monochromatic Ivory with Clean Editorial Layout',
  },
  floral: {
    id: 'floral',
    name: 'Floral Celebration',
    icon: Flower2,
    badge: 'Soft Romantic',
    bg: 'bg-[#831843]',
    border: 'border-pink-300',
    accentText: 'text-pink-200',
    accentBg: 'bg-pink-300',
    cardBg: 'bg-[#701a3c]',
    tagline: 'Romantic Rose Blush, Sage Botanicals & Intimate Garden Vibe',
  }
};

const SAMPLE_EVENTS = [
  { id: 'mehendi', name: 'Mehendi & Chooda', time: '11:00 AM', venue: 'The Courtyard Lawn', date: 'Dec 18, 2026', dress: 'Sunny Yellow & Mint', invited: true },
  { id: 'sangeet', name: 'Sangeet & Cocktails', time: '7:30 PM', venue: 'Grand Ballroom', date: 'Dec 18, 2026', dress: 'Glitz & Indo-Western', invited: true },
  { id: 'haldi', name: 'Haldi & Phoolon Ki Holi', time: '10:00 AM', venue: 'Poolside Pavilion', date: 'Dec 19, 2026', dress: 'Comfortable Yellow', invited: false },
  { id: 'wedding', name: 'Pheras & Wedding Dinner', time: '6:00 PM', venue: 'Palace Mandap', date: 'Dec 19, 2026', dress: 'Traditional Royal Attire', invited: true },
  { id: 'reception', name: 'Grand Gala Reception', time: '8:00 PM', venue: 'Imperial Gardens', date: 'Dec 20, 2026', dress: 'Black Tie / Formal Sherwani', invited: true },
];

export default function App() {
  const [selectedTheme, setSelectedTheme] = useState('royal');
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Interactive RSVP Simulator state
  const [guestCount, setGuestCount] = useState(2);
  const [rsvpState, setRsvpState] = useState({
    mehendi: true,
    sangeet: true,
    wedding: true,
    reception: true,
  });
  const [dietary, setDietary] = useState('veg');

  // Budget Calculator state
  const [totalGuests, setTotalGuests] = useState(450);
  const [plateCost, setPlateCost] = useState(2800);

  const themeConfig = THEMES[selectedTheme];

  // Budget savings calculation
  const savings = useMemo(() => {
    // Un-scoped open invites typically result in 15% to 22% untracked guest overruns or unwanted attendees crashing intimate functions
    const uninvitedPlatesPrevented = Math.round(totalGuests * 0.18);
    const moneySaved = uninvitedPlatesPrevented * plateCost;
    return {
      uninvitedPlatesPrevented,
      moneySaved
    };
  }, [totalGuests, plateCost]);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setToastMsg('RSVP Confirmed for The Sharma Family! Host dashboard updated in real-time.');
    setTimeout(() => setToastMsg(''), 5000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-stone-700 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-[#43141b] text-amber-200 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-[#d4af37]/30">
        <span className="bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 px-2 py-0.5 rounded text-[11px] font-bold">
          WEDDING TECH OS
        </span>
        <span>
          Built for multi-event Indian and multicultural weddings. No lost RSVPs on WhatsApp.
        </span>
        <button
          onClick={() => setShowModal(true)}
          className="underline ml-1 font-bold text-white hover:text-amber-200 transition-colors"
        >
          Request Host Demo →
        </button>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#722f37] to-[#43141b] flex items-center justify-center text-white text-xl shadow-md">
              💍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-2xl tracking-tight text-stone-950">Hinged</span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-[#722f37] border border-rose-200">
                  Open Source
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium -mt-0.5 hidden sm:block">One link for your wedding.</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-600">
            <a href="#themes" className="hover:text-stone-950 transition-colors">3 Luxury Themes</a>
            <a href="#rsvp-sim" className="hover:text-stone-950 transition-colors">Scoped RSVP Demo</a>
            <a href="#savings" className="hover:text-stone-950 transition-colors">Catering Calculator</a>
            <a href="#features" className="hover:text-stone-950 transition-colors">Coordinator Console</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#722f37] hover:bg-[#581c24] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-[#722f37]/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get Early Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-rose-50/50 via-stone-50 to-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-[#722f37] text-xs font-bold mb-6">
                <Sparkles className="w-4 h-4 text-[#722f37]" />
                <span>Mobile-First WhatsApp Wedding Coordination</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-stone-950 tracking-tight leading-[1.15] mb-6">
                One link for your wedding. <br />
                <span className="text-[#722f37] italic">
                  Every guest, function &amp; detail.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-8 max-w-2xl">
                Indian and multicultural weddings aren't single events—they're 3-to-5-day celebrations across 4 to 7 ceremonies.
                Hinged gives every family member a <strong>scoped digital invitation link</strong> resolving strictly to the events they are invited to.
                Zero app installs, zero passwords, and zero spreadsheet chaos.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#rsvp-sim"
                  className="bg-stone-950 hover:bg-stone-800 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-stone-950/15 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Test Live RSVP Demo</span>
                  <ChevronDown className="w-4 h-4" />
                </a>

                <a
                  href="#themes"
                  className="bg-white hover:bg-stone-100 text-stone-900 font-bold text-sm px-6 py-3.5 rounded-xl border border-stone-300 shadow-sm active:scale-95 transition-all flex items-center gap-2"
                >
                  <Crown className="w-4 h-4 text-[#722f37]" />
                  <span>Preview 3 Cultural Themes</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-300">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#722f37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-950 uppercase">Scoped Invites</h4>
                    <p className="text-[11px] text-stone-500">No relatives snooping</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MessageCircle className="w-5 h-5 text-[#722f37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-950 uppercase">WhatsApp Native</h4>
                    <p className="text-[11px] text-stone-500">1-click direct link sharing</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Users className="w-5 h-5 text-[#722f37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-950 uppercase">Headcount Caps</h4>
                    <p className="text-[11px] text-stone-500">Strict attendee limits</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FileSpreadsheet className="w-5 h-5 text-[#722f37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-950 uppercase">CSV Pipeline</h4>
                    <p className="text-[11px] text-stone-500">Smart phone &amp; error detector</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Mobile Phone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[340px] bg-stone-950 rounded-[40px] p-3 shadow-2xl border-4 border-stone-800 relative">
                {/* Speaker Notch */}
                <div className="w-32 h-4 bg-stone-900 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <div className="w-12 h-1.5 bg-stone-700 rounded-full"></div>
                </div>

                {/* Inner Screen */}
                <div className={`rounded-[30px] p-5 text-white ${themeConfig.bg} border-2 ${themeConfig.border} transition-colors duration-500`}>
                  <div className="text-center pb-4 border-b border-white/20">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-amber-200">The Wedding Celebration</span>
                    <h2 className="font-serif text-2xl font-bold mt-1 text-white">Aarav &amp; Meera</h2>
                    <p className="text-xs text-white/80 mt-0.5">December 18–20, 2026 · Jaipur, Rajasthan</p>
                    <div className="mt-3 inline-block bg-black/30 px-3 py-1 rounded-full text-[11px] font-mono border border-white/20">
                      ⏳ 48 Days to Pheras
                    </div>
                  </div>

                  {/* Scoped Badge */}
                  <div className="my-3 bg-black/40 rounded-xl p-2.5 text-xs border border-white/20">
                    <div className="text-[11px] text-amber-200 font-semibold flex items-center justify-between">
                      <span>Personal Invite for:</span>
                      <span className="font-mono bg-white/20 px-1.5 py-0.2 rounded text-[10px]">Max 2 Guests</span>
                    </div>
                    <div className="font-bold text-white text-sm mt-0.5">The Sharma Family</div>
                  </div>

                  {/* Function List */}
                  <div className="space-y-2 mt-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-white/70 block">
                      Your Ceremonies (4 Scoped)
                    </span>
                    {SAMPLE_EVENTS.filter(e => e.invited).slice(0, 3).map(ev => (
                      <div key={ev.id} className="bg-black/30 rounded-xl p-2 text-xs border border-white/10 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white text-xs">{ev.name}</div>
                          <div className="text-[10px] text-white/70 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-amber-200" />
                            <span>{ev.time} · {ev.date.split(',')[0]}</span>
                          </div>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/20 text-center">
                    <div className="text-[10px] text-white/70">Invited via WhatsApp · Scoped Token Protected</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Theme Switcher Section */}
      <section id="themes" className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#722f37] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Visual Design Engineering
            </span>
            <h2 className="text-3xl font-serif font-extrabold text-stone-950 mt-3">
              3 Culturally Refined Luxury Themes
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Every celebration has its own soul. Switch themes with one click in the host dashboard without changing any guest data.
            </p>

            {/* Theme Selector Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {Object.values(THEMES).map(t => {
                const IconComponent = t.icon;
                const isSelected = selectedTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTheme(t.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#722f37] text-white border-[#722f37] shadow-md'
                        : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{t.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/20 text-white">
                      {t.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Feature Display */}
          <div className={`p-8 rounded-3xl border-2 ${themeConfig.border} ${themeConfig.cardBg} text-white transition-all shadow-xl max-w-4xl mx-auto`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-200">{themeConfig.badge} Aesthetics</span>
                <h3 className="font-serif text-2xl font-bold mt-1 text-white">{themeConfig.name}</h3>
                <p className="text-xs text-white/80 mt-1">{themeConfig.tagline}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 border border-white/20">
                  Custom Typography &amp; CSS Tokens
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-black/30 p-4 rounded-xl border border-white/10">
                <span className="font-bold text-white block mb-1">Color Palette</span>
                <p className="text-white/70">High-contrast background with balanced accents designed for sunlight legibility.</p>
              </div>
              <div className="bg-black/30 p-4 rounded-xl border border-white/10">
                <span className="font-bold text-white block mb-1">Typography Pairing</span>
                <p className="text-white/70">Custom serif headlines paired with ultra-legible sans-serif details for senior relatives.</p>
              </div>
              <div className="bg-black/30 p-4 rounded-xl border border-white/10">
                <span className="font-bold text-white block mb-1">Ornamental Elements</span>
                <p className="text-white/70">Subtle border filigrees, mandap patterns, and micro-animations on interactive RSVP buttons.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive RSVP Simulator */}
      <section id="rsvp-sim" className="py-20 bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#722f37] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Interactive Tool 01
            </span>
            <h2 className="text-3xl font-serif font-extrabold text-stone-950 mt-3">
              Test the Scoped RSVP Experience
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Experience what your guests see on their phones. Notice how Haldi is hidden because this household is only invited to 4 functions.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-300 shadow-xl overflow-hidden max-w-3xl mx-auto p-6 sm:p-10">
            <form onSubmit={handleRsvpSubmit} className="space-y-6">
              
              {/* Header Box */}
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono uppercase text-[#722f37] font-bold">Simulating Guest Invitation</span>
                  <div className="font-serif font-bold text-stone-950 text-lg">The Sharma Family</div>
                  <div className="text-xs text-stone-600 mt-0.5">Invited by: Groom's Parents (Anil &amp; Sunita)</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-stone-700">Attending Count:</span>
                  <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-mono font-bold text-sm text-stone-900">{guestCount}</span>
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.min(4, guestCount + 1))}
                      className="px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Ceremonies List */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                  Select Functions Attending
                </label>
                <div className="space-y-3">
                  {SAMPLE_EVENTS.map(ev => {
                    const isInvited = ev.invited;
                    const isChecked = isInvited ? rsvpState[ev.id] : false;

                    return (
                      <div
                        key={ev.id}
                        className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                          !isInvited
                            ? 'bg-stone-50 border-stone-200 opacity-50 cursor-not-allowed'
                            : isChecked
                            ? 'bg-rose-50/60 border-[#722f37] ring-1 ring-[#722f37]'
                            : 'bg-white border-stone-300 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            disabled={!isInvited}
                            checked={isChecked}
                            onChange={(e) => {
                              if (isInvited) {
                                setRsvpState({ ...rsvpState, [ev.id]: e.target.checked });
                              }
                            }}
                            className="w-4 h-4 rounded text-[#722f37] focus:ring-[#722f37] cursor-pointer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-stone-950 text-sm">{ev.name}</span>
                              {!isInvited && (
                                <span className="text-[10px] font-mono bg-stone-200 text-stone-600 px-2 py-0.5 rounded font-semibold">
                                  Not in Guest Scope
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-stone-500 mt-0.5 flex flex-wrap items-center gap-2">
                              <span>📅 {ev.date}</span>
                              <span>·</span>
                              <span>⏰ {ev.time}</span>
                              <span>·</span>
                              <span>📍 {ev.venue}</span>
                            </div>
                          </div>
                        </div>

                        <span className="text-xs font-mono font-semibold text-stone-600">
                          {isInvited && isChecked ? `${guestCount} attending` : 'Decline'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dietary Preferences */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Dietary Preferences for Catering
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'jain', label: 'Jain Vegetarian' },
                    { id: 'veg', label: 'Pure Vegetarian' },
                    { id: 'non-veg', label: 'Non-Vegetarian' },
                  ].map(d => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDietary(d.id)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        dietary === d.id
                          ? 'border-[#722f37] bg-rose-50 text-[#722f37]'
                          : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#722f37] hover:bg-[#581c24] text-white font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-[#722f37]/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Family RSVP (Instant Sync)</span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Catering Plate Savings Calculator */}
      <section id="savings" className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#722f37] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Interactive Tool 02
            </span>
            <h2 className="text-3xl font-serif font-extrabold text-stone-950 mt-3">
              Catering Budget &amp; Headcount Calculator
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Un-scoped invitations and open spreadsheets lead to 15–25% unwanted plate waste. See how much Hinged saves your catering budget.
            </p>
          </div>

          <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto shadow-2xl border border-stone-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-300">
                      Total Wedding Guestlist Size
                    </label>
                    <span className="text-sm font-mono font-bold text-amber-300 bg-stone-800 px-2.5 py-0.5 rounded border border-stone-700">
                      {totalGuests} Guests
                    </span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="1500"
                    step="50"
                    value={totalGuests}
                    onChange={(e) => setTotalGuests(Number(e.target.value))}
                    className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
                    <span>150 (Intimate)</span>
                    <span>750</span>
                    <span>1,500 (Grand)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-300">
                      Average Catering Cost Per Plate
                    </label>
                    <span className="text-sm font-mono font-bold text-amber-300 bg-stone-800 px-2.5 py-0.5 rounded border border-stone-700">
                      ₹{plateCost.toLocaleString('en-IN')} / plate
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1200"
                    max="6000"
                    step="200"
                    value={plateCost}
                    onChange={(e) => setPlateCost(Number(e.target.value))}
                    className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
                    <span>₹1,200</span>
                    <span>₹3,500</span>
                    <span>₹6,000+ (5-Star Luxury)</span>
                  </div>
                </div>
              </div>

              {/* Savings Output Box */}
              <div className="bg-stone-800/90 rounded-2xl p-6 border border-stone-700/80 text-center flex flex-col justify-center">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300">Projected Catering Savings</span>
                <div className="text-3xl sm:text-5xl font-serif font-black text-white mt-2">
                  ₹{savings.moneySaved.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-stone-300 mt-2">
                  Prevented <strong>~{savings.uninvitedPlatesPrevented} uninvited / unconfirmed plates</strong> across intimate ceremonies.
                </div>

                <div className="mt-6 pt-4 border-t border-stone-700/80 flex items-center justify-around text-xs text-stone-400">
                  <div>
                    <span className="block font-bold text-white text-sm">30 Seconds</span>
                    <span>Guest RSVP Time</span>
                  </div>
                  <div className="w-px h-8 bg-stone-700"></div>
                  <div>
                    <span className="block font-bold text-white text-sm">100% Mobile</span>
                    <span>No App Downloads</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#722f37] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              The Architecture Advantage
            </span>
            <h2 className="text-3xl font-serif font-extrabold text-stone-950 mt-3">
              Why Generic Wedding Sites Fail in India
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Western platforms like The Knot and Zola were built for single-day church weddings. Hinged was built for Indian celebrations.
            </p>
          </div>

          <div className="overflow-x-auto max-w-5xl mx-auto">
            <table className="w-full bg-white rounded-2xl border border-stone-200 shadow-md text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-100">
                  <th className="py-4 px-5 font-bold text-stone-900">Feature &amp; Workflow</th>
                  <th className="py-4 px-5 font-bold text-stone-500">Western Sites (The Knot/Zola)</th>
                  <th className="py-4 px-5 font-bold text-stone-500">Messy WhatsApp &amp; Excel</th>
                  <th className="py-4 px-5 font-extrabold text-[#722f37] bg-rose-50/80">Hinged Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-4 px-5 font-semibold text-stone-900">Multi-Event Scoping</td>
                  <td className="py-4 px-5 text-stone-500">Single event only</td>
                  <td className="py-4 px-5 text-rose-600 font-medium">38-column manual VLOOKUPs</td>
                  <td className="py-4 px-5 font-bold text-emerald-700 bg-rose-50/40">Automatic Scoped Token Links</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-semibold text-stone-900">Guest Channel</td>
                  <td className="py-4 px-5 text-rose-600 font-medium">Email invites (&lt;15% open rates)</td>
                  <td className="py-4 px-5 text-stone-600">Chaotic WhatsApp groups</td>
                  <td className="py-4 px-5 font-bold text-emerald-700 bg-rose-50/40">WhatsApp-Native 1-Click Opens</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-semibold text-stone-900">Guest List Privacy</td>
                  <td className="py-4 px-5 text-rose-600 font-medium">Public search leaks guestlist</td>
                  <td className="py-4 px-5 text-stone-500">Spreadsheet accidentally forwarded</td>
                  <td className="py-4 px-5 font-bold text-emerald-700 bg-rose-50/40">Zero Public Indexing · Strict Tokens</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-semibold text-stone-900">Headcount Enforcement</td>
                  <td className="py-4 px-5 text-stone-500">Generic +1 checkboxes</td>
                  <td className="py-4 px-5 text-rose-600 font-medium">Relatives bring surprise +4 guests</td>
                  <td className="py-4 px-5 font-bold text-emerald-700 bg-rose-50/40">Strict Household Caps (max_attendees)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-semibold text-stone-900">Cultural Themes</td>
                  <td className="py-4 px-5 text-stone-500">Western pastel church layouts</td>
                  <td className="py-4 px-5 text-stone-400">None</td>
                  <td className="py-4 px-5 font-bold text-emerald-700 bg-rose-50/40">Royal Indian, Modern Editorial &amp; Floral</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#722f37] flex items-center justify-center text-white text-base font-bold">
                💍
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-stone-950">Hinged</span>
                <p className="text-xs text-stone-500">One link for your wedding. Every guest, every function, every detail.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-stone-600 font-medium">
              <a
                href="https://github.com/Wedding-Tribe/hinged"
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-950 flex items-center gap-1"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/Wedding-Tribe/hinged/blob/main/docs/architecture.md"
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-950"
              >
                Architecture Spec
              </a>
              <a
                href="https://github.com/Wedding-Tribe/hinged/blob/main/ROADMAP.md"
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-950"
              >
                Roadmap
              </a>
              <a
                href="https://1997agarwal.github.io"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#722f37] font-semibold"
              >
                Architected by Harshit Agarwal ↗
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>© {new Date().getFullYear()} Hinged Platform (Wedding-Tribe). Open Source under MIT License.</p>
            <p>10/10 Automated Tests Passing · 4-File Parity Governance · WhatsApp Native</p>
          </div>
        </div>
      </footer>

      {/* Early Access Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#722f37] mb-4 text-lg">
              💍
            </div>

            <h3 className="text-xl font-serif font-bold text-stone-950">
              Get Early Access to Hinged
            </h3>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              Planning your wedding or coordinating celebrations for your family? Leave your details to get a private demo workspace set up for your wedding.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowModal(false);
                setToastMsg('Thank you! We will reach out on WhatsApp to set up your wedding workspace.');
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Couple / Family Names</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Aarav &amp; Meera"
                  className="w-full text-xs p-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#722f37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">WhatsApp Mobile Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-xs bg-stone-100 border border-r-0 border-stone-300 rounded-l-lg text-stone-600 font-mono">
                    +91
                  </span>
                  <input
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    className="w-full text-xs p-3 rounded-r-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#722f37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Wedding City</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Jaipur / Udaipur"
                    className="w-full text-xs p-3 rounded-lg border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Approx. Guest Count</label>
                  <select className="w-full text-xs p-3 rounded-lg border border-stone-300 bg-white text-stone-800">
                    <option>100–300 guests</option>
                    <option>300–600 guests</option>
                    <option>600–1,200+ guests</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#722f37] hover:bg-[#581c24] text-white font-bold text-xs py-3.5 rounded-lg shadow-md transition-all active:scale-95"
              >
                Request Private Wedding Setup
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
