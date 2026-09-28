import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Zap, ShoppingBag, Award, Sparkles } from 'lucide-react';
import Hero from '../sections/Hero';
import FeaturedProducts from '../sections/FeaturedProducts';
import Reviews from '../sections/Reviews';
import { products, useStore } from '../store/useStore';

export default function HomePage() {
  const { addToCart, setSelectedProduct } = useStore();

  const bootHighlights = products.filter((p) => p.category === 'boots').slice(0, 3);
  const equipmentHighlights = products.filter((p) => p.category === 'equipment').slice(0, 3);
  const offerHighlights = products.filter((p) => p.category === 'offers').slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Trending / Featured Jerseys */}
      <FeaturedProducts />

      {/* Quick Category Navigation Cards */}
      <section className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#3B82F6] text-xs font-black uppercase tracking-widest px-3 py-1 bg-blue-950/80 border border-blue-800/60 rounded-full">
              Explore Our Gear
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Built for Every Player in Nepal
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Choose your department and gear up with official 2026 World Cup kits, pro boots, and match-grade equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Card 1: National Team Jerseys */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-3xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-xl flex flex-col justify-between min-h-[380px]"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/categories/jerseys-tunnel.jpg"
                  alt="Football Jerseys"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.55]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              </div>

              <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                <div>
                  <span className="px-3 py-1 bg-[#3B82F6] text-white text-[11px] font-bold uppercase tracking-wider rounded-md">
                    22 Nations • 44 Kits
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-black text-white mt-4 leading-tight">
                    Official 2026 Jerseys
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 line-clamp-2">
                    Nepal, Argentina, Brazil, England, France, Germany, Japan & all major national team kits.
                  </p>
                </div>

                <Link
                  to="/jerseys"
                  className="mt-6 inline-flex items-center justify-center gap-2 py-3 px-6 bg-white text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#3B82F6] hover:text-white transition-colors"
                >
                  Explore Jerseys <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Football Boots */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-3xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-xl flex flex-col justify-between min-h-[380px]"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/categories/boots-tunnel.jpg"
                  alt="Football Boots"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.55]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              </div>

              <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                <div>
                  <span className="px-3 py-1 bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-md">
                    FG • AG • Futsal
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-black text-white mt-4 leading-tight">
                    Elite Football Boots
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 line-clamp-2">
                    Nike Mercurial, Adidas Predator, Puma Future & Futsal boots for Nepali turf conditions.
                  </p>
                </div>

                <Link
                  to="/boots"
                  className="mt-6 inline-flex items-center justify-center gap-2 py-3 px-6 bg-white text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-emerald-500 hover:text-white transition-colors"
                >
                  Explore Boots <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Card 3: Training & Equipment */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-3xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-xl flex flex-col justify-between min-h-[380px]"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/categories/equipment-room.jpg"
                  alt="Football Equipment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.55]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              </div>

              <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                <div>
                  <span className="px-3 py-1 bg-purple-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-md">
                    Gear & Accessories
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-black text-white mt-4 leading-tight">
                    Equipment & Training
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 line-clamp-2">
                    Match balls, pro goalkeeper gloves, agility ladders, shin guards & tournament packs.
                  </p>
                </div>

                <Link
                  to="/equipment"
                  className="mt-6 inline-flex items-center justify-center gap-2 py-3 px-6 bg-white text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-purple-500 hover:text-white transition-colors"
                >
                  Explore Equipment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Boots Showcase */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">
                Turf & Grass Specialists
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-1">
                Top Football Boots
              </h2>
            </div>
            <Link
              to="/boots"
              className="text-emerald-600 hover:text-emerald-700 font-bold text-sm flex items-center gap-1.5"
            >
              View All 6+ Boots <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bootHighlights.map((boot) => (
              <div
                key={boot.id}
                onClick={() => setSelectedProduct(boot)}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white p-4 mb-4 flex items-center justify-center">
                    <img
                      src={boot.image}
                      alt={boot.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {boot.badge && (
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
                      {boot.badge}
                    </span>
                  )}
                  <h3 className="font-bold text-slate-900 text-base mt-2 line-clamp-1">{boot.name}</h3>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">{boot.description}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Price in Nepal</span>
                    <p className="text-lg font-black text-slate-900">रू {boot.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(boot, '8');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers & Bundles Banner */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <span className="px-3.5 py-1 bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-full inline-flex items-center gap-1.5 shadow">
              <Sparkles className="w-3.5 h-3.5" /> Nepal Exclusive Tournament Combos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 tracking-tight">
              Futsal Team Kits & Bundle Offers
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Equip your 10-player futsal squad with customized jerseys, GK kits, and match balls at unbeatable bundle prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {offerHighlights.map((offer) => (
              <div
                key={offer.id}
                onClick={() => setSelectedProduct(offer)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/15 transition-all cursor-pointer"
              >
                <div>
                  <span className="px-2.5 py-0.5 bg-amber-400 text-slate-900 text-[10px] font-black rounded-md uppercase">
                    {offer.badge}
                  </span>
                  <h3 className="font-bold text-lg text-white mt-3 line-clamp-2">{offer.name}</h3>
                  <p className="text-slate-300 text-xs mt-2 line-clamp-3">{offer.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 line-through">
                      रू {offer.originalPrice?.toLocaleString()}
                    </span>
                    <p className="text-xl font-extrabold text-amber-300">
                      रू {offer.price.toLocaleString()}
                    </p>
                  </div>
                  <Link
                    to="/offers"
                    className="px-4 py-2 bg-white text-slate-900 hover:bg-amber-400 font-bold text-xs rounded-xl transition-colors"
                  >
                    View Offer
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/offers"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
            >
              See All Tournament Packs & Deals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <Reviews />
    </div>
  );
}
