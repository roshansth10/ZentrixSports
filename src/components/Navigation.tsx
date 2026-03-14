import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useStore, searchProducts, products } from '../store/useStore';

const navLinks = [
  { name: 'Home', href: '#' },
  { 
    name: 'Football Jerseys', 
    href: '#jerseys',
    megaMenu: {
      europe: ['England', 'France', 'Germany', 'Spain', 'Portugal', 'Netherlands', 'Croatia'],
      southAmerica: ['Argentina', 'Brazil', 'Uruguay', 'Colombia', 'Chile'],
      northAmerica: ['USA', 'Mexico', 'Canada'],
      asia: ['Japan', 'South Korea', 'Saudi Arabia', 'Iran'],
      africa: ['Morocco', 'Senegal', 'Nigeria', 'Ghana'],
    }
  },
  { name: 'Boots', href: '#boots' },
  { name: 'Equipment', href: '#equipment' },
  { name: 'Kids', href: '#kids' },
  { name: 'Men', href: '#men' },
  { name: 'Women', href: '#women' },
  { name: 'Offers', href: '#offers' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const { openCart, getCartCount, setSearchResults, setSelectedProduct } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const product = products.find(p => p.country === country);
    if (product) {
      setSelectedProduct(product);
    }
    setActiveMegaMenu(null);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center space-x-2"
            >
              <img
                src="/images/logo/ZENTRIX_Logo.png"
                alt="Zentrix Sports Logo"
                className="h-16 w-auto object-contain"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => link.megaMenu && setActiveMegaMenu(link.name)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#3B82F6] transition-colors duration-200 rounded-lg hover:bg-slate-50"
                  >
                    {link.name}
                    {link.megaMenu && <ChevronDown className="w-4 h-4" />}
                  </a>

                  {/* Mega Menu */}
                  {link.megaMenu && activeMegaMenu === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-[700px] bg-white rounded-2xl shadow-xl border border-slate-100 p-6 z-50"
                    >
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Europe</h4>
                          <ul className="space-y-2">
                            {link.megaMenu.europe.map((country) => (
                              <li key={country}>
                                <button
                                  onClick={() => handleCountryClick(country)}
                                  className="text-sm text-slate-600 hover:text-[#3B82F6] transition-colors"
                                >
                                  {country}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Americas</h4>
                          <ul className="space-y-2">
                            {link.megaMenu.southAmerica.map((country) => (
                              <li key={country}>
                                <button
                                  onClick={() => handleCountryClick(country)}
                                  className="text-sm text-slate-600 hover:text-[#3B82F6] transition-colors"
                                >
                                  {country}
                                </button>
                              </li>
                            ))}
                          </ul>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 mt-4">North America</h4>
                          <ul className="space-y-2">
                            {link.megaMenu.northAmerica.map((country) => (
                              <li key={country}>
                                <button
                                  onClick={() => handleCountryClick(country)}
                                  className="text-sm text-slate-600 hover:text-[#3B82F6] transition-colors"
                                >
                                  {country}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Asia</h4>
                          <ul className="space-y-2">
                            {link.megaMenu.asia.map((country) => (
                              <li key={country}>
                                <button
                                  onClick={() => handleCountryClick(country)}
                                  className="text-sm text-slate-600 hover:text-[#3B82F6] transition-colors"
                                >
                                  {country}
                                </button>
                              </li>
                            ))}
                          </ul>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 mt-4">Africa</h4>
                          <ul className="space-y-2">
                            {link.megaMenu.africa.map((country) => (
                              <li key={country}>
                                <button
                                  onClick={() => handleCountryClick(country)}
                                  className="text-sm text-slate-600 hover:text-[#3B82F6] transition-colors"
                                >
                                  {country}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 text-slate-500 hover:text-[#3B82F6] hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2.5 text-slate-500 hover:text-[#3B82F6] hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#3B82F6] text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2.5 text-slate-500 hover:text-[#3B82F6] hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 lg:top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-lg"
          >
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search jerseys, boots, equipment..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-12 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-2xl mx-auto mt-4 max-h-64 overflow-y-auto"
                >
                  {searchProducts(searchQuery).length > 0 ? (
                    <div className="space-y-2">
                      {searchProducts(searchQuery).map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center space-x-4 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="text-slate-700 font-medium">{product.name}</p>
                            <p className="text-[#3B82F6] font-semibold">रू {product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-center py-4">No products found</p>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl">
              <div className="p-6 pt-20">
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-slate-600 hover:text-[#3B82F6] hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}