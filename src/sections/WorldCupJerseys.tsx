import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Eye, Heart, Filter, X, Check } from 'lucide-react';
import { useStore, products, type Product } from '../store/useStore';

const continents = [
  { id: 'all', name: 'All Continents' },
  { id: 'europe', name: 'Europe (6)' },
  { id: 'south-america', name: 'South America (4)' },
  { id: 'north-america', name: 'North America (3)' },
  { id: 'asia', name: 'Asia & Nepal (5)' },
  { id: 'africa', name: 'Africa (4)' },
];

const kitTypes = [
  { id: 'all', name: 'All Kits' },
  { id: 'home', name: 'Home Kits' },
  { id: 'away', name: 'Away Kits' },
];

export default function WorldCupJerseys() {
  const { addToCart, setSelectedProduct, filters, setFilter } = useStore();
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [selectedKitType, setSelectedKitType] = useState('all');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  // Filter products for National Team Jerseys
  const worldCupProducts = useMemo(() => {
    return products.filter((p) => p.category === 'jerseys' && p.subcategory === 'national');
  }, []);

  const filteredProducts = useMemo(() => {
    return worldCupProducts.filter((product) => {
      // Store filter override (e.g. from navbar country click)
      if (filters.country && product.country !== filters.country) return false;

      if (selectedContinent !== 'all') {
        if (selectedContinent === 'south-america' || selectedContinent === 'north-america') {
          if (product.continent !== 'south-america' && product.continent !== 'north-america') return false;
        } else if (product.continent !== selectedContinent) {
          return false;
        }
      }

      if (selectedKitType !== 'all' && product.kitType !== selectedKitType) {
        return false;
      }

      return true;
    });
  }, [worldCupProducts, selectedContinent, selectedKitType, filters.country]);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  return (
    <section id="jerseys" className="relative w-full py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
              <span className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest">
                2026 Official World Collection
              </span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              National Team Kits
            </h2>
            <p className="mt-2 text-slate-500 text-sm max-w-xl">
              Authentic Home & Away kits for 22 national teams, engineered for high performance and genuine retail quality.
            </p>
          </div>

          {/* Active Country Filter Badge (if navbar selected) */}
          {filters.country && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-[#3B82F6]">
              Filtering by: {filters.country}
              <button
                onClick={() => setFilter('country', null)}
                className="p-1 hover:bg-blue-100 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Filter Toolbar */}
        <div className="mb-10 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Continent Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Continent:</span>
            {continents.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedContinent(c.id);
                  setFilter('country', null);
                }}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedContinent === c.id && !filters.country
                    ? 'bg-[#3B82F6] text-white shadow-md shadow-[#3B82F6]/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Kit Type Toggle */}
          <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Kit:</span>
            {kitTypes.map((k) => (
              <button
                key={k.id}
                onClick={() => setSelectedKitType(k.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedKitType === k.id
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {k.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isAdded = addedIds.includes(product.id);

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
              >
                {/* Product Card Top Image Stage */}
                <div className="relative aspect-[3/4] w-full bg-[#F8FAFC] p-6 flex items-center justify-center overflow-hidden">
                  {/* Clean Kit Graphic/Photo */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur text-[10px] font-extrabold text-slate-700 uppercase tracking-wider rounded-md border border-slate-200 shadow-sm">
                      {product.brand || 'Official'}
                    </span>
                    {product.kitType && (
                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md border shadow-sm ${
                          product.kitType === 'home'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-slate-800 text-white border-slate-800'
                        }`}
                      >
                        {product.kitType}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur transition-all z-10 shadow-sm ${
                      isWishlisted
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-slate-400 hover:text-red-500 hover:bg-white'
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-1.5 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#3B82F6] hover:bg-[#2563EB] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" /> Added!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </>
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl shadow-md border border-slate-200 transition-colors"
                      aria-label="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Metadata & Price Footer */}
                <div className="p-4 bg-white border-t border-slate-100 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                      <span>{product.country} National Team</span>
                      <span>2026</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-[#3B82F6] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="text-base font-extrabold text-[#3B82F6]">
                      रू {product.price.toLocaleString()}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">Authentic</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 mt-6">
            <p className="text-slate-500 font-medium text-sm">No products found matching your current filter.</p>
            <button
              onClick={() => {
                setSelectedContinent('all');
                setSelectedKitType('all');
                setFilter('country', null);
              }}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-[#3B82F6] text-white text-xs font-bold rounded-xl hover:bg-[#2563EB] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}