import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Check, ChevronLeft, ChevronRight, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { useStore, type Product } from '../store/useStore';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
    setSelectedSize('');
  }, [product]);

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize || (product.sizes ? product.sizes[0] : 'M'));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const images = [
    product.image,
    product.modelImage,
    product.backImage
  ].filter((img): img is string => Boolean(img));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-3 sm:inset-6 md:inset-10 lg:inset-14 bg-white rounded-3xl z-50 overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-slate-100"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur rounded-full text-slate-500 hover:text-slate-800 hover:bg-white transition-colors shadow-md border border-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Gallery Column */}
            <div className="w-full lg:w-1/2 bg-[#F8FAFC] flex flex-col justify-between p-6 lg:p-10 relative border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="flex-1 flex items-center justify-center relative min-h-[280px]">
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="max-h-[35vh] lg:max-h-[52vh] object-contain drop-shadow-md rounded-xl transition-all duration-300"
                />

                {/* Arrow Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-2 p-2.5 bg-white/90 backdrop-blur rounded-full text-slate-700 hover:text-[#3B82F6] shadow-md transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-2 p-2.5 bg-white/90 backdrop-blur rounded-full text-slate-700 hover:text-[#3B82F6] shadow-md transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {images.length > 1 && (
                <div className="flex justify-center gap-3 mt-4">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all p-1 bg-white ${
                        index === currentImageIndex ? 'border-[#3B82F6] shadow-sm' : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Purchase Column */}
            <div className="w-full lg:w-1/2 p-6 lg:p-10 overflow-y-auto flex flex-col justify-between">
              <div>
                {/* Brand & Category badges */}
                <div className="flex items-center gap-2">
                  <span className="inline-block px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-bold uppercase tracking-wider rounded-md">
                    {product.brand || 'Zentrix'}
                  </span>
                  {product.country && (
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">
                      {product.country} National Team
                    </span>
                  )}
                  {product.kitType && (
                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider rounded-md">
                      {product.kitType} Kit
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="mt-4 text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight">
                  {product.name}
                </h2>

                {/* Price */}
                <p className="mt-3 text-3xl font-black text-[#3B82F6]">
                  रू {product.price.toLocaleString()}
                </p>

                {/* Description */}
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Specification Table */}
                <div className="mt-6 space-y-2 text-xs">
                  {product.team && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-400 font-medium">Team</span>
                      <span className="text-slate-800 font-bold">{product.team}</span>
                    </div>
                  )}
                  {product.season && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-400 font-medium">Season / Year</span>
                      <span className="text-slate-800 font-bold">{product.season}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Authenticity</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Authentic Guaranteed
                    </span>
                  </div>
                </div>

                {/* Size Selector */}
                {product.sizes && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Select Size</label>
                      <span className="text-xs text-[#3B82F6] font-semibold cursor-pointer hover:underline">Size Guide</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 rounded-xl font-bold text-sm transition-all duration-200 border ${
                            selectedSize === size
                              ? 'bg-[#3B82F6] text-white border-[#3B82F6] shadow-lg shadow-[#3B82F6]/25'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons & Badges */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold transition-all duration-300 shadow-md ${
                    addedToCart
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-[#3B82F6]/20'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </motion.button>

                {/* Guarantees */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <Truck className="w-4 h-4 text-[#3B82F6]" />
                    <div>
                      <p className="font-bold text-slate-800 text-xs">Fast Nepal Delivery</p>
                      <p className="text-[10px] text-slate-400">Dispatch in 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <RotateCcw className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-800 text-xs">Easy Returns</p>
                      <p className="text-[10px] text-slate-400">7-day return policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}