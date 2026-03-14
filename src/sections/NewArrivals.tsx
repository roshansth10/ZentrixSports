import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { useStore, products } from '../store/useStore';

gsap.registerPlugin(ScrollTrigger);

export default function NewArrivals() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const { addToCart, setSelectedProduct } = useStore();

  const newArrivals = products.filter(
    (p) =>
      p.id === 'goalkeeper-gloves' ||
      p.id === 'compression-base' ||
      p.id === 'training-ball' ||
      p.id === 'stadium-jacket'
  );

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const rail = railRef.current;

    if (!section || !title || !rail) return;

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
      scrollTl.fromTo(
        title,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        rail,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // SETTLE (30% - 70%) - horizontal scroll
      scrollTl.fromTo(
        rail.querySelector('.rail-inner'),
        { x: 0 },
        { x: '-40vw', ease: 'none' },
        0.3
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        title,
        { opacity: 1, x: 0 },
        { opacity: 0, x: '-10vw', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rail,
        { opacity: 1, x: 0 },
        { opacity: 0, x: '10vw', ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="new-arrivals"
      className="relative w-full h-screen overflow-hidden z-50 bg-[#070B14]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#070B14]" />
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/hero/hero-tunnel.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/80 to-[#070B14]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Title Block */}
            <div
              ref={titleRef}
              className="w-full lg:w-[25%] text-center lg:text-left"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                NEW
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00E676]">
                  ARRIVALS
                </span>
              </h2>
              <p className="mt-4 text-white/60">
                Fresh drops, limited quantities.
              </p>
              <motion.a
                href="#worldcup"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
              >
                Shop All New
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>

            {/* Horizontal Rail */}
            <div
              ref={railRef}
              className="w-full lg:w-[75%] overflow-hidden"
            >
              <div className="rail-inner flex gap-6">
                {newArrivals.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="flex-shrink-0 w-[280px] sm:w-[300px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className="bg-[#0F172A]/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:border-[#00F0FF]/30 transition-all duration-300"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-[#00F0FF] text-[#070B14] text-xs font-bold rounded-full">
                            NEW
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-white font-semibold">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between mt-3">
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}