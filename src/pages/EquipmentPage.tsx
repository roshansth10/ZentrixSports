import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Package, Check, Phone, ShieldCheck } from 'lucide-react';
import { useStore, products, type Product } from '../store/useStore';

export default function EquipmentPage() {
  const { addToCart, setSelectedProduct } = useStore();
  const [selectedSubcat, setSelectedSubcat] = useState('all');
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const allEquipmentAndApparel = useMemo(() => {
    return products.filter((p) => p.category === 'equipment' || p.category === 'apparel');
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedSubcat === 'all') return allEquipmentAndApparel;
    if (selectedSubcat === 'equipment') return allEquipmentAndApparel.filter((p) => p.category === 'equipment');
    if (selectedSubcat === 'apparel') return allEquipmentAndApparel.filter((p) => p.category === 'apparel');
    if (selectedSubcat === 'balls') return allEquipmentAndApparel.filter((p) => p.id.includes('ball'));
    if (selectedSubcat === 'gloves') return allEquipmentAndApparel.filter((p) => p.id.includes('gloves'));
    return allEquipmentAndApparel;
  }, [allEquipmentAndApparel, selectedSubcat]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes ? product.sizes[0] : undefined);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Page Header */}
      <div className="w-full bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 xl:px-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
              <span className="text-purple-400 text-xs font-black uppercase tracking-widest">
                Training & Matchday Equipment
              </span>
            </div>
            <h1 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Football Gear & Accessories
            </h1>
            <p className="mt-2 text-slate-300 text-sm max-w-xl">
              Professional equipment for players, coaches, goalkeepers, and futsal clubs throughout Nepal. FIFA-spec balls, grip gloves, and training drills.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Gear Available</p>
              <p className="text-2xl font-black text-purple-400">{allEquipmentAndApparel.length} Products</p>
            </div>
            <div className="h-10 w-[1px] bg-slate-800" />
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Academy Orders</p>
              <p className="text-sm font-bold text-white">Bulk Discount</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-8 max-w-7xl mx-auto">
        {/* Filter Navigation */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Category:</span>
          {[
            { id: 'all', label: 'All Equipment & Apparel' },
            { id: 'equipment', label: 'Training Equipment (6)' },
            { id: 'apparel', label: 'Jackets & Apparel (4)' },
            { id: 'balls', label: 'Match Balls' },
            { id: 'gloves', label: 'Goalkeeper Gear' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubcat(tab.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                selectedSubcat === tab.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const isAdded = addedIds[item.id as any];

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedProduct(item)}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-purple-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] bg-[#F8FAFC] p-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  <div className="absolute top-3.5 left-3.5 flex flex-col gap-1">
                    {item.badge && (
                      <span className="px-2.5 py-0.5 bg-purple-600 text-white text-[10px] font-black uppercase rounded-md shadow-sm">
                        {item.badge}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 bg-slate-900/80 text-white text-[10px] font-bold rounded-md">
                      {item.brand}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-purple-600 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-slate-500 text-xs leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    {item.sizes && (
                      <div className="mt-3 flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Sizes:</span>
                        <div className="flex gap-1">
                          {item.sizes.map((s) => (
                            <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      {item.originalPrice && (
                        <span className="text-xs text-slate-400 line-through block">
                          रू {item.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-xl font-black text-slate-900">
                        रू {item.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-900 hover:bg-purple-600 text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" /> Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Futsal & Academy Bulk Order Banner */}
        <div className="mt-16 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold uppercase rounded-md tracking-wider">
              Club & Academy Support
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-3">
              Ordering Gear for your Team or Futsal Court?
            </h3>
            <p className="text-slate-300 text-sm mt-2 max-w-xl">
              We provide wholesale rates, customized kit printing, and scheduled delivery to sports academies, schools, and tournament organizers throughout Nepal.
            </p>
          </div>
          <a
            href="tel:+9779876543210"
            className="px-6 py-3.5 bg-white text-slate-900 hover:bg-purple-400 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow transition-colors flex items-center gap-2 shrink-0"
          >
            <Phone className="w-4 h-4 text-purple-600" />
            Call +977 9876543210
          </a>
        </div>
      </div>
    </div>
  );
}
