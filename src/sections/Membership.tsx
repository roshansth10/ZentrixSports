import { motion } from 'framer-motion';
import { Zap, Truck, Star, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Early Drops',
    description: 'Get access to new releases 24 hours before everyone else.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Unlimited free shipping on all orders over रू 6,700.',
  },
  {
    icon: Star,
    title: 'Exclusive Edits',
    description: 'Members-only products and limited edition drops.',
  },
];

export default function Membership() {
  return (
    <section className="relative w-full py-20 lg:py-32 bg-[#0F172A] z-[80]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B14] via-[#0F172A] to-[#070B14]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F0FF]/5 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-full text-[#00F0FF] text-xs font-mono tracking-widest uppercase mb-6"
          >
            Membership
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            JOIN THE
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00E676]">
              {' '}
              CLUB
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/60 text-lg max-w-xl mx-auto"
          >
            Get early access to drops, member-only discounts, and priority sizing.
          </motion.p>

          {/* Benefits Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#00F0FF]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#00F0FF]/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[#00F0FF]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/50 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-[#00F0FF] text-[#070B14] font-semibold rounded-full hover:bg-[#00F0FF]/90 transition-all duration-300 group"
          >
            Become a Member
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}