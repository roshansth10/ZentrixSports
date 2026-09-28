import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Heart, Filter, X, Check, Search, Sparkles } from 'lucide-react';
import { useStore, products, type Product } from '../store/useStore';

const continents = [
  { id: 'all', name: 'All Continents (22 Teams)' },
  { id: 'asia', name: 'Asia & Nepal (5)' },
  { id: 'europe', name: 'Europe (6)' },
  { id: 'south-america', name: 'South America (4)' },
  { id: 'north-america', name: 'North America (3)' },
  { id: 'africa', name: 'Africa (4)' },
];

const kitTypes = [
  { id: 'all', name: 'All Kits' },
  { id: 'home', name: 'Home Kits' },
  { id: 'away', name: 'Away Kits' },
];

export default function JerseysPage() {
  const { addToCart, setSelectedProduct, filters, setFilter } = useStore();
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [selectedKitType, setSelectedKitType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  // Filter national team jerseys
  const nationalJerseys = useMemo(() => {
    return products.filter((p) => p.category === 'jerseys' && p.subcategory === 'national');
  }, []);

  const filteredProducts = useMemo(() => {
    let list = nationalJerseys.filter((product) => {
      // Direct country filter override
      if (filters.country && product.country !== filters.country) return false;

      // Continent filter
      if (selectedContinent !== 'all') {
        if (selectedContinent === 'south-america' || selectedContinent === 'north-america') {
          if (product.continent !== 'south-america' && product.continent !== 'north-america') return false;
        } else if (product.continent !== selectedContinent) {
          return false;
        }
      }

      // Kit type filter
      if (selectedKitType !== 'all' && product.kitType !== selectedKitType) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCountry = product.country?.toLowerCase().includes(q);
        const matchesTeam = product.team?.toLowerCase().includes(q);
        if (!matchesName && !matchesCountry && !matchesTeam) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-low') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [nationalJerseys, selectedContinent, selectedKitType, searchQuery, sortBy, filters.country]);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 'M');
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Page Header Banner */}
      <div className="w-full bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 xl:px-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
              <span className="text-[#3B82F6] text-xs font-black uppercase tracking-widest">
                Official 2026 World Collection
              </span>
            </div>
            <h1 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              National Team Kits
            </h1>
            <p className="mt-2 text-slate-300 text-sm max-w-xl">
              Authentic Home & Away kits for 22 national teams including Nepal&apos;s ANFA national jersey. In stock and delivered across Nepal in NPR.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-slate-400 font-bold uppercase">Total Kits</p>
              <p className="text-2xl font-black text-[#3B82F6]">{nationalJerseys.length} Kits</p>
            </div>
            <div className="h-10 w-[1px] bg-slate-800" />
            <div className="text-right">
              <p className="text-xs text-slate-400 font-bold uppercase">Express Delivery</p>
              <p className="text-sm font-bold text-emerald-400">Kathmandu 24h</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-8 max-w-7xl mx-auto">
        {/* Toolbar & Filter Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-8 space-y-4">
          {/* Top Bar: Search and Sort */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by country or team (e.g. Nepal, Argentina, Brazil)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Country: A to Z</option>
              </select>
            </div>
          </div>

          {/* Bottom Bar: Continents and Kit Type chips */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-4 border-t border-slate-100">
            {/* Continents */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Region:</span>
              {continents.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedContinent(c.id);
                    setFilter('country', null);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    selectedContinent === c.id && !filters.country
                      ? 'bg-[#3B82F6] text-white shadow-md shadow-[#3B82F6]/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Kit Type */}
            <div className="flex items-center gap-1.5">
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

          {/* Active Filter Badge */}
          {filters.country && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-[#3B82F6] w-fit">
              Active Country: {filters.country}
              <button
                onClick={() => setFilter('country', null)}
                className="p-0.5 hover:bg-blue-100 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200">
            <p className="text-slate-400 font-bold text-lg">No jerseys found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedContinent('all');
                setSelectedKitType('all');
                setSearchQuery('');
                setFilter('country', null);
              }}
              className="mt-4 px-6 py-2.5 bg-[#3B82F6] text-white text-xs font-bold rounded-xl shadow"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const isAdded = addedIds.includes(product.id);

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#3B82F6]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Card Media Stage */}
                  <div className="relative aspect-[3/4] bg-[#F8FAFC] overflow-hidden p-6 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Brand / Kit Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
                      <span className="px-2.5 py-0.5 bg-white/95 backdrop-blur text-[10px] font-extrabold uppercase text-slate-700 rounded-md shadow-sm">
                        {product.brand || 'Official'}
                      </span>
                      {product.kitType && (
                        <span className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-md shadow-sm ${
                          product.kitType === 'home'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-900 text-white'
                        }`}>
                          {product.kitType}
                        </span>
                      )}
                    </div>

                    {/* Country Badge */}
                    <div className="absolute top-3.5 right-3.5">
                      <span className="px-2.5 py-0.5 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold rounded-md">
                        {product.country}
                      </span>
                    </div>

                    {/* Hover Quick Action Buttons */}
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-lg ${
                          isAdded
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#3B82F6] hover:bg-[#2563EB] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" /> Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" /> Quick Add
                          </>
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="p-2.5 bg-white text-slate-700 hover:text-[#3B82F6] rounded-xl shadow-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span className="font-semibold uppercase tracking-wider">{product.season} Edition</span>
                        {product.sizes && (
                          <span className="font-medium text-[11px] text-slate-500">{product.sizes.join(' ')}</span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 group-hover:text-[#3B82F6] transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Retail Price (NPR)</span>
                        <span className="text-lg font-black text-[#3B82F6]">
                          रू {product.price.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        In Stock
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
