import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PartyPopper, Tag, Truck, ShieldCheck, Headphones } from "lucide-react";

function getFestive(month: number) {
  const f: Record<number, { name: string; discount: string; text: string; gradient: string }> = {
    0: { name: "New Year Sale", discount: "Flat 40% OFF", text: "Start the year with best deals!", gradient: "from-blue-500 via-indigo-500 to-purple-600" },
    2: { name: "Holi Festival Sale", discount: "Flat 50% OFF", text: "Colors of savings!", gradient: "from-pink-500 via-purple-500 to-indigo-500" },
    3: { name: "Spring Sale", discount: "Flat 35% OFF", text: "Fresh deals for your business!", gradient: "from-green-500 via-emerald-500 to-teal-500" },
    7: { name: "Independence Day Sale", discount: "Flat 50% OFF", text: "Freedom to choose!", gradient: "from-orange-500 via-white to-green-500" },
    9: { name: "Diwali Mega Sale", discount: "Flat 60% OFF", text: "Festival of lights & deals!", gradient: "from-amber-500 via-orange-500 to-red-500" },
    10: { name: "Black Friday", discount: "Flat 70% OFF", text: "Biggest sale of the year!", gradient: "from-gray-800 via-gray-900 to-black" },
    11: { name: "Christmas Sale", discount: "Flat 45% OFF", text: "Holiday special!", gradient: "from-red-500 via-red-600 to-green-600" },
  };
  return f[month] ?? { name: "Mega Software Sale", discount: "Flat 40% OFF", text: "Lifetime access on all 147 products!", gradient: "from-amber-500 via-orange-500 to-red-500" };
}

const FestiveBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);
  const offer = getFestive(new Date().getMonth());

  const announcements = [
    { icon: PartyPopper, title: `🎉 ${offer.name} —`, badge: offer.discount, text: offer.text },
    { icon: Truck, title: "⚡ Instant Deployment —", badge: "2-Hour Delivery", text: "Source code + setup delivered same day." },
    { icon: ShieldCheck, title: "🔒 Buyer Protection —", badge: "No Advance Payment", text: "Pay only after live demo approval." },
    { icon: Headphones, title: "🌍 Global Support —", badge: "24×7 Live Help", text: "Human + AI assistance in 12 languages." },
  ];

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % announcements.length), 4200);
    return () => clearInterval(t);
  }, [announcements.length]);

  if (dismissed) return null;
  const item = announcements[index];
  const Icon = item.icon;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-r ${offer.gradient} py-3 sm:py-4 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]`}>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
            style={{ left: `${5 + i * 10}%`, top: `${15 + (i % 3) * 30}%` }}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1.6, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 h-7 flex items-center justify-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -22, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <Icon className="w-5 h-5 flex-shrink-0 hidden sm:block drop-shadow-lg" />
            <span className="text-sm sm:text-base font-bold whitespace-nowrap drop-shadow">{item.title}</span>
            <span className="px-2.5 py-1 rounded-md bg-white/25 backdrop-blur-sm text-sm sm:text-base font-black whitespace-nowrap shadow-inner border border-white/30">
              {item.badge}
            </span>
            <span className="text-sm hidden md:inline whitespace-nowrap drop-shadow">{item.text}</span>
            <Tag className="w-4 h-4 flex-shrink-0 hidden sm:block drop-shadow-lg" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mt-2 flex items-center justify-center gap-1.5">
        {announcements.map((_, i) => (
          <button
            key={i}
            aria-label={`Announcement ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>

      <button onClick={() => setDismissed(true)} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/30">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default FestiveBanner;
