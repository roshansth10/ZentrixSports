import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Check, ChevronLeft, ChevronRight, Truck, RotateCcw } from 'lucide-react';
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

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const images = [product.image, product.image];

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-16 bg-white rounded-3xl z-50 overflow-hidden flex flex-col lg:flex-row shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur rounded-full text-slate-500 hover:text-slate-700 hover:bg-white transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Section */}
            <div className="w-full lg:w-1/2 bg-slate-50 flex items-center justify-center p-8 relative">
              <motion.div
                className="relative"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ perspective: '1000px' }}
              >
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="max-h-[40vh] lg:max-h-[60vh] object-contain drop-shadow-xl"
                />
              </motion.div>

              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-4 p-3 bg-white/90 backdrop-blur rounded-full text-slate-600 hover:text-[#3B82F6] shadow-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 p-3 bg-white/90 backdrop-blur rounded-full text-slate-600 hover:text-[#3B82F6] shadow-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-[#3B82F6]' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full lg:w-1/2 p-6 lg:p-10 overflow-y-auto">
              {/* Category Tag */}
              <span className="inline-block px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-semibold uppercase tracking-wider rounded-full">
                {product.category}
              </span>

              {/* Title */}
              <h2 className="mt-4 text-2xl lg:text-3xl font-bold text-slate-800">
                {product.name}
              </h2>

              {/* Price */}
              <p className="mt-2 text-3xl font-bold text-[#3B82F6]">
रू {product.price}
              </p>

              {/* Description */}
              <p className="mt-4 text-slate-500 leading-relaxed">
                {product.description}
              </p>

              {/* Details */}
              <div className="mt-6 space-y-2 text-sm">
                {product.team && (
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-400">Team</span>
                    <span className="text-slate-700 font-medium">{product.team}</span>
                  </div>
                )}
                {product.country && (
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-400">Country</span>
                    <span className="text-slate-700 font-medium">{product.country}</span>
                  </div>
                )}
                {product.season && (
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-400">Season</span>
                    <span className="text-slate-700 font-medium">{product.season}</span>
                  </div>
                )}
                {product.brand && (
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-400">Brand</span>
                    <span className="text-slate-700 font-medium">{product.brand}</span>
                  </div>
                )}
              </div>

              {/* Size Selector */}
              {product.sizes && (
                <div className="mt-6">
                  <label className="block text-slate-700 font-medium mb-3">Select Size</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-xl font-medium transition-all duration-200 ${
                          selectedSize === size
                            ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/25'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                disabled={addedToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-8 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  addedToCart
                    ? 'bg-[#22C55E] text-white'
                    : 'bg-gradient-to-r from-[#3B82F6] to-[#22C55E] text-white hover:shadow-lg hover:shadow-[#3B82F6]/25'
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

              {/* Features */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                  <Truck className="w-5 h-5 text-[#3B82F6] mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-700 text-sm">Free Shipping</p>
On orders over रू 13,300
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                  <RotateCcw className="w-5 h-5 text-[#22C55E] mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-700 text-sm">30-Day Returns</p>
                    <p className="text-xs text-slate-400">Hassle-free returns</p>
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