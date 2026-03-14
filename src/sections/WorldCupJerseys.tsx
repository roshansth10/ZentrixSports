import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Eye, Filter, X } from 'lucide-react';
import { useStore, products } from '../store/useStore';

const continents = [
  { id: 'all', name: 'All' },
  { id: 'europe', name: 'Europe' },
  { id: 'south-america', name: 'South America' },
  { id: 'north-america', name: 'North America' },
  { id: 'asia', name: 'Asia' },
  { id: 'africa', name: 'Africa' },
];

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const priceRanges = [
  { id: 'all', name: 'All Prices', range: [0, 50000] },
  { id: 'under-50', name: 'Under रू 6,700', range: [0, 6700] },
  { id: '50-100', name: 'रू 6,700 - रू 13,300', range: [6700, 13300] },
  { id: 'over-100', name: 'Over रू 13,300', range: [13300, 50000] },
];

export default function WorldCupJerseys() {
  const { addToCart, setSelectedProduct } = useStore();
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get national team jerseys (prices are already in NPR)
  const worldCupProducts = products.filter(
    (p) => p.category === 'jerseys' && p.subcategory === 'national'
  );

  const filteredProducts = worldCupProducts.filter((product) => {
    if (selectedContinent !== 'all' && product.continent !== selectedContinent) return false;
    if (selectedSize && !product.sizes?.includes(selectedSize)) return false;
    const priceRange = priceRanges.find((r) => r.id === selectedPriceRange)?.range;
    if (priceRange && (product.price < priceRange[0] || product.price > priceRange[1])) return false;
    return true;
  });

  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="text-[#22C55E] text-sm font-semibold uppercase tracking-wider">World Cup 2026</span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
            National Team Jerseys
          </h2>
          <p className="mt-2 text-slate-500">Support your country with official jerseys</p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 mb-4"
          >
            <Filter className="w-4 h-4" />
            Filters
            {(selectedContinent !== 'all' || selectedSize || selectedPriceRange !== 'all') && (
              <span className="w-2 h-2 bg-[#3B82F6] rounded-full" />
            )}
          </button>

          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-4"
              >
                {/* Continent Filter */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-slate-400 py-2">Continent:</span>
                  {continents.map((continent) => (
                    <button
                      key={continent.id}
                      onClick={() => setSelectedContinent(continent.id)}
                      className={`filter-chip ${selectedContinent === continent.id ? 'active' : ''}`}
                    >
                      {continent.name}
                    </button>
                  ))}
                </div>

                {/* Size Filter */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-slate-400 py-2">Size:</span>
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                      className={`filter-chip ${selectedSize === size ? 'active' : ''}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Price Filter */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-slate-400 py-2">Price:</span>
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setSelectedPriceRange(range.id)}
                      className={`filter-chip ${selectedPriceRange === range.id ? 'active' : ''}`}
                    >
                      {range.name}
                    </button>
                  ))}
                </div>

                {/* Clear Filters */}
                {(selectedContinent !== 'all' || selectedSize || selectedPriceRange !== 'all') && (
                  <button
                    onClick={() => {
                      setSelectedContinent('all');
                      setSelectedSize(null);
                      setSelectedPriceRange('all');
                    }}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
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

                    {/* Country Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-semibold text-slate-600 rounded-full">
                        {product.country}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-xs text-slate-400 uppercase tracking-wider">{product.season}</p>
                    <h3 className="mt-1 text-slate-700 font-semibold line-clamp-1 group-hover:text-[#3B82F6] transition-colors">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-[#3B82F6]">रू {product.price}</span>
                      <span className="text-xs text-slate-400">{product.brand}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400">No products match your filters</p>
            <button
              onClick={() => {
                setSelectedContinent('all');
                setSelectedSize(null);
                setSelectedPriceRange('all');
              }}
              className="mt-4 text-[#3B82F6] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}