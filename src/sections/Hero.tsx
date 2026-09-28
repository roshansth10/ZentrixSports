import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] bg-slate-950 flex items-center overflow-hidden pt-20">
      {/* Background Image Stage with Nepali Athlete */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/hero-nepal.jpg"
          alt="Nepali athlete in sports apparel with Himalayan backdrop"
          className="w-full h-full object-cover object-center filter brightness-[0.75]"
        />
        {/* Editorial Overlay Gradients for crisp typography readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
        <div className="max-w-2xl">
          {/* Campaign Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex items-center gap-2"
          >
            <span className="px-3 py-1 bg-[#3B82F6] text-white text-xs font-black uppercase tracking-widest rounded-md">
              OFFICIAL 2026 COLLECTION
            </span>
            <span className="text-slate-300 text-xs font-bold tracking-wider uppercase">
              NEPAL & GLOBAL KITS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-none"
          >
            BUILT FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-sky-400">
              THE GAME.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-xl"
          >
            Explore official 2026 Home & Away kits for 22 national teams alongside Nepal&apos;s authentic national team jersey. Delivered directly across Nepal in NPR.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <a
              href="#jerseys"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-[#3B82F6]/30 transition-all"
            >
              SHOP NATIONAL KITS
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#boots"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider rounded-xl backdrop-blur border border-white/20 transition-all"
            >
              EXPLORE BOOTS
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4"
          >
            <div className="flex items-center gap-2.5 text-slate-300">
              <ShieldCheck className="w-5 h-5 text-[#3B82F6] shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">100% Authentic</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Nepal Delivery</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <RefreshCw className="w-5 h-5 text-sky-400 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Easy Returns</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}