ALTER TABLE public.hero_slides ADD COLUMN IF NOT EXISTS mascot TEXT NOT NULL DEFAULT '🚀';

UPDATE public.hero_slides SET gradient='from-sky-400 via-cyan-300 to-blue-500',   accent='text-sky-700',     mascot='🧰' WHERE slug='mega-marketplace';
UPDATE public.hero_slides SET gradient='from-violet-400 via-fuchsia-300 to-purple-500', accent='text-violet-700', mascot='👑' WHERE slug='lifetime-249';
UPDATE public.hero_slides SET gradient='from-emerald-400 via-teal-300 to-green-500', accent='text-emerald-800', mascot='🛡️' WHERE slug='no-hidden-charges';
UPDATE public.hero_slides SET gradient='from-rose-400 via-pink-300 to-red-400',    accent='text-rose-700',    mascot='🤝' WHERE slug='no-advance-payment';
UPDATE public.hero_slides SET gradient='from-orange-400 via-amber-300 to-yellow-400', accent='text-orange-700', mascot='🕒' WHERE slug='support-247';
UPDATE public.hero_slides SET gradient='from-lime-400 via-green-300 to-emerald-500', accent='text-green-800',  mascot='🌍' WHERE slug='global-opportunity';
UPDATE public.hero_slides SET gradient='from-indigo-400 via-blue-300 to-sky-500',  accent='text-indigo-700',  mascot='🧑‍💼' WHERE slug='partnership-programs';
UPDATE public.hero_slides SET gradient='from-yellow-400 via-orange-300 to-amber-500', accent='text-amber-800', mascot='🎬' WHERE slug='demos-tutorials';
UPDATE public.hero_slides SET gradient='from-cyan-400 via-sky-300 to-indigo-400',  accent='text-cyan-800',    mascot='🚀' WHERE slug='skip-scratch';
UPDATE public.hero_slides SET gradient='from-blue-400 via-indigo-300 to-amber-300', accent='text-blue-800',   mascot='💎' WHERE slug='name-of-trust';