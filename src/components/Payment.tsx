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

  const total = getCartTotal() * 1.1 + (getCartTotal() > 100 ? 0 : 10);

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
            <h2 className="text-xl font-bold text-slate-800">Payment</h2>
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
              <p className="text-slate-500 text-sm">Total Amount</p>
              <p className="text-4xl font-bold text-[#3B82F6]">
                रू {total.toFixed(0)}
              </p>
            </div>

            {/* Payment Methods */}
            {!selectedMethod ? (
              <div className="space-y-4">
                <p className="text-slate-600 text-sm font-medium mb-4">Select Payment Method</p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMethod('esewa')}
                  className="w-full flex items-center gap-4 p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all"
                >
                  <div className="w-14 h-14 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
                    <Wallet className="w-7 h-7 text-[#22C55E]" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-slate-800 font-bold text-lg">eSewa</p>
                    <p className="text-slate-400 text-sm">Pay with eSewa wallet</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMethod('khalti')}
                  className="w-full flex items-center gap-4 p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl hover:border-[#3B82F6] hover:bg-[#3B82F6]/5 transition-all"
                >
                  <div className="w-14 h-14 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-7 h-7 text-[#3B82F6]" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-slate-800 font-bold text-lg">Khalti</p>
                    <p className="text-slate-400 text-sm">Pay with Khalti</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </motion.button>
              </div>
            ) : (
              <form onSubmit={handlePayment} className="space-y-4">
                <button
                  type="button"
                  onClick={() => setSelectedMethod(null)}
                  className="text-[#3B82F6] text-sm font-medium hover:underline flex items-center gap-1"
                >
                  ← Change Method
                </button>

                {selectedMethod === 'esewa' ? (
                  <>
                    <div className="flex items-center gap-3 mb-6 p-4 bg-[#22C55E]/5 rounded-xl">
                      <div className="w-12 h-12 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-[#22C55E]" />
                      </div>
                      <div>
                        <p className="text-slate-800 font-bold">eSewa Payment</p>
                        <p className="text-slate-400 text-sm">Secure wallet payment</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-2">
                        eSewa ID
                      </label>
                      <input
                        type="text"
                        value={esewaId}
                        onChange={(e) => setEsewaId(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-all"
                        placeholder="Enter your eSewa ID"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={esewaPassword}
                        onChange={(e) => setEsewaPassword(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 transition-all"
                        placeholder="Enter your password"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-6 p-4 bg-[#3B82F6]/5 rounded-xl">
                      <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-[#3B82F6]" />
                      </div>
                      <div>
                        <p className="text-slate-800 font-bold">Khalti Payment</p>
                        <p className="text-slate-400 text-sm">Mobile payment</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={khaltiPhone}
                        onChange={(e) => setKhaltiPhone(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                        placeholder="98XXXXXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 text-sm font-medium mb-2">
                        OTP
                      </label>
                      <input
                        type="text"
                        value={khaltiOtp}
                        onChange={(e) => setKhaltiOtp(e.target.value)}
                        required
                        maxLength={6}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                        placeholder="Enter OTP"
                      />
                    </div>
                  </>
                )}

                <motion.button
                  type="submit"
                  disabled={isProcessing || isComplete}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 mt-6 ${
                    isComplete
                      ? 'bg-[#22C55E] text-white'
                      : 'bg-gradient-to-r from-[#3B82F6] to-[#22C55E] text-white hover:shadow-lg hover:shadow-[#3B82F6]/25'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : isComplete ? (
                    <>
                      <Check className="w-5 h-5" />
                      Payment Complete!
                    </>
                  ) : (
                    <>
                      Pay रू {total.toFixed(0)}
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