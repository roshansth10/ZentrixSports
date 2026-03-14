import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { useStore, products } from '../store/useStore';

gsap.registerPlugin(ScrollTrigger);

export default function WorldCup() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { addToCart, setSelectedProduct } = useStore();

  const worldCupProducts = products.filter(
    (p) => p.team && ['Argentina', 'Brazil', 'France', 'England'].includes(p.team)
  );

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    const list = listRef.current;

    if (!section || !media || !content || !list) return;

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
        media,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        content,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );

      const listItems = list.querySelectorAll('.list-item');
      listItems.forEach((item, i) => {
        scrollTl.fromTo(
          item,
          { x: '20vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.12 + i * 0.045
        );
      });

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        media,
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 1.03, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        content,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-6vh', ease: 'power2.in' },
        0.72
      );

      listItems.forEach((item, i) => {
        scrollTl.fromTo(
          item,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.74 + i * 0.02
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="worldcup"
      className="relative w-full h-screen overflow-hidden z-[60] bg-[#070B14]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#070B14]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 h-full">
          {/* Left Media Card */}
          <div
            ref={mediaRef}
            className="w-full lg:w-[45%] h-[40vh] lg:h-[76vh] relative"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              <img
                src="/images/worldcup/player-ball.jpg"
                alt="World Cup 2026"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />

              {/* Tag */}
              <div className="absolute bottom-6 left-6">
                <span className="px-4 py-2 bg-[#00F0FF]/20 backdrop-blur-md border border-[#00F0FF]/30 rounded-full text-[#00F0FF] text-xs font-mono tracking-widest">
                  OFFICIAL LICENSED
                </span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[50%] flex flex-col justify-center">
            <div ref={contentRef}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight">
                WORLD CUP
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00E676]">
                  2026
                </span>
              </h2>
            </div>

            {/* Product List */}
            <div ref={listRef} className="mt-8 space-y-4">
              {worldCupProducts.map((product) => (
                <div
                  key={product.id}
                  className="list-item flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#00F0FF]/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-white font-medium group-hover:text-[#00F0FF] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-white/50 text-sm">{product.team}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[#00F0FF] font-bold">
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
              ))}
            </div>

            <motion.a
              href="#boots"
              className="inline-flex items-center gap-2 mt-8 text-[#00F0FF] hover:text-[#00F0FF]/80 transition-colors group"
              whileHover={{ x: 5 }}
            >
              <span className="font-medium">Explore World Cup Gear</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}