import { motion } from 'framer-motion';
import { Ruler, Truck, RotateCcw } from 'lucide-react';

const sizeChart = [
  { size: 'S', chest: '36-38"', waist: '30-32"' },
  { size: 'M', chest: '38-40"', waist: '32-34"' },
  { size: 'L', chest: '40-42"', waist: '34-36"' },
  { size: 'XL', chest: '42-44"', waist: '36-38"' },
  { size: 'XXL', chest: '44-46"', waist: '38-40"' },
];

export default function SizeGuide() {
  return (
    <section id="equipment" className="relative w-full py-20 lg:py-32 bg-[#0F172A] z-[110]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B14] via-[#0F172A] to-[#070B14]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              FIT &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00E676]">
                {' '}
                DELIVERY
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Size Guide */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00F0FF]/10 rounded-lg flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-[#00F0FF]" />
                </div>
                <h3 className="text-xl font-bold text-white">Size Guide</h3>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="px-4 py-3 text-left text-white/60 text-sm font-medium">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left text-white/60 text-sm font-medium">
                        Chest
                      </th>
                      <th className="px-4 py-3 text-left text-white/60 text-sm font-medium">
                        Waist
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.map((row, index) => (
                      <tr
                        key={row.size}
                        className={`border-t border-white/5 ${
                          index % 2 === 0 ? 'bg-white/5' : ''
                        }`}
                      >
                        <td className="px-4 py-3 text-white font-medium">
                          {row.size}
                        </td>
                        <td className="px-4 py-3 text-white/70">{row.chest}</td>
                        <td className="px-4 py-3 text-white/70">{row.waist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Shipping Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00F0FF]/10 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#00F0FF]" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Shipping & Returns
                </h3>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#00E676]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-[#00E676]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      Free Shipping
                    </h4>
                    <p className="text-white/60 text-sm">
Free shipping on all orders over रू 13,300. Standard delivery
                      3-5 business days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#00F0FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RotateCcw className="w-4 h-4 text-[#00F0FF]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      30-Day Returns
                    </h4>
                    <p className="text-white/60 text-sm">
                      Not satisfied? Return within 30 days for a full refund.
                      No questions asked.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#00E676]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#00E676] text-xs font-bold">24H</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      Express Delivery
                    </h4>
                    <p className="text-white/60 text-sm">
                      Need it faster? Choose express delivery at checkout for
                      1-2 business days.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}