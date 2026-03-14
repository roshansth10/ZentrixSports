import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Home, ShoppingBag, Printer, Download } from 'lucide-react';
import { useStore } from '../store/useStore';

interface PaymentSuccessProps {
  onClose: () => void;
}

export default function PaymentSuccess({ onClose }: PaymentSuccessProps) {
  const { orderId, customerInfo, cart, getCartTotal, paymentMethod, clearCart } = useStore();
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrintReceipt = () => {
    if (receiptRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const subtotal = getCartTotal();
        const shipping = subtotal > 100 ? 0 : 10;
        const tax = subtotal * 0.1;
        const total = subtotal + shipping + tax;

        printWindow.document.write(`
          <html>
            <head>
              <title>Zentrix Sports - Receipt ${orderId}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; background: white; color: #1e293b; }
                .header { text-align: center; border-bottom: 2px solid #3B82F6; padding-bottom: 20px; margin-bottom: 30px; }
                .header h1 { color: #3B82F6; margin: 0; }
                .section { margin-bottom: 25px; }
                .section-title { color: #3B82F6; font-weight: bold; margin-bottom: 10px; }
                .row { display: flex; justify-content: space-between; padding: 5px 0; }
                .total { border-top: 2px solid #3B82F6; margin-top: 20px; padding-top: 15px; font-size: 1.2em; font-weight: bold; }
                .total span:last-child { color: #3B82F6; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>ZENTRIX SPORTS</h1>
                <p style="color: #64748b;">Power Your Game.</p>
                <p style="color: #22C55E; margin-top: 10px; font-weight: bold;">PAYMENT RECEIPT</p>
              </div>
              <div class="section">
                <div class="row"><span>Order ID:</span><span>${orderId}</span></div>
                <div class="row"><span>Date:</span><span>${new Date().toLocaleDateString()}</span></div>
                <div class="row"><span>Payment Method:</span><span>${paymentMethod?.toUpperCase()}</span></div>
              </div>
              <div class="section">
                <div class="section-title">Customer Information</div>
                <div class="row"><span>Name:</span><span>${customerInfo?.fullName}</span></div>
                <div class="row"><span>Email:</span><span>${customerInfo?.email}</span></div>
                <div class="row"><span>Phone:</span><span>${customerInfo?.phone}</span></div>
                <div class="row"><span>Address:</span><span>${customerInfo?.address}</span></div>
                <div class="row"><span>City:</span><span>${customerInfo?.city}, ${customerInfo?.postalCode}</span></div>
              </div>
              <div class="section">
                <div class="section-title">Products</div>
                ${cart.map(item => `
                  <div class="row">
                    <span>${item.name} x${item.quantity}</span>
                    <span>रू ${(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                `).join('')}
              </div>
              <div class="total">
                <div class="row"><span>Subtotal:</span><span>रू ${subtotal.toFixed(0)}</span></div>
                <div class="row"><span>Shipping:</span><span>${shipping === 0 ? 'Free' : 'रू ' + shipping.toFixed(0)}</span></div>
                <div class="row"><span>Tax (10%):</span><span>रू ${tax.toFixed(0)}</span></div>
                <div class="row"><span style="font-size: 1.3em;">TOTAL:</span><span style="font-size: 1.3em; color: #3B82F6;">रू ${total.toFixed(0)}</span></div>
              </div>
              <div style="text-align: center; margin-top: 40px; color: #64748b;">
                <p>Thank you for shopping with Zentrix Sports!</p>
                <p>Power Your Game.</p>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleDownloadReceipt = () => {
    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const receiptContent = `
ZENTRIX SPORTS - PAYMENT RECEIPT
================================

Order ID: ${orderId}
Date: ${new Date().toLocaleDateString()}
Payment Method: ${paymentMethod?.toUpperCase()}

CUSTOMER INFORMATION
--------------------
Name: ${customerInfo?.fullName}
Email: ${customerInfo?.email}
Phone: ${customerInfo?.phone}
Address: ${customerInfo?.address}
City: ${customerInfo?.city}, ${customerInfo?.postalCode}

PRODUCTS
--------
${cart.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

TOTALS
------
Subtotal: $${subtotal.toFixed(2)}
Shipping: ${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}
Tax (10%): $${tax.toFixed(2)}
TOTAL: $${total.toFixed(2)}

Thank you for shopping with Zentrix Sports!
Power Your Game.
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Zentrix-Receipt-${orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleContinueShopping = () => {
    clearCart();
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

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
          className="w-full max-w-lg"
        >
          {/* Success Animation */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-20 h-20 bg-gradient-to-br from-[#22C55E] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#22C55E]/30"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-slate-800">Payment Successful!</h2>
            <p className="text-slate-500 mt-1">
              Thank you for your order. Your receipt is ready.
            </p>
          </div>

          {/* Receipt */}
          <div
            ref={receiptRef}
            className="bg-white rounded-2xl overflow-hidden shadow-xl mb-6"
          >
            {/* Receipt Header */}
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#22C55E] p-6 text-center">
              <h3 className="text-2xl font-bold text-white">ZENTRIX SPORTS</h3>
              <p className="text-white/80 text-sm">Power Your Game.</p>
            </div>

            {/* Receipt Body */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                <span className="text-slate-500">Order ID</span>
                <span className="font-mono font-bold text-slate-800">{orderId}</span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                <span className="text-slate-500">Date</span>
                <span className="text-slate-700">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                <span className="text-slate-500">Payment Method</span>
                <span className="text-slate-700 uppercase font-medium">{paymentMethod}</span>
              </div>

              <div className="mb-4 pb-4 border-b border-slate-100">
                <p className="text-slate-500 text-sm mb-2">Customer</p>
                <p className="font-semibold text-slate-800">{customerInfo?.fullName}</p>
                <p className="text-slate-500 text-sm">{customerInfo?.email}</p>
              </div>

              <div className="mb-4 pb-4 border-b border-slate-100">
                <p className="text-slate-500 text-sm mb-2">Products</p>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between py-1">
                    <span className="text-slate-700 text-sm">{item.name} x{item.quantity}</span>
                    <span className="font-medium text-slate-700">रू {(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-slate-700">रू {subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Shipping</span>
                  <span className="text-slate-700">{shipping === 0 ? 'Free' : 'रू ' + shipping.toFixed(0)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Tax (10%)</span>
                  <span className="text-slate-700">रू {tax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t-2 border-[#3B82F6]">
                  <span className="font-bold text-slate-800">Total</span>
                  <span className="font-bold text-xl text-[#3B82F6]">रू {total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                onClick={handlePrintReceipt}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all"
              >
                <Printer className="w-4 h-4" />
                Print
              </motion.button>
              <motion.button
                onClick={handleDownloadReceipt}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all"
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>
            </div>

            <motion.button
              onClick={handleContinueShopping}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#3B82F6] to-[#22C55E] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#3B82F6]/25 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </motion.button>

            <motion.button
              onClick={() => {
                clearCart();
                onClose();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 text-slate-600 font-semibold rounded-xl hover:bg-slate-200 transition-all"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}