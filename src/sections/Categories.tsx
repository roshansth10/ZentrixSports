import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: 'JERSEYS',
    image: '/images/categories/jerseys-tunnel.jpg',
    link: '#featured',
    cta: 'Browse Jerseys',
  },
  {
    name: 'BOOTS',
    image: '/images/categories/boots-tunnel.jpg',
    link: '#boots',
    cta: 'Browse Boots',
  },
  {
    name: 'EQUIPMENT',
    image: '/images/categories/equipment-room.jpg',
    link: '#equipment',
    cta: 'Browse Equipment',
  },
];

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const panels = panelsRef.current.filter(Boolean);

    if (!section || panels.length === 0) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      // Left panel
      scrollTl.fromTo(
        panels[0],
        { x: '-40vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Center panel
      scrollTl.fromTo(
        panels[1],
        { y: '100vh', opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0.05
      );

      // Right panel
      scrollTl.fromTo(
        panels[2],
        { x: '40vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      panels.forEach((panel, i) => {
        scrollTl.fromTo(
          panel,
          { scale: 1, opacity: 1 },
          { scale: 1.06, opacity: 0, ease: 'power2.in' },
          0.7 + i * 0.02
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative w-full h-screen overflow-hidden z-30 bg-[#070B14]"
    >
      <div className="w-full h-full flex flex-col lg:flex-row">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            ref={(el) => { panelsRef.current[index] = el; }}
            className="relative flex-1 h-1/3 lg:h-full overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight">
                {category.name}
              </h3>

              <motion.a
                href={category.link}
                className="mt-4 flex items-center gap-2 text-white/70 hover:text-[#00F0FF] transition-colors group/link"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-sm font-medium tracking-wide">
                  {category.cta}
                </span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </motion.a>
            </div>

            {/* Border */}
            <div className="absolute inset-0 border-r border-white/5 last:border-r-0 pointer-events-none" />

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-[#00F0FF]/10 to-transparent" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}