import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, ShoppingCart, Sparkles } from "lucide-react";

interface FeaturedProduct {
  id: string;
  title: string;
  subtitle: string;
  cta_primary: string;
  cta_link: string;
  gradient: string;
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  { id: "1", title: "Restaurant POS System", subtitle: "Complete billing, inventory & kitchen management. Try the live demo now!", cta_primary: "Try Demo", cta_link: "/demos", gradient: "from-orange-600 via-red-600 to-pink-700" },
  { id: "2", title: "School ERP & LMS", subtitle: "Student management, attendance, fees & online classes — all-in-one.", cta_primary: "Try Demo", cta_link: "/demos", gradient: "from-blue-600 via-indigo-600 to-purple-700" },
  { id: "3", title: "Hospital Management", subtitle: "OPD, IPD, pharmacy, lab reports & billing. Built for modern clinics.", cta_primary: "Try Demo", cta_link: "/demos", gradient: "from-emerald-600 via-teal-600 to-cyan-700" },
  { id: "4", title: "E-Commerce Platform", subtitle: "Launch your online store in minutes. Multi-vendor, payments & delivery.", cta_primary: "Try Demo", cta_link: "/demos", gradient: "from-purple-600 via-violet-600 to-fuchsia-700" },
  { id: "5", title: "CRM & Sales Automation", subtitle: "Manage leads, customers & sales pipeline with AI-powered insights.", cta_primary: "Try Demo", cta_link: "/demos", gradient: "from-cyan-600 via-blue-600 to-indigo-700" },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % FEATURED_PRODUCTS.length);
  }, []);
  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + FEATURED_PRODUCTS.length) % FEATURED_PRODUCTS.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const product = FEATURED_PRODUCTS[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 400 : -400, opacity: 0, rotateY: d > 0 ? 25 : -25, scale: 0.9 }),
    center: { x: 0, opacity: 1, rotateY: 0, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -400 : 400, opacity: 0, rotateY: d > 0 ? -25 : 25, scale: 0.9 }),
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ perspective: 1400 }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={product.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`relative w-full bg-gradient-to-r ${product.gradient} py-20 sm:py-24 lg:py-32`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* 3D depth layers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.35),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />

          {/* Floating orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/20 blur-2xl"
              style={{ width: 80 + i * 30, height: 80 + i * 30, left: `${10 + i * 18}%`, top: `${15 + (i % 3) * 25}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 mb-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            >
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span className="text-white/90 text-xs font-bold tracking-[0.2em] uppercase">Featured Software</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] [text-shadow:0_2px_0_rgba(0,0,0,0.15)]"
            >
              {product.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-white/90 text-base sm:text-lg max-w-xl mx-auto mb-8 drop-shadow-lg"
            >
              {product.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <a
                href={product.cta_link}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-gray-900 font-bold text-base hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.6)] border border-white/60"
              >
                <Play className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                {product.cta_primary}
              </a>
              <a
                href="/demos"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/15 backdrop-blur-md text-white font-semibold border border-white/30 hover:bg-white/25 hover:scale-105 transition-all shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 hover:scale-110 transition-all shadow-2xl border border-white/20">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 hover:scale-110 transition-all shadow-2xl border border-white/20">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {FEATURED_PRODUCTS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`h-2.5 rounded-full transition-all shadow-lg ${i === current ? "bg-white w-8" : "bg-white/40 w-2.5 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;