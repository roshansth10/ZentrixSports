import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Sparkles, Check, Gift, Tag, Clock } from 'lucide-react';
import { useStore, products, type Product } from '../store/useStore';

export default function OffersPage() {
  const { addToCart, setSelectedProduct } = useStore();
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const offers = useMemo(() => {
    return products.filter((p) => p.category === 'offers');
  }, []);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      {/* Offers Hero Banner */}
      <div className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-14 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/20 backdrop-blur rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <Gift className="w-4 h-4" /> Nepal Exclusive Tournament Combos
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              Special Deals & Team Bundles
            </h1>
            <p className="mt-2 text-white/90 text-sm max-w-xl">
              Save up to रू 9,000 on squad bundles, matchday combos, and training kits. Free express shipping anywhere in Nepal on all bundle packages!
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur border border-white/20 p-4 rounded-2xl flex items-center gap-4">
            <div>
              <p className="text-xs text-white/80 font-bold uppercase">Active Deals</p>
              <p className="text-2xl font-black text-white">{offers.length} Combos</p>
            </div>
            <div className="h-10 w-[1px] bg-white/20" />
            <div>
              <p className="text-xs text-white/80 font-bold uppercase">Promo Delivery</p>
              <p className="text-sm font-bold text-amber-200">100% FREE</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-10 max-w-7xl mx-auto">
        {/* Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => {
            const isAdded = addedIds[offer.id as any];
            const discountAmount = offer.originalPrice ? offer.originalPrice - offer.price : 0;

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedProduct(offer)}
                className="group bg-white rounded-3xl overflow-hidden border-2 border-amber-200/80 hover:border-amber-500 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
              >
                {/* Discount Tag */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-black uppercase rounded-full shadow-md">
                    {offer.badge}
                  </span>
                </div>

                {/* Media Image */}
                <div className="relative aspect-[16/10] bg-slate-900 p-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.name}
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black uppercase rounded">
                      Tournament Grade
                    </span>
                  </div>
                </div>

                {/* Info & Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                      {offer.name}
                    </h3>
                    <p className="mt-2 text-slate-600 text-xs leading-relaxed">
                      {offer.description}
                    </p>

                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs font-bold text-amber-900">
                      <span>Instant Nepal Savings:</span>
                      <span className="text-red-600 font-extrabold">Save रू {discountAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      {offer.originalPrice && (
                        <span className="text-xs text-slate-400 line-through block">
                          रू {offer.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-2xl font-black text-slate-900">
                        रू {offer.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(offer, e)}
                      className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" /> Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" /> Claim Offer
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
