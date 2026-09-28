import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Zap, Check, ShieldCheck, HelpCircle } from 'lucide-react';
import { useStore, products, type Product } from '../store/useStore';

export default function BootsPage() {
  const { addToCart, setSelectedProduct } = useStore();
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedGround, setSelectedGround] = useState('all');
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [id: string]: string }>({});

  const allBoots = useMemo(() => {
    return products.filter((p) => p.category === 'boots');
  }, []);

  const filteredBoots = useMemo(() => {
    return allBoots.filter((b) => {
      if (selectedBrand !== 'all' && b.brand !== selectedBrand) return false;
      if (selectedGround !== 'all' && b.groundType && !b.groundType.includes(selectedGround)) return false;
      return true;
    });
  }, [allBoots, selectedBrand, selectedGround]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const size = selectedSizes[product.id] || (product.sizes ? product.sizes[0] : '8');
    addToCart(product, size);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Boots Header */}
      <div className="w-full bg-slate-950 text-white py-14 px-4 sm:px-6 lg:px-8 xl:px-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">
                Pro Footwear Division
              </span>
            </div>
            <h1 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Football Boots & Futsal Shoes
            </h1>
            <p className="mt-2 text-slate-300 text-sm max-w-xl">
              Engineered for natural grass pitches and Nepal&apos;s demanding artificial turf courts. Featuring Air Zoom, Strikeskin, and FUZIONFIT360 innovations.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Boots in Stock</p>
              <p className="text-2xl font-black text-emerald-400">{allBoots.length} Models</p>
            </div>
            <div className="h-10 w-[1px] bg-slate-800" />
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Sizing Help</p>
              <p className="text-sm font-bold text-white">UK / US Available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-8 max-w-7xl mx-auto">
        {/* Filter Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Brand Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Brand:</span>
            {['all', 'Nike', 'Adidas', 'Puma'].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedBrand === b
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {b === 'all' ? 'All Brands' : b}
              </button>
            ))}
          </div>

          {/* Ground Type Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Surface:</span>
            {[
              { id: 'all', label: 'All Grounds' },
              { id: 'FG', label: 'Firm Ground (FG)' },
              { id: 'AG', label: 'Artificial Turf (AG)' },
              { id: 'IC', label: 'Indoor Futsal (IC)' },
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGround(g.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedGround === g.id
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Boots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBoots.map((boot) => {
            const isAdded = addedIds[boot.id as any];
            const currentSelectedSize = selectedSizes[boot.id] || (boot.sizes ? boot.sizes[0] : '8');

            return (
              <motion.div
                key={boot.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedProduct(boot)}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Image Stage */}
                <div className="relative aspect-[4/3] bg-[#F8FAFC] p-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={boot.image}
                    alt={boot.name}
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  <div className="absolute top-3.5 left-3.5 flex flex-col gap-1">
                    {boot.badge && (
                      <span className="px-2.5 py-0.5 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-md shadow-sm">
                        {boot.badge}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 bg-slate-900/80 text-white text-[10px] font-bold rounded-md">
                      {boot.brand}
                    </span>
                  </div>

                  {boot.groundType && (
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-0.5 bg-white/95 text-slate-800 text-[10px] font-bold rounded-md border border-slate-200 shadow-sm">
                        {boot.groundType}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors line-clamp-1">
                      {boot.name}
                    </h3>
                    <p className="mt-2 text-slate-500 text-xs leading-relaxed line-clamp-2">
                      {boot.description}
                    </p>

                    {/* Size Selector */}
                    {boot.sizes && (
                      <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Select Size (UK):
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {boot.sizes.map((s) => (
                            <button
                              key={s}
                              onClick={() => setSelectedSizes((prev) => ({ ...prev, [boot.id]: s }))}
                              className={`w-9 h-8 rounded-lg text-xs font-bold transition-colors border ${
                                currentSelectedSize === s
                                  ? 'bg-slate-900 text-white border-slate-900'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing & Add */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      {boot.originalPrice && (
                        <span className="text-xs text-slate-400 line-through block">
                          रू {boot.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-xl font-black text-slate-900">
                        रू {boot.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(boot, e)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-900 hover:bg-emerald-600 text-white'
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

        {/* Sizing & Ground Guide Callout */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Nepal Turf Stud Recommendations</h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                For synthetic futsal turfs in Kathmandu and Pokhara, we recommend AG (Artificial Grass) or IC flat soles to protect knee joints.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-50 text-[#3B82F6] rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">100% Genuine Retail Warranty</h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                All boots are verified authentic from Nike, Adidas & Puma regional hubs. No replicas or counterfeit pairs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Size Exchange Guarantee</h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Not sure about your boot fit? We offer easy 7-day size swaps within Kathmandu Valley and across major Nepal cities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
