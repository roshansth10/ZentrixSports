import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';

gsap.registerPlugin(ScrollTrigger);

export default function CheckoutCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { setCheckoutStep } = useStore();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      const headline = content.querySelector('h2');
      const subhead = content.querySelector('p');
      const buttons = content.querySelector('.buttons');

      scrollTl.fromTo(
        headline,
        { scale: 0.92, opacity: 0, y: '10vh' },
        { scale: 1, opacity: 1, y: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        subhead,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        buttons,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        content,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-[120] bg-[#070B14]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-[#0F172A] to-[#070B14]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00F0FF]/10 rounded-full blur-[200px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <div ref={contentRef} className="text-center max-w-2xl">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight">
            READY TO
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00E676]">
              {' '}
              PLAY?
            </span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-white/60">
            Secure checkout. Fast shipping. Game-day ready.
          </p>

          <div className="buttons mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => setCheckoutStep('checkout')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-[#00F0FF] text-[#070B14] font-semibold rounded-full hover:bg-[#00F0FF]/90 transition-all duration-300 group"
            >
              <ShoppingBag className="w-5 h-5" />
              Checkout
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              href="#categories"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Continue Shopping
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}