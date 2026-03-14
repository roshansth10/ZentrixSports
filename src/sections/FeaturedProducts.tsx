import { motion } from 'framer-motion';
import { ShoppingCart, Eye, ArrowRight } from 'lucide-react';
import { useStore, products } from '../store/useStore';

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

export default function FeaturedProducts() {
  const { addToCart, setSelectedProduct } = useStore();

  const featuredProducts = products.slice(0, 4);

  return (
    <section id="jerseys" className="relative w-full py-20 lg:py-28 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-[#3B82F6] text-sm font-semibold uppercase tracking-wider">Featured</span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
              Trending Now
            </h2>
            <p className="mt-2 text-slate-500">Most popular jerseys this week</p>
          </div>
          <motion.a
            href="#worldcup"
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-[#3B82F6] font-semibold hover:underline"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group"
            >
              <div className="product-card relative">
                {/* Image */}
                <div 
                  className="relative aspect-[3/4] overflow-hidden bg-slate-50 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {/* Quick Actions */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-slate-700 font-medium rounded-xl shadow-lg hover:bg-[#3B82F6] hover:text-white transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </motion.button>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 flex items-center justify-center bg-white text-slate-700 rounded-xl shadow-lg hover:bg-[#3B82F6] hover:text-white transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Badge */}
                  {product.brand && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-semibold text-slate-600 rounded-full">
                        {product.brand}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">{product.season}</p>
                  <h3 className="mt-1 text-slate-700 font-semibold line-clamp-1 group-hover:text-[#3B82F6] transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#3B82F6]">रू {product.price}</span>
                    {product.sizes && (
                      <span className="text-xs text-slate-400">{product.sizes.length} sizes</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}