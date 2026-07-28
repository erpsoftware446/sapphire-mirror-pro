import { useEffect, useState } from "react";
import {
  ChevronLeft, ChevronRight, ArrowRight, Play, Clock, ShieldCheck,
  BadgeCheck, Lock, Boxes, Crown, Rocket, Sparkles, Zap, Globe2,
  GraduationCap, Building2,
} from "lucide-react";

type Banner = {
  id: string;
  kicker: string;
  headline: string;
  sub: string;
  cta: string;
  secondary?: string;
  icon: typeof Rocket;
  bg: string;
  accent: string;
  ring: string;
  badge: string;
};

const BANNERS: Banner[] = [
  { id: "catalog", kicker: "Mega Catalog", headline: "204+ Software Solutions Across 55 Industries", sub: "Every category. Every industry. One marketplace built for scale.", cta: "Browse Catalog", secondary: "View Categories", icon: Boxes, bg: "from-[oklch(0.14_0.07_260)] via-[oklch(0.18_0.07_262)] to-[oklch(0.24_0.08_265)]", accent: "text-cyan-300", ring: "border-cyan-400/40", badge: "bg-cyan-500/15 text-cyan-200" },
  { id: "lifetime", kicker: "Limited Offer", headline: "Lifetime Access Starting $249", sub: "Pay once. Own forever. Zero recurring fees.", cta: "Claim Lifetime Deal", secondary: "See Pricing", icon: Crown, bg: "from-[oklch(0.16_0.08_60)] via-[oklch(0.2_0.09_50)] to-[oklch(0.26_0.11_40)]", accent: "text-amber-300", ring: "border-amber-400/40", badge: "bg-amber-500/15 text-amber-200" },
  { id: "delivery", kicker: "White Glove", headline: "2-Hour Delivery, Free Installation", sub: "Approved & provisioned in 120 minutes — with 1 year of free support.", cta: "Start Now", secondary: "Watch Demo", icon: Rocket, bg: "from-[oklch(0.16_0.09_300)] via-[oklch(0.2_0.1_320)] to-[oklch(0.24_0.11_340)]", accent: "text-fuchsia-300", ring: "border-fuchsia-400/40", badge: "bg-fuchsia-500/15 text-fuchsia-200" },
  { id: "ai", kicker: "AI Native", headline: "Automation Copilots Built-in", sub: "Every product ships with AI recommendations, compare & sales assistants.", cta: "Explore AI Zone", secondary: "Try Copilot", icon: Sparkles, bg: "from-[oklch(0.14_0.1_180)] via-[oklch(0.2_0.11_200)] to-[oklch(0.24_0.12_220)]", accent: "text-emerald-300", ring: "border-emerald-400/40", badge: "bg-emerald-500/15 text-emerald-200" },
];

const accentBg = (a: string) => a.replace("text-", "bg-");

export const RefHeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % BANNERS.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const slide = BANNERS[current];
  const Icon = slide.icon;

  return (
    <div
      className="relative h-[420px] w-full overflow-hidden lg:h-[480px] bg-[oklch(0.1_0.03_260)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.22_0.08_260)_0%,oklch(0.14_0.06_265)_45%,oklch(0.08_0.03_260)_100%)]" />
      <div key={`tint-${slide.id}`} className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${slide.bg} opacity-60 mix-blend-screen transition-opacity duration-1000`} />
      <div className={`pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-40 blur-[140px] animate-pulse ${accentBg(slide.accent)}`} style={{ animationDuration: "6s" }} />
      <div className={`pointer-events-none absolute -bottom-44 right-1/4 h-[460px] w-[460px] rounded-full opacity-25 blur-[140px] animate-pulse ${accentBg(slide.accent)}`} style={{ animationDuration: "8s", animationDelay: "1s" }} />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-fuchsia-500/15 blur-[140px] animate-pulse" style={{ animationDuration: "10s" }} />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(0 0% 100% / 0.5) 1px, transparent 1px), linear-gradient(to bottom, hsl(0 0% 100% / 0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[conic-gradient(from_220deg_at_70%_30%,transparent_0deg,hsl(0_0%_100%/0.04)_60deg,transparent_120deg)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.06_0.02_260/0.7)_100%)]" />

      {/* Assurance strip */}
      <div className="relative z-10 hidden border-b border-white/[0.06] bg-black/20 px-6 py-2 backdrop-blur-md md:flex lg:px-10">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] text-white/70">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-emerald-300" /> No Advance Payment</span>
          <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-cyan-300" /> 2-Hour Delivery</span>
          <span className="flex items-center gap-1.5"><BadgeCheck className="h-3 w-3 text-amber-300" /> No Hidden Charges</span>
          <span className="flex items-center gap-1.5"><Lock className="h-3 w-3 text-rose-300" /> Trademark Protected</span>
          <span className="flex items-center gap-1.5"><Boxes className="h-3 w-3 text-violet-300" /> 204+ Solutions</span>
          <span className="flex items-center gap-1.5"><Zap className="h-3 w-3 text-fuchsia-300" /> 20 Live Demos</span>
          <span className="flex items-center gap-1.5"><Globe2 className="h-3 w-3 text-sky-300" /> Global Support</span>
        </div>
      </div>

      <div className="relative z-10 grid h-[calc(100%-36px)] grid-cols-1 items-center gap-6 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-10">
        <div key={slide.id} className="max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm ${slide.ring} ${slide.badge}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${accentBg(slide.accent)} animate-pulse`} />
              {slide.kicker}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70 backdrop-blur-sm">
              <GraduationCap className="h-3 w-3" /> Software Vala™
            </span>
          </div>

          <h1 className="mb-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-[56px]">
            {slide.headline}
          </h1>
          <p className="mb-6 max-w-xl text-sm text-white/75 leading-relaxed lg:text-base">
            {slide.sub}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="/demos" className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-white px-6 py-3 text-sm font-bold text-gray-900 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.5)] transition-all hover:scale-[1.03]">
              {slide.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            {slide.secondary && (
              <a href="#All" className={`flex items-center gap-2 rounded-xl border ${slide.ring} bg-white/5 px-6 py-3 text-sm font-semibold ${slide.accent} backdrop-blur-md transition-colors hover:bg-white/10`}>
                {slide.secondary}
              </a>
            )}
            <a href="/demos" className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10">
              <Play className="h-4 w-4" /> Instant Demo
            </a>
          </div>

          <div className="mt-7 flex items-center gap-2">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to banner ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === current ? `w-10 ${accentBg(slide.accent)}` : "w-3 bg-white/15 hover:bg-white/30"}`}
              />
            ))}
            <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-white/50">
              {String(current + 1).padStart(2, "0")} / {String(BANNERS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative hidden h-full items-center justify-center lg:flex">
          <div className={`relative w-full max-w-[440px] overflow-hidden rounded-2xl border ${slide.ring} bg-gradient-to-br from-white/[0.09] via-white/[0.04] to-white/[0.01] p-6 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-500`}>
            <div className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-30 blur-3xl ${accentBg(slide.accent)}`} />
            <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${slide.badge}`}>
              <Icon className={`h-7 w-7 ${slide.accent}`} />
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">{slide.kicker}</div>
            <div className="mt-1 text-lg font-bold text-white leading-snug">{slide.headline}</div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
              <Stat label="Solutions" value="204+" />
              <Stat label="Categories" value="55" />
              <Stat label="Delivery" value="2 Hr" />
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-white/60">
              <Building2 className="h-3 w-3" /> Trusted by 50K+ businesses globally
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => setCurrent((p) => (p - 1 + BANNERS.length) % BANNERS.length)} aria-label="Previous banner" className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/60">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={() => setCurrent((p) => (p + 1) % BANNERS.length)} aria-label="Next banner" className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/60">
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
        <div key={slide.id + (paused ? "-p" : "")} className={`h-full ${accentBg(slide.accent)}`} style={{ animation: paused ? "none" : "banner-progress 6s linear forwards" }} />
      </div>
      <style>{`@keyframes banner-progress { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-base font-bold text-white">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-white/55">{label}</div>
    </div>
  );
}

export default RefHeroBanner;
