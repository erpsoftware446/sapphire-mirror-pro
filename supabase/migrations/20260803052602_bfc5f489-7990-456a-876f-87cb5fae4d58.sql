UPDATE public.hero_slides SET title = 'Do Not Build Software From Scratch. Build Your Business With Software Vala.' WHERE slug = 'skip-scratch';
UPDATE public.hero_slides SET title = '24/7 Technical Support. We''re Here When You Need Us.' WHERE slug = 'support-247';
UPDATE public.hero_slides SET subtitle = replace(subtitle, 'We are', 'We''re') WHERE subtitle LIKE '%We are%';