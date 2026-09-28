import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, MapPin, User, Mail, Phone, FileText, Package } from 'lucide-react';
import { useStore } from '../store/useStore';

interface CheckoutProps {
  onClose: () => void;
}

export default function Checkout({ onClose }: CheckoutProps) {
  const { cart, getCartTotal, setCustomerInfo, setCheckoutStep } = useStore();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerInfo(formData);
    setCheckoutStep('payment');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const subtotal = getCartTotal();
  const shipping = subtotal >= 4000 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] overflow-y-auto"
    >
      <div className="min-h-screen py-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Checkout</h2>
                <p className="text-xs text-slate-500">Express delivery across all 7 provinces of Nepal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Form */}
            <div className="p-6 lg:p-8">
              <h3 className="text-lg font-bold text-slate-800 mb-6">
                Shipping Information
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                      placeholder="e.g. Roshan Shrestha"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                      placeholder="roshan@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-2">
                    Phone Number (Nepal Mobile / eSewa)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-2">
                    Delivery Address / Street Landmark
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                      placeholder="e.g. Nayabazar, Near Medical Hall, Ward 16"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 text-sm font-medium mb-2">
                      City / District
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                      placeholder="Kathmandu"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 text-sm font-medium mb-2">
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                      placeholder="44600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-2">
                    Order Notes / Jersey Customization Name
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all resize-none"
                      placeholder="e.g. Special delivery time, or custom player name to print on jersey..."
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#3B82F6] to-[#22C55E] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#3B82F6]/25 transition-all duration-300 group"
                >
                  Continue to Payment (eSewa / Khalti / COD)
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-slate-50 p-6 lg:p-8 border-l border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-white p-2.5 rounded-xl border border-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg bg-slate-50 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-700 font-medium text-sm line-clamp-1">{item.name}</p>
                        {item.size && (
                          <p className="text-slate-400 text-xs">Size: {item.size}</p>
                        )}
                        <p className="text-slate-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-[#3B82F6] font-bold text-sm">
                        रू {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mt-6 pt-6 border-t border-slate-200 space-y-2.5">
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-700">रू {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Nepal Delivery</span>
                    <span className="font-semibold text-emerald-600">
                      {shipping === 0 ? 'FREE' : `रू ${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>VAT / Taxes</span>
                    <span className="font-semibold text-slate-700">Included</span>
                  </div>
                  <div className="flex justify-between text-slate-900 text-xl font-extrabold pt-4 border-t border-slate-200">
                    <span>Total</span>
                    <span className="text-[#3B82F6]">रू {total.toLocaleString()}</span>
                  </div>
                </div>

                {subtotal >= 4000 ? (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                    <p className="text-emerald-700 text-xs font-bold">
                      🎉 Free Express Delivery Applied across Nepal!
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-center">
                    <p className="text-blue-700 text-xs font-medium">
                      Add items worth रू {(4000 - subtotal).toLocaleString()} more for FREE delivery.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}