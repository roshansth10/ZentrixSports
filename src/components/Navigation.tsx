import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore, searchProducts, products, type Product } from '../store/useStore';

const megaMenuData = {
  europe: [
    { name: 'England', country: 'England' },
    { name: 'France', country: 'France' },
    { name: 'Germany', country: 'Germany' },
    { name: 'Spain', country: 'Spain' },
    { name: 'Portugal', country: 'Portugal' },
    { name: 'Croatia', country: 'Croatia' },
  ],
  americas: [
    { name: 'Argentina', country: 'Argentina' },
    { name: 'Brazil', country: 'Brazil' },
    { name: 'Uruguay', country: 'Uruguay' },
    { name: 'Colombia', country: 'Colombia' },
    { name: 'USA', country: 'USA' },
    { name: 'Mexico', country: 'Mexico' },
    { name: 'Canada', country: 'Canada' },
  ],
  asia: [
    { name: 'Nepal', country: 'Nepal' },
    { name: 'Japan', country: 'Japan' },
    { name: 'South Korea', country: 'South Korea' },
    { name: 'Saudi Arabia', country: 'Saudi Arabia' },
    { name: 'Iran', country: 'Iran' },
  ],
  africa: [
    { name: 'Morocco', country: 'Morocco' },
    { name: 'Senegal', country: 'Senegal' },
    { name: 'Nigeria', country: 'Nigeria' },
    { name: 'Ghana', country: 'Ghana' },
  ],
};

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Football Jerseys', href: '/jerseys', isMega: true },
  { name: 'Boots', href: '/boots' },
  { name: 'Equipment & Gear', href: '/equipment' },
  { name: 'Offers & Combos', href: '/offers' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<string>('Nepal');

  const location = useLocation();
  const navigate = useNavigate();

  const { openCart, getCartCount, setSearchResults, setSelectedProduct, setFilter } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const results = searchProducts(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleCountryClick = (country: string) => {
    setFilter('country', country);
    navigate('/jerseys');
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const previewProduct: Product | undefined =
    products.find(p => p.country === hoveredCountry && p.kitType === 'home') ||
    products.find(p => p.country === hoveredCountry);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-md' : 'bg-white/90 backdrop-blur-sm border-b border-slate-100'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/images/logo/ZENTRIX_Logo.png"
                alt="Zentrix Sports Nepal"
                className="h-12 sm:h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => link.isMega && setIsMegaMenuOpen(true)}
                    onMouseLeave={() => link.isMega && setIsMegaMenuOpen(false)}
                  >
                    <Link
                      to={link.href}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-bold transition-all rounded-lg ${
                        isActive
                          ? 'text-[#3B82F6] bg-blue-50/80 shadow-xs'
                          : 'text-slate-700 hover:text-[#3B82F6] hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                      {link.isMega && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isMegaMenuOpen ? 'rotate-180 text-[#3B82F6]' : 'text-slate-400 group-hover:text-[#3B82F6]'
                          }`}
                        />
                      )}
                    </Link>

                    {/* Desktop Mega Menu Dropdown */}
                    {link.isMega && isMegaMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[920px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-50 overflow-hidden"
                      >
                        <div className="grid grid-cols-12 gap-6">
                          {/* 4 Country Columns */}
                          <div className="col-span-8 grid grid-cols-4 gap-4">
                            {/* Europe */}
                            <div>
                              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span> Europe
                              </h4>
                              <ul className="space-y-1">
                                {megaMenuData.europe.map((item) => (
                                  <li key={item.country}>
                                    <button
                                      onMouseEnter={() => setHoveredCountry(item.country)}
                                      onClick={() => handleCountryClick(item.country)}
                                      className={`w-full text-left text-xs font-semibold px-2 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                                        hoveredCountry === item.country
                                          ? 'bg-[#3B82F6]/10 text-[#3B82F6]'
                                          : 'text-slate-600 hover:bg-slate-100'
                                      }`}
                                    >
                                      {item.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Americas */}
                            <div>
                              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span> Americas
                              </h4>
                              <ul className="space-y-1">
                                {megaMenuData.americas.map((item) => (
                                  <li key={item.country}>
                                    <button
                                      onMouseEnter={() => setHoveredCountry(item.country)}
                                      onClick={() => handleCountryClick(item.country)}
                                      className={`w-full text-left text-xs font-semibold px-2 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                                        hoveredCountry === item.country
                                          ? 'bg-[#3B82F6]/10 text-[#3B82F6]'
                                          : 'text-slate-600 hover:bg-slate-100'
                                      }`}
                                    >
                                      {item.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Asia */}
                            <div>
                              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#EAB308]"></span> Asia & Local
                              </h4>
                              <ul className="space-y-1">
                                {megaMenuData.asia.map((item) => (
                                  <li key={item.country}>
                                    <button
                                      onMouseEnter={() => setHoveredCountry(item.country)}
                                      onClick={() => handleCountryClick(item.country)}
                                      className={`w-full text-left text-xs font-semibold px-2 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                                        hoveredCountry === item.country
                                          ? 'bg-[#3B82F6]/10 text-[#3B82F6]'
                                          : 'text-slate-600 hover:bg-slate-100'
                                      }`}
                                    >
                                      {item.name}
                                      {item.name === 'Nepal' && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">HOT</span>}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Africa */}
                            <div>
                              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Africa
                              </h4>
                              <ul className="space-y-1">
                                {megaMenuData.africa.map((item) => (
                                  <li key={item.country}>
                                    <button
                                      onMouseEnter={() => setHoveredCountry(item.country)}
                                      onClick={() => handleCountryClick(item.country)}
                                      className={`w-full text-left text-xs font-semibold px-2 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                                        hoveredCountry === item.country
                                          ? 'bg-[#3B82F6]/10 text-[#3B82F6]'
                                          : 'text-slate-600 hover:bg-slate-100'
                                      }`}
                                    >
                                      {item.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Country Live Jersey Preview Card */}
                          <div className="col-span-4 bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-between">
                            {previewProduct ? (
                              <>
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                      {previewProduct.brand} • 2026 Kit
                                    </span>
                                    <span className="text-xs font-bold text-[#3B82F6]">
                                      {previewProduct.country}
                                    </span>
                                  </div>
                                  <div className="aspect-[4/5] overflow-hidden bg-white rounded-lg p-2 border border-slate-100 shadow-xs flex items-center justify-center">
                                    <img
                                      src={previewProduct.image}
                                      alt={previewProduct.name}
                                      className="h-full w-full object-contain hover:scale-105 transition-transform"
                                    />
                                  </div>
                                  <h5 className="mt-3 text-xs font-bold text-slate-800 line-clamp-1">
                                    {previewProduct.name}
                                  </h5>
                                  <p className="text-sm font-extrabold text-[#3B82F6] mt-0.5">
                                    रू {previewProduct.price.toLocaleString()}
                                  </p>
                                </div>

                                <button
                                  onClick={() => handleCountryClick(hoveredCountry)}
                                  className="mt-3 w-full py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                                >
                                  Browse {hoveredCountry} Kits <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs">
                                Hover a country to preview kit
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 text-slate-600 hover:text-[#3B82F6] hover:bg-slate-100 rounded-xl transition-all duration-200"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={openCart}
                className="relative p-2.5 text-slate-600 hover:text-[#3B82F6] hover:bg-slate-100 rounded-xl transition-all duration-200"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#3B82F6] text-white text-[11px] font-extrabold rounded-full flex items-center justify-center shadow"
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2.5 text-slate-600 hover:text-[#3B82F6] hover:bg-slate-100 rounded-xl transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-white border-t border-slate-100 px-6 py-5 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-500/20'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-70" />
                    </Link>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Authentic Gear
                </span>
                <span>Kathmandu, Nayabazar</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Bar Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 lg:top-20 left-0 right-0 z-40 bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl"
          >
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search 2026 jerseys, boots, balls, shinguards or Nepal team gear..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-12 py-3.5 text-slate-800 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all shadow-inner"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {searchQuery && (
                <div className="mt-4 max-h-80 overflow-y-auto space-y-2 divide-y divide-slate-100">
                  {searchProducts(searchQuery).length === 0 ? (
                    <div className="py-6 text-center text-slate-400 text-sm">
                      No products found for "{searchQuery}"
                    </div>
                  ) : (
                    searchProducts(searchQuery).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedProduct(p);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                      >
                        <img src={p.image} alt={p.name} className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-slate-100" />
                        <div className="flex-1">
                          <p className="text-slate-800 font-bold text-xs">{p.name}</p>
                          <p className="text-slate-400 text-[11px] capitalize">{p.category} • {p.brand}</p>
                        </div>
                        <p className="text-[#3B82F6] font-extrabold text-sm">रू {p.price.toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}