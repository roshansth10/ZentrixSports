import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { useStore, products } from '../store/useStore';

gsap.registerPlugin(ScrollTrigger);

export default function BestSellers() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { addToCart, setSelectedProduct } = useStore();

  const bestSellers = products.filter(
    (p) => p.id === 'home-kit-2026' || p.id === 'mercurial' || p.id === 'predator'
  );

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !headline || cards.length === 0) return;

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
        headline,
        { x: '-30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      cards.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          { x: '50vw', opacity: 0, rotateZ: i === 0 ? 6 : i === 1 ? -3 : 4 },
          { x: 0, opacity: 1, rotateZ: 0, ease: 'none' },
          0.08 + i * 0.04
        );
      });

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headline,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      cards.forEach((card, i) => {
        scrollTl.fromTo(
          card,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.72 + i * 0.02
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="boots"
      className="relative w-full h-screen overflow-hidden z-[70] bg-[#070B14]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070B14] via-[#0F172A] to-[#070B14]" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#00E676]/5 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row h-full gap-8 lg:gap-12">
          {/* Left Side - Headline */}
          <div
            ref={headlineRef}
            className="w-full lg:w-[35%] flex flex-col justify-center"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-none">
              BEST
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00E676]">
                SELLERS
              </span>
            </h2>
            <p className="mt-4 text-white/60 text-lg">
              The kits everyone's wearing right now.
            </p>
            <motion.a
              href="#equipment"
              className="inline-flex items-center gap-2 mt-6 text-[#00F0FF] hover:text-[#00F0FF]/80 transition-colors group"
              whileHover={{ x: 5 }}
            >
              <span className="font-medium">Shop Best Sellers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Right Side - Stacked Cards */}
          <div className="w-full lg:w-[65%] relative">
            <div className="relative h-full">
              {bestSellers.map((product, index) => (
                <motion.div
                  key={product.id}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className={`absolute w-full max-w-[380px] ${
                    index === 0
                      ? 'top-0 right-0 lg:right-0'
                      : index === 1
                      ? 'top-[30%] right-[10%] lg:right-[15%]'
                      : 'top-[60%] right-[5%] lg:right-[8%]'
                  }`}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="bg-[#0F172A] border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:border-[#00F0FF]/30 transition-all duration-300"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="flex">
                      {/* Image */}
                      <div className="w-2/5 relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Content */}
                      <div className="w-3/5 p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-[#00F0FF] text-xs font-mono tracking-wider">
                            #{index + 1} BEST SELLER
                          </span>
                          <h3 className="text-white font-semibold text-lg mt-1">
                            {product.name}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-[#00F0FF] font-bold text-xl">
                            रू {product.price}
                          </span>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="p-2 bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-full text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#070B14] transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}