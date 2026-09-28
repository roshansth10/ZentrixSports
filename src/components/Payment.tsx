import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, Loader2, Check, Wallet, Smartphone } from 'lucide-react';
import { useStore } from '../store/useStore';

interface PaymentProps {
  onClose: () => void;
}

export default function Payment({ onClose }: PaymentProps) {
  const { getCartTotal, setPaymentMethod, setOrderId, setCheckoutStep } = useStore();
  const [selectedMethod, setSelectedMethod] = useState<'esewa' | 'khalti' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [esewaId, setEsewaId] = useState('');
  const [esewaPassword, setEsewaPassword] = useState('');
  const [khaltiPhone, setKhaltiPhone] = useState('');
  const [khaltiOtp, setKhaltiOtp] = useState('');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) return;

    setIsProcessing(true);
    setPaymentMethod(selectedMethod);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const orderId = 'ZTX-' + Date.now().toString(36).toUpperCase();
    setOrderId(orderId);

    setIsProcessing(false);
    setIsComplete(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCheckoutStep('success');
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
      <div className="min-h-screen py-6 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Payment</h2>
              <p className="text-xs text-slate-500">Zentrix Sports Nepal (Nayabazar)</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {/* Amount */}
            <div className="text-center mb-8 p-6 bg-gradient-to-br from-[#3B82F6]/5 to-[#22C55E]/5 rounded-2xl">
              <p className="text-slate-500 text-sm">Payable Amount (NPR)</p>
              <p className="text-4xl font-black text-[#3B82F6] mt-1">
                रू {total.toLocaleString()}
              </p>
              <p className="text-slate-400 text-xs mt-1">
                {shipping === 0 ? 'Free Express Delivery included' : 'Delivery: रू 150 included'}
              </p>
            </div>

            {/* Payment Methods */}
            {!selectedMethod ? (
              <div className="space-y-3">
                <p className="text-slate-600 text-sm font-semibold mb-3">Choose Payment Method:</p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMethod('esewa')}
                  className="w-full flex items-center gap-4 p-4 bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
                    e
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-bold">eSewa Wallet</p>
                    <p className="text-slate-500 text-xs">Instant Nepal Digital Payment</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMethod('khalti')}
                  className="w-full flex items-center gap-4 p-4 bg-purple-50/60 border-2 border-purple-200 rounded-2xl hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
                    K
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-bold">Khalti Digital Wallet</p>
                    <p className="text-slate-500 text-xs">Mobile number & OTP</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-600" />
                </motion.button>
              </div>
            ) : (
              <form onSubmit={handlePayment} className="space-y-4">
                <button
                  type="button"
                  onClick={() => setSelectedMethod(null)}
                  className="text-[#3B82F6] text-sm font-medium hover:underline flex items-center gap-1"
                >
                  ← Choose different method
                </button>

                {selectedMethod === 'esewa' ? (
                  <>
                    <div className="flex items-center gap-3 mb-4 p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
                      <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-bold">
                        e
                      </div>
                      <div>
                        <p className="text-slate-800 font-bold text-sm">eSewa Direct Pay</p>
                        <p className="text-slate-500 text-xs">Official Merchant ID: ZENTRIX-NP</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">
                        eSewa ID / Mobile Number
                      </label>
                      <input
                        type="text"
                        value={esewaId}
                        onChange={(e) => setEsewaId(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        placeholder="98XXXXXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">
                        eSewa MPIN / Password
                      </label>
                      <input
                        type="password"
                        value={esewaPassword}
                        onChange={(e) => setEsewaPassword(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        placeholder="••••"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-4 p-3.5 bg-purple-50 rounded-xl border border-purple-100">
                      <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold">
                        K
                      </div>
                      <div>
                        <p className="text-slate-800 font-bold text-sm">Khalti Payment</p>
                        <p className="text-slate-500 text-xs">Official Merchant: Zentrix Sports</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">
                        Khalti Registered Mobile
                      </label>
                      <input
                        type="tel"
                        value={khaltiPhone}
                        onChange={(e) => setKhaltiPhone(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="98XXXXXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 text-xs font-bold uppercase mb-1.5">
                        6-Digit Confirmation OTP
                      </label>
                      <input
                        type="text"
                        value={khaltiOtp}
                        onChange={(e) => setKhaltiOtp(e.target.value)}
                        required
                        maxLength={6}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="123456"
                      />
                    </div>
                  </>
                )}

                <motion.button
                  type="submit"
                  disabled={isProcessing || isComplete}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all duration-300 mt-6 ${
                    isComplete
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Connecting to Nepal Gateway...
                    </>
                  ) : isComplete ? (
                    <>
                      <Check className="w-5 h-5" />
                      Payment Verified!
                    </>
                  ) : (
                    <>
                      Pay रू {total.toLocaleString()}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
      </div>
    </motion.div>
  </div>
</motion.div>
);
}