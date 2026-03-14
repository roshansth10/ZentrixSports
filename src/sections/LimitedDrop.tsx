import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LimitedDrop() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 33,
    seconds: 9,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;

    if (!section || !card) return;

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
      scrollTl.fromTo(
        card,
        { y: '80vh', opacity: 0, scale: 0.92, rotateX: 18 },
        { y: 0, opacity: 1, scale: 1, rotateX: 0, ease: 'none' },
        0
      );

      // Countdown numbers
      const countdownNumbers = card.querySelectorAll('.countdown-digit');
      countdownNumbers.forEach((num, i) => {
        scrollTl.fromTo(
          num,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0.15 + i * 0.03
        );
      });

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        card,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-[90] bg-[#070B14]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/products/limited-boot.jpg"
          alt="Limited Drop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#070B14]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-[#070B14]/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <div
          ref={cardRef}
          className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl"
          style={{ perspective: '1000px' }}
        >
          {/* Product Image */}
          <div className="relative h-48 sm:h-56 bg-gradient-to-br from-[#0F172A] to-[#070B14]">
            <img
              src="/images/boots/mercurial.jpg"
              alt="Phantom Elite"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 bg-[#00F0FF] text-[#070B14] text-xs font-bold rounded-full">
                LIMITED DROP
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#070B14]">
              PHANTOM ELITE
            </h3>
            <p className="mt-2 text-gray-600">
              Limited edition boots. Only 100 pairs available worldwide.
            </p>

            {/* Countdown */}
            <div className="mt-6 flex justify-center gap-4">
              {[
                { value: timeLeft.days, label: 'DAYS' },
                { value: timeLeft.hours, label: 'HRS' },
                { value: timeLeft.minutes, label: 'MIN' },
                { value: timeLeft.seconds, label: 'SEC' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="countdown-digit w-14 h-14 sm:w-16 sm:h-16 bg-[#070B14] rounded-xl flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-bold text-[#00F0FF]">
                      {formatNumber(item.value)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-[#070B14] text-white font-semibold rounded-xl hover:bg-[#0F172A] transition-all duration-300 group"
            >
              Reserve Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}