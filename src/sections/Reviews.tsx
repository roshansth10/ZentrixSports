import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Alex M.',
    location: 'London, UK',
    rating: 5,
    text: 'The fit is incredible—feels like a second skin. Best jersey I have ever worn. The quality is top notch!',
    product: 'England Home Jersey',
    avatar: 'AM',
  },
  {
    name: 'Carlos R.',
    location: 'Madrid, Spain',
    rating: 5,
    text: 'Fast shipping and amazing customer service. The Real Madrid jersey looks even better in person.',
    product: 'Real Madrid Home Jersey',
    avatar: 'CR',
  },
  {
    name: 'Maria S.',
    location: 'Sao Paulo, Brazil',
    rating: 5,
    text: 'Official merchandise at great prices. The Brazil jersey is perfect for the World Cup!',
    product: 'Brazil Home Jersey',
    avatar: 'MS',
  },
  {
    name: 'John D.',
    location: 'New York, USA',
    rating: 5,
    text: 'The Nike Mercurial boots are amazing. Great traction and very comfortable. Highly recommend!',
    product: 'Nike Mercurial Vapor',
    avatar: 'JD',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Reviews() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-gradient-to-br from-[#F8FAFC] to-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#22C55E] text-sm font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-slate-500 max-w-xl mx-auto">
            Join thousands of satisfied customers who trust Zentrix Sports for their football gear.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-[#3B82F6]/20 mb-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-600 leading-relaxed mb-4">
                "{review.text}"
              </p>

              {/* Product */}
              <p className="text-sm text-[#3B82F6] font-medium mb-4">
                Purchased: {review.product}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#22C55E] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{review.name}</p>
                  <p className="text-sm text-slate-400">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            { value: '50K+', label: 'Happy Customers' },
            { value: '4.9', label: 'Average Rating' },
            { value: '99%', label: 'Would Recommend' },
            { value: '24h', label: 'Fast Shipping' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-[#3B82F6]">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}