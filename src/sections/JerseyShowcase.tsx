import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const jerseyImages = [
'/images/jerseys/argentina.jpg',
'/images/jerseys/brazil.jpg',
'/images/jerseys/england.jpg',
'/images/jerseys/france.jpg',
'/images/jerseys/germany.jpg',
'/images/jerseys/NED.jpg',
'/images/jerseys/portugalhome.jpg',
'/images/jerseys/spainhome.jpg',
'/images/jerseys/mexicohome.jpg',
];

export default function JerseyShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const jerseyRef = useRef<HTMLDivElement>(null);
  const [currentJersey, setCurrentJersey] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const jersey = jerseyRef.current;

    if (!section || !text || !jersey) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        text,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        jersey,
        { x: '55vw', opacity: 0, scale: 0.92, rotateY: -22 },
        { x: 0, opacity: 1, scale: 1, rotateY: -8, ease: 'none' },
        0.06
      );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        text,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        jersey,
        { x: 0, opacity: 1, scale: 1 },
        { x: '18vw', opacity: 0, scale: 0.96, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    setCurrentJersey((prev) => (prev + 1) % jerseyImages.length);
  };

  const handlePrev = () => {
    setCurrentJersey((prev) => (prev - 1 + jerseyImages.length) % jerseyImages.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-20 bg-[#070B14]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#070B14] to-[#070B14]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00F0FF]/5 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            {/* Text Content */}
            <div
              ref={textRef}
              className="w-full lg:w-[40%] text-center lg:text-left"
            >
              <span className="inline-block px-4 py-2 bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-full text-[#00F0FF] text-xs font-mono tracking-widest uppercase mb-6">
                2026 Collection
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-none">
                ENGINEERED
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00E676]">
                  FOR SPEED
                </span>
              </h2>

              <p className="mt-6 text-base lg:text-lg text-white/60 max-w-md mx-auto lg:mx-0">
                Lightweight fabrics, breathable panels, and a fit that moves with
                you—on the pitch and in the streets.
              </p>

              <motion.a
                href="#categories"
                className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-[#00F0FF] text-[#070B14] font-semibold rounded-full hover:bg-[#00F0FF]/90 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Jerseys
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>

            {/* Jersey Image */}
            <div
              ref={jerseyRef}
              className="w-full lg:w-[50%] flex items-center justify-center"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateY(-8deg) rotateZ(2deg)',
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-[#00F0FF]/20 rounded-3xl blur-[60px] scale-110" />

                <img
                  src={jerseyImages[currentJersey]}
                  alt="2026 Collection Jersey"
                  className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl drop-shadow-2xl"
                />

                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 lg:-right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
                  <p className="text-[#00F0FF] text-xs font-mono tracking-wider">
                    NEW DROP
                  </p>
रू 11,800
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handlePrev} className="text-white">Prev</button>
      <button onClick={handleNext} className="text-white">Next</button>
    </section>
  );
}