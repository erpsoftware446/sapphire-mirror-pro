import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Play, ChevronLeft, ChevronRight, ShoppingCart, Sparkles,
  Boxes, Crown, Rocket, Zap, ShieldCheck, Clock, BadgeCheck, Lock, Globe2,
  Utensils, GraduationCap, Stethoscope, Store, Users, ArrowRight,
  Layers, Wallet, Headphones, Handshake,
  type LucideIcon,
} from "lucide-react";
import { heroPublicQuery } from "@/lib/marketplace-content/heroQueries";

const ICONS: Record<string, LucideIcon> = {
  Boxes, Crown, Rocket, Sparkles, Utensils, GraduationCap, Stethoscope, Store, Users,
  ShoppingCart, Play, ShieldCheck, Clock, BadgeCheck, Lock, Globe2, Zap,
};

/** Small satellite icons that orbit the 3D medallion, per slide index. */
const SATELLITES: LucideIcon[][] = [
  [Boxes, Store, GraduationCap, Stethoscope],
  [Crown, Wallet, ShieldCheck, BadgeCheck],
  [ShieldCheck, BadgeCheck, Wallet, Layers],
  [Handshake, ShieldCheck, BadgeCheck, Users],
  [Headphones, Clock, Zap, BadgeCheck],
  [Globe2, Store, Handshake, Rocket],
  [Handshake, Store, Globe2, Users],
  [Play, Layers, Rocket, Sparkles],
  [Rocket, Zap, Layers, Clock],
  [Globe2, Boxes, Handshake, Sparkles],
];

const BRAND_STRIP = [
  { icon: Boxes, value: "12,000+", label: "Ready Software" },
  { icon: Layers, value: "80+", label: "Business Categories" },
  { icon: Sparkles, value: "One Marketplace", label: "Endless Solutions" },
  { icon: Wallet, value: "$249", label: "Lifetime License" },
  { icon: Headphones, value: "24/7", label: "Technical Support" },
  { icon: Handshake, value: "Buy • Sell • Resell", label: "Franchise & Partner" },
];

const HeroCarousel = () => {
  const { data: slides } = useSuspenseQuery(heroPublicQuery());
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const dragX = useRef<number | null>(null);

  const total = slides.length;
  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (total ? (prev + 1) % total : 0));
  }, [total]);
  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (total ? (p - 1 + total) % total : 0));
  }, [total]);

  useEffect(() => {
    if (paused || total <= 1) return;
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next, paused, total]);

  useEffect(() => {
    if (current >= total) setCurrent(0);
  }, [current, total]);

  if (!total) return null;
  const index = Math.min(current, total - 1);
  const product = slides[index];
  const Icon = ICONS[product.icon_name] ?? Boxes;
  const sats = SATELLITES[index % SATELLITES.length];
  const badge = String(index + 1).padStart(2, "0");

  const variants = reduce
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (d: number) => ({ x: d > 0 ? 220 : -220, opacity: 0, scale: 0.97 }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (d: number) => ({ x: d > 0 ? -220 : 220, opacity: 0, scale: 0.97 }),
      };

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => { dragX.current = e.clientX; }}
      onPointerUp={(e) => {
        if (dragX.current === null) return;
        const dx = e.clientX - dragX.current;
        dragX.current = null;
        if (dx < -60) next();
        else if (dx > 60) prev();
      }}
      aria-roledescription="carousel"
    >
      <div className="relative">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={product.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reduce ? 0.25 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`relative w-full bg-gradient-to-br ${product.gradient} py-12 sm:py-16 lg:py-20`}
        >
          {/* light premium surface */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.95),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.7),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]" />

          {!reduce && [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/70 blur-3xl"
              style={{ width: 120 + i * 46, height: 120 + i * 46, left: `${6 + i * 18}%`, top: `${10 + (i % 3) * 26}%` }}
              animate={{ y: [0, -18, 0], opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}

          <div className="relative z-10 max-w-7xl mx-auto px-14 sm:px-16 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
            {/* LEFT */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/85 backdrop-blur-md border border-white shadow-[0_8px_20px_-8px_rgba(15,23,42,0.35)] text-slate-900 text-sm font-black">
                  {badge}
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.4)]">
                  <Sparkles className={`w-3.5 h-3.5 ${product.accent}`} />
                  <span className="text-slate-800 text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase">
                    {product.kicker}
                  </span>
                </span>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.08] tracking-tight"
              >
                {product.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="mt-4 text-slate-700 text-sm sm:text-base max-w-xl mx-auto lg:mx-0"
              >
                {product.subtitle}
              </motion.p>

              {product.highlight && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24 }}
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white/85 backdrop-blur-md border border-white px-4 py-2 shadow-[0_14px_36px_-18px_rgba(15,23,42,0.6)]"
                >
                  <BadgeCheck className={`w-4 h-4 ${product.accent}`} />
                  <span className="text-slate-900 text-xs sm:text-sm font-extrabold tracking-wide">
                    {product.highlight}
                  </span>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <a
                  href={product.cta_link}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm sm:text-base hover:scale-[1.03] active:scale-95 transition-all shadow-[0_20px_45px_-18px_rgba(15,23,42,0.9)]"
                >
                  {product.cta_primary}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="/demos"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white/85 backdrop-blur-md text-slate-800 font-semibold text-sm sm:text-base border border-white hover:bg-white transition-all shadow-[0_14px_34px_-20px_rgba(15,23,42,0.7)]"
                >
                  {product.cta_secondary}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            {/* RIGHT — glossy 3D medallion + orbiting icons */}
            <div className="relative mx-auto h-56 w-56 sm:h-72 sm:w-72">
              <motion.div
                className="absolute inset-0 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white shadow-[0_40px_80px_-40px_rgba(15,23,42,0.55),inset_0_1px_0_rgba(255,255,255,0.9)]"
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-8 rounded-[1.6rem] bg-gradient-to-br from-white via-white/70 to-white/30 border border-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.5)] flex items-center justify-center"
                animate={reduce ? undefined : { rotate: [0, 2.5, 0, -2.5, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon className={`h-16 w-16 sm:h-20 sm:w-20 ${product.accent} drop-shadow-[0_10px_18px_rgba(15,23,42,0.25)]`} />
              </motion.div>

              {sats.map((S, i) => {
                const angle = (i / sats.length) * Math.PI * 2;
                const r = 44;
                return (
                  <motion.div
                    key={i}
                    className="absolute h-11 w-11 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-[0_16px_30px_-16px_rgba(15,23,42,0.6)] flex items-center justify-center"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * r}% - 22px)`,
                      top: `calc(50% + ${Math.sin(angle) * r}% - 22px)`,
                    }}
                    animate={reduce ? undefined : { y: [0, -8, 0], opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.35 }}
                  >
                    <S className={`h-5 w-5 ${product.accent}`} />
                  </motion.div>
                );
              })}

              {!reduce && [...Array(6)].map((_, i) => (
                <motion.span
                  key={`sp-${i}`}
                  className="absolute h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.9)]"
                  style={{ left: `${12 + i * 14}%`, top: `${18 + (i % 3) * 24}%` }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button aria-label="Previous banner" onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-slate-800 hover:bg-white hover:scale-110 transition-all shadow-[0_18px_40px_-20px_rgba(15,23,42,0.8)] border border-white">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button aria-label="Next banner" onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-slate-800 hover:bg-white hover:scale-110 transition-all shadow-[0_18px_40px_-20px_rgba(15,23,42,0.8)] border border-white">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to banner ${i + 1}`}
            onClick={() => { setDirection(i > index ? 1 : -1); setCurrent(i); }}
            className={`h-2 rounded-full transition-all ${i === index ? "bg-slate-900 w-7" : "bg-slate-900/25 w-2 hover:bg-slate-900/50"}`}
          />
        ))}
      </div>

      {/* progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-slate-900/10">
        <motion.div
          key={`${product.id}-${paused}`}
          className="h-full bg-slate-900/60"
          initial={{ width: "0%" }}
          animate={{ width: paused || reduce ? "0%" : "100%" }}
          transition={{ duration: paused || reduce ? 0 : 6.5, ease: "linear" }}
        />
      </div>

      </div>

      {/* global brand strip */}
      <div className="relative z-10 border-y border-slate-900/10 bg-gradient-to-r from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {BRAND_STRIP.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-900/10 shadow-[0_10px_24px_-16px_rgba(15,23,42,0.8)]">
                <b.icon className="h-4 w-4 text-slate-700" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-black text-slate-900">{b.value}</span>
                <span className="block text-[11px] text-slate-500">{b.label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
