import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import FeaturedProducts from './sections/FeaturedProducts';
import WorldCupJerseys from './sections/WorldCupJerseys';
import ClubJerseys from './sections/ClubJerseys';
import FootballBoots from './sections/FootballBoots';
import Equipment from './sections/Equipment';
import Reviews from './sections/Reviews';
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
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-[#F8FAFC] min-h-screen overflow-x-hidden">
      <Navigation />
      
      <main className="relative">
        <Hero />
        <FeaturedProducts />
        <WorldCupJerseys />
{/* <ClubJerseys /> - disabled per user request */}
        <FootballBoots />
        <Equipment />
        <Reviews />
      </main>

      <Footer />

      {/* Modals and Drawers */}
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
  );
}

export default App;