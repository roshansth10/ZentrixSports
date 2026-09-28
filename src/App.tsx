import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import JerseysPage from './pages/JerseysPage';
import BootsPage from './pages/BootsPage';
import EquipmentPage from './pages/EquipmentPage';
import OffersPage from './pages/OffersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Footer from './sections/Footer';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import PaymentSuccess from './components/PaymentSuccess';
import { useStore } from './store/useStore';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { 
    isCartOpen, 
    selectedProduct, 
    checkoutStep, 
    closeCart, 
    closeProductModal, 
    setCheckoutStep 
  } = useStore();

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative bg-[#F8FAFC] min-h-screen overflow-x-hidden flex flex-col justify-between">
        <Navigation />
        
        <main className="relative flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jerseys" element={<JerseysPage />} />
            <Route path="/boots" element={<BootsPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Catch-all route redirect to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />

        {/* Global Modals and Drawers */}
        <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
        
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            isOpen={!!selectedProduct} 
            onClose={closeProductModal} 
          />
        )}

        {checkoutStep === 'checkout' && (
          <Checkout onClose={() => setCheckoutStep('')} />
        )}

        {checkoutStep === 'payment' && (
          <Payment onClose={() => setCheckoutStep('')} />
        )}

        {checkoutStep === 'success' && (
          <PaymentSuccess onClose={() => setCheckoutStep('')} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;