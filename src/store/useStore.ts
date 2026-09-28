import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
  backImage?: string;
  modelImage?: string;
  category: 'jerseys' | 'boots' | 'equipment' | 'kids' | 'offers' | 'apparel';
  subcategory?: 'national' | 'club';
  kitType?: 'home' | 'away';
  team?: string;
  country?: string;
  continent?: 'europe' | 'south-america' | 'north-america' | 'asia' | 'africa';
  groundType?: 'FG (Firm Ground)' | 'AG (Artificial Turf)' | 'IC (Indoor Futsal)' | 'MG (Multi-Ground)';
  season?: string;
  sizes?: string[];
  description?: string;
  brand?: string;
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Product Modal
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  closeProductModal: () => void;

  // Checkout
  checkoutStep: '' | 'checkout' | 'payment' | 'success';
  setCheckoutStep: (step: '' | 'checkout' | 'payment' | 'success') => void;
  customerInfo: CustomerInfo | null;
  setCustomerInfo: (info: CustomerInfo) => void;
  paymentMethod: 'esewa' | 'khalti' | null;
  setPaymentMethod: (method: 'esewa' | 'khalti' | null) => void;
  orderId: string | null;
  setOrderId: (id: string) => void;

  // Filters
  filters: {
    continent: string | null;
    country: string | null;
    club: string | null;
    size: string | null;
    priceRange: [number, number] | null;
  };
  setFilter: (key: string, value: unknown) => void;
  clearFilters: () => void;

  // Search
  searchResults: Product[];
  setSearchResults: (results: Product[]) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Cart
  cart: [],
  isCartOpen: false,
  addToCart: (product, size) => {
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.id === product.id && item.size === size
      );
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1, size }] };
    });
    get().openCart();
  },
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }));
  },
  updateQuantity: (productId, quantity) => {
    set((state) => ({
      cart: quantity === 0
        ? state.cart.filter((item) => item.id !== productId)
        : state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
    }));
  },
  clearCart: () => set({ cart: [] }),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },

  // Product Modal
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  closeProductModal: () => set({ selectedProduct: null }),

  // Checkout
  checkoutStep: '',
  setCheckoutStep: (step) => set({ checkoutStep: step }),
  customerInfo: null,
  setCustomerInfo: (info) => set({ customerInfo: info }),
  paymentMethod: null,
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  orderId: null,
  setOrderId: (id) => set({ orderId: id }),

  // Filters
  filters: {
    continent: null,
    country: null,
    club: null,
    size: null,
    priceRange: null,
  },
  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },
  clearFilters: () => {
    set({
      filters: {
        continent: null,
        country: null,
        club: null,
        size: null,
        priceRange: null,
      },
    });
  },

  // Search
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
}));

export const products: Product[] = [
  // --- LOCAL HERO: NEPAL ---
  {
    id: 'nepal-2026-home',
    name: 'Nepal Home Jersey 2026',
    price: 3499,
    image: '/images/jerseys/nepal/home.jpg',
    modelImage: '/images/jerseys/nepal/model.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Nepal',
    country: 'Nepal',
    continent: 'asia',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Kelme',
    description: 'Official Nepal National Football Team 2026 Home Jersey in iconic crimson red with ANFA crest and Himalayan motif.'
  },
  {
    id: 'nepal-2026-away',
    name: 'Nepal Away Jersey 2026',
    price: 3499,
    image: '/images/jerseys/nepal/away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Nepal',
    country: 'Nepal',
    continent: 'asia',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Kelme',
    description: 'Official Nepal National Football Team 2026 Away Jersey in royal blue with crimson trim.'
  },

  // --- EUROPE (6 Countries) ---
  // 1. England
  {
    id: 'england-2026-home',
    name: 'England Home Jersey 2026',
    price: 12500,
    image: '/images/jerseys/england/home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'England',
    country: 'England',
    continent: 'europe',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official England 2026 Home Jersey. Premium Dri-FIT ADV technology with classic white design and Three Lions badge.'
  },
  {
    id: 'england-2026-away',
    name: 'England Away Jersey 2026',
    price: 12500,
    image: '/images/jerseys/england/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'England',
    country: 'England',
    continent: 'europe',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official England 2026 Away Jersey in deep purple-navy with metallic detailing.'
  },

  // 2. France
  {
    id: 'france-2026-home',
    name: 'France Home Jersey 2026',
    price: 12500,
    image: '/images/jerseys/france/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'France',
    country: 'France',
    continent: 'europe',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official France 2026 Home Jersey in classic royal navy blue with gold FFF rooster crest.'
  },
  {
    id: 'france-2026-away',
    name: 'France Away Jersey 2026',
    price: 12500,
    image: '/images/jerseys/france/Away.png',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'France',
    country: 'France',
    continent: 'europe',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official France 2026 Away Jersey in crisp white with subtle tri-color detail.'
  },

  // 3. Germany
  {
    id: 'germany-2026-home',
    name: 'Germany Home Jersey 2026',
    price: 11800,
    image: '/images/jerseys/germany/Home.png',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Germany',
    country: 'Germany',
    continent: 'europe',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Germany 2026 Home Jersey with classic white body and German flag shoulder stripes.'
  },
  {
    id: 'germany-2026-away',
    name: 'Germany Away Jersey 2026',
    price: 11800,
    image: '/images/jerseys/germany/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Germany',
    country: 'Germany',
    continent: 'europe',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Germany 2026 Away Jersey featuring dynamic pink and purple gradient artwork.'
  },

  // 4. Spain
  {
    id: 'spain-2026-home',
    name: 'Spain Home Jersey 2026',
    price: 11800,
    image: '/images/jerseys/spain/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Spain',
    country: 'Spain',
    continent: 'europe',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Spain 2026 Home Jersey in vibrant crimson red with yellow accents.'
  },
  {
    id: 'spain-2026-away',
    name: 'Spain Away Jersey 2026',
    price: 11800,
    image: '/images/jerseys/spain/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Spain',
    country: 'Spain',
    continent: 'europe',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Spain 2026 Away Jersey in light pastel yellow with aqua wave detailing.'
  },

  // 5. Portugal
  {
    id: 'portugal-2026-home',
    name: 'Portugal Home Jersey 2026',
    price: 11881,
    image: '/images/jerseys/portugal/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Portugal',
    country: 'Portugal',
    continent: 'europe',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Puma',
    description: 'Official Portugal 2026 Home Jersey in red and green with authentic FPF crest.'
  },
  {
    id: 'portugal-2026-away',
    name: 'Portugal Away Jersey 2026',
    price: 11881,
    image: '/images/jerseys/portugal/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Portugal',
    country: 'Portugal',
    continent: 'europe',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Puma',
    description: 'Official Portugal 2026 Away Jersey in off-white with red and green graphic strip.'
  },

  // 6. Croatia
  {
    id: 'croatia-2026-home',
    name: 'Croatia Home Jersey 2026',
    price: 11500,
    image: '/images/jerseys/croatia/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Croatia',
    country: 'Croatia',
    continent: 'europe',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official Croatia 2026 Home Jersey with iconic red and white checkered pattern.'
  },
  {
    id: 'croatia-2026-away',
    name: 'Croatia Away Jersey 2026',
    price: 11500,
    image: '/images/jerseys/croatia/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Croatia',
    country: 'Croatia',
    continent: 'europe',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official Croatia 2026 Away Jersey featuring dark navy and blue checkered artwork.'
  },

  // --- AMERICAS (7 Countries) ---
  // 7. Argentina
  {
    id: 'argentina-2026-home',
    name: 'Argentina Home Jersey 2026',
    price: 13200,
    image: '/images/jerseys/argentina/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Argentina',
    country: 'Argentina',
    continent: 'south-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Argentina 2026 Home Jersey in iconic sky-blue and white stripes with 3 World Cup stars.'
  },
  {
    id: 'argentina-2026-away',
    name: 'Argentina Away Jersey 2026',
    price: 13200,
    image: '/images/jerseys/argentina/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Argentina',
    country: 'Argentina',
    continent: 'south-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Argentina 2026 Away Jersey in dark royal blue with solar graphic hem.'
  },

  // 8. Brazil
  {
    id: 'brazil-2026-home',
    name: 'Brazil Home Jersey 2026',
    price: 13217,
    image: '/images/jerseys/brazil/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Brazil',
    country: 'Brazil',
    continent: 'south-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official Brazil 2026 Home Jersey in iconic Canarinho yellow with green collar and CBF 5 stars.'
  },
  {
    id: 'brazil-2026-away',
    name: 'Brazil Away Jersey 2026',
    price: 13217,
    image: '/images/jerseys/brazil/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Brazil',
    country: 'Brazil',
    continent: 'south-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official Brazil 2026 Away Jersey in royal blue with jaguar sleeve pattern.'
  },

  // 9. Uruguay
  {
    id: 'uruguay-2026-home',
    name: 'Uruguay Home Jersey 2026',
    price: 11500,
    image: '/images/jerseys/uruguay/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Uruguay',
    country: 'Uruguay',
    continent: 'south-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official Uruguay 2026 Home Jersey in Celeste sky blue with white collar and AUF 4 stars.'
  },
  {
    id: 'uruguay-2026-away',
    name: 'Uruguay Away Jersey 2026',
    price: 11500,
    image: '/images/jerseys/uruguay/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Uruguay',
    country: 'Uruguay',
    continent: 'south-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official Uruguay 2026 Away Jersey in clean white with sky blue trim.'
  },

  // 10. Colombia
  {
    id: 'colombia-2026-home',
    name: 'Colombia Home Jersey 2026',
    price: 11800,
    image: '/images/jerseys/colombia/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Colombia',
    country: 'Colombia',
    continent: 'south-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Colombia 2026 Home Jersey in yellow with navy blue and red accent stripes.'
  },
  {
    id: 'colombia-2026-away',
    name: 'Colombia Away Jersey 2026',
    price: 11800,
    image: '/images/jerseys/colombia/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Colombia',
    country: 'Colombia',
    continent: 'south-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Colombia 2026 Away Jersey in dark slate blue with bright orange accents.'
  },

  // 11. USA
  {
    id: 'usa-2026-home',
    name: 'USA Home Jersey 2026',
    price: 11881,
    image: '/images/jerseys/usa/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'USA',
    country: 'USA',
    continent: 'north-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official USA 2026 Home Jersey for the North American World Cup. Classic white with red and blue cuff ribbing.'
  },
  {
    id: 'usa-2026-away',
    name: 'USA Away Jersey 2026',
    price: 11881,
    image: '/images/jerseys/usa/Away.png',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'USA',
    country: 'USA',
    continent: 'north-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official USA 2026 Away Jersey featuring vibrant royal blue and red tie-dye graphics.'
  },

  // 12. Mexico
  {
    id: 'mexico-2026-home',
    name: 'Mexico Home Jersey 2026',
    price: 11881,
    image: '/images/jerseys/mexico/Home.png',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Mexico',
    country: 'Mexico',
    continent: 'north-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Mexico 2026 Home Jersey in rich deep green with Aztec feathered pattern.'
  },
  {
    id: 'mexico-2026-away',
    name: 'Mexico Away Jersey 2026',
    price: 11881,
    image: '/images/jerseys/mexico/Away.png',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Mexico',
    country: 'Mexico',
    continent: 'north-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Mexico 2026 Away Jersey in cream white with burgundy indigenous artwork.'
  },

  // 13. Canada
  {
    id: 'canada-2026-home',
    name: 'Canada Home Jersey 2026',
    price: 11200,
    image: '/images/jerseys/canada/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Canada',
    country: 'Canada',
    continent: 'north-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official Canada 2026 Home Jersey in bold crimson red with maple leaf embossing.'
  },
  {
    id: 'canada-2026-away',
    name: 'Canada Away Jersey 2026',
    price: 11200,
    image: '/images/jerseys/canada/Away.png',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Canada',
    country: 'Canada',
    continent: 'north-america',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official Canada 2026 Away Jersey in clean white with red pinstripe detailing.'
  },

  // --- ASIA (5 Countries with Nepal) ---
  // 14. Japan
  {
    id: 'japan-2026-home',
    name: 'Japan Home Jersey 2026',
    price: 11800,
    image: '/images/jerseys/japan/Home.png',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Japan',
    country: 'Japan',
    continent: 'asia',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Japan 2026 Home Jersey in Samurai Blue with subtle flame graphic overlay.'
  },
  {
    id: 'japan-2026-away',
    name: 'Japan Away Jersey 2026',
    price: 11800,
    image: '/images/jerseys/japan/Away.png',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Japan',
    country: 'Japan',
    continent: 'asia',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Japan 2026 Away Jersey in white with red sleeve cuffs and origami details.'
  },

  // 15. South Korea
  {
    id: 'south-korea-2026-home',
    name: 'South Korea Home Jersey 2026',
    price: 11881,
    image: '/images/jerseys/south-korea/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'South Korea',
    country: 'South Korea',
    continent: 'asia',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official South Korea 2026 Home Jersey in electric pink-red with black tiger sleeve pattern.'
  },
  {
    id: 'south-korea-2026-away',
    name: 'South Korea Away Jersey 2026',
    price: 11881,
    image: '/images/jerseys/south-korea/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'South Korea',
    country: 'South Korea',
    continent: 'asia',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official South Korea 2026 Away Jersey in black with multicolored brushstroke art.'
  },

  // 16. Saudi Arabia
  {
    id: 'saudi-arabia-2026-home',
    name: 'Saudi Arabia Home Jersey 2026',
    price: 11200,
    image: '/images/jerseys/saudi-arabia/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Saudi Arabia',
    country: 'Saudi Arabia',
    continent: 'asia',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Saudi Arabia 2026 Home Jersey in white with palm green accents and SAFF crest.'
  },
  {
    id: 'saudi-arabia-2026-away',
    name: 'Saudi Arabia Away Jersey 2026',
    price: 11200,
    image: '/images/jerseys/saudi-arabia/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Saudi Arabia',
    country: 'Saudi Arabia',
    continent: 'asia',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Adidas',
    description: 'Official Saudi Arabia 2026 Away Jersey in dark green with light green feather motif.'
  },

  // 17. Iran
  {
    id: 'iran-2026-home',
    name: 'Iran Home Jersey 2026',
    price: 10500,
    image: '/images/jerseys/iran/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Iran',
    country: 'Iran',
    continent: 'asia',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Majid',
    description: 'Official Iran 2026 Home Jersey in white with red and green flag trim and Persian cheetah watermark.'
  },
  {
    id: 'iran-2026-away',
    name: 'Iran Away Jersey 2026',
    price: 10500,
    image: '/images/jerseys/iran/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Iran',
    country: 'Iran',
    continent: 'asia',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Majid',
    description: 'Official Iran 2026 Away Jersey in vibrant red with white and green trim.'
  },

  // --- AFRICA (4 Countries) ---
  // 18. Morocco
  {
    id: 'morocco-2026-home',
    name: 'Morocco Home Jersey 2026',
    price: 11500,
    image: '/images/jerseys/morocco/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Morocco',
    country: 'Morocco',
    continent: 'africa',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Puma',
    description: 'Official Morocco 2026 Home Jersey in deep red with green chest band and FRMF star.'
  },
  {
    id: 'morocco-2026-away',
    name: 'Morocco Away Jersey 2026',
    price: 11500,
    image: '/images/jerseys/morocco/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Morocco',
    country: 'Morocco',
    continent: 'africa',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Puma',
    description: 'Official Morocco 2026 Away Jersey in white with red and green central stripe.'
  },

  // 19. Senegal
  {
    id: 'senegal-2026-home',
    name: 'Senegal Home Jersey 2026',
    price: 11500,
    image: '/images/jerseys/senegal/Home.png',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Senegal',
    country: 'Senegal',
    continent: 'africa',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Puma',
    description: 'Official Senegal 2026 Home Jersey in white with yellow, green and red chest chevron.'
  },
  {
    id: 'senegal-2026-away',
    name: 'Senegal Away Jersey 2026',
    price: 11500,
    image: '/images/jerseys/senegal/Away.png',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Senegal',
    country: 'Senegal',
    continent: 'africa',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Puma',
    description: 'Official Senegal 2026 Away Jersey in forest green with central graphic block.'
  },

  // 20. Nigeria
  {
    id: 'nigeria-2026-home',
    name: 'Nigeria Home Jersey 2026',
    price: 12500,
    image: '/images/jerseys/nigeria/Home.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Nigeria',
    country: 'Nigeria',
    continent: 'africa',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official Nigeria 2026 Home Jersey featuring iconic electric green and white Super Eagles pattern.'
  },
  {
    id: 'nigeria-2026-away',
    name: 'Nigeria Away Jersey 2026',
    price: 12500,
    image: '/images/jerseys/nigeria/Away.jpg',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Nigeria',
    country: 'Nigeria',
    continent: 'africa',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Nike',
    description: 'Official Nigeria 2026 Away Jersey in dark green with modern patterned sleeves.'
  },

  // 21. Ghana
  {
    id: 'ghana-2026-home',
    name: 'Ghana Home Jersey 2026',
    price: 11200,
    image: '/images/jerseys/ghana/Home.png',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'home',
    team: 'Ghana',
    country: 'Ghana',
    continent: 'africa',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Puma',
    description: 'Official Ghana 2026 Home Jersey in white with central Black Star and tri-color sleeve cuffs.'
  },
  {
    id: 'ghana-2026-away',
    name: 'Ghana Away Jersey 2026',
    price: 11200,
    image: '/images/jerseys/ghana/Away.png',
    category: 'jerseys',
    subcategory: 'national',
    kitType: 'away',
    team: 'Ghana',
    country: 'Ghana',
    continent: 'africa',
    season: '2026',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Puma',
    description: 'Official Ghana 2026 Away Jersey in red with yellow-green graphic block and Black Star.'
  },

  // --- FOOTBALL BOOTS (6 Products) ---
  {
    id: 'nike-mercurial-vapor',
    name: 'Nike Mercurial Vapor 16 Elite FG',
    price: 36500,
    originalPrice: 42000,
    badge: 'Pro Elite',
    image: '/images/boots/mercurial.jpg',
    category: 'boots',
    groundType: 'FG (Firm Ground)',
    sizes: ['7', '8', '8.5', '9', '9.5', '10', '11'],
    brand: 'Nike',
    description: 'Elite speed boots for explosive acceleration. 3/4 length Air Zoom unit with Gripknit upper for ultimate touch.'
  },
  {
    id: 'adidas-predator-elite',
    name: 'Adidas Predator 24 Elite FT',
    price: 33500,
    originalPrice: 38000,
    badge: 'Best Seller',
    image: '/images/boots/predator.jpg',
    category: 'boots',
    groundType: 'FG (Firm Ground)',
    sizes: ['7', '8', '8.5', '9', '9.5', '10', '11'],
    brand: 'Adidas',
    description: 'Iconic fold-over tongue with Strikeskin rubber fins for lethal swerve, pinpoint accuracy and striking power.'
  },
  {
    id: 'puma-future-ultimate',
    name: 'Puma Future 7 Ultimate MG/AG',
    price: 29500,
    originalPrice: 34000,
    badge: 'Turf Master',
    image: '/images/boots/puma-future.jpg',
    category: 'boots',
    groundType: 'AG (Artificial Turf)',
    sizes: ['7', '8', '8.5', '9', '10', '11'],
    brand: 'Puma',
    description: 'Adaptive FUZIONFIT360 dual mesh upper with PWRTAPE support. Perfect for artificial turf & futsal grounds across Nepal.'
  },
  {
    id: 'nike-phantom-gx-elite',
    name: 'Nike Phantom GX 2 Elite Gripknit',
    price: 34500,
    originalPrice: 39000,
    badge: 'Limited Edition',
    image: '/images/products/limited-boot.jpg',
    category: 'boots',
    groundType: 'FG (Firm Ground)',
    sizes: ['7.5', '8', '8.5', '9', '10', '10.5'],
    brand: 'Nike',
    description: 'Revolutionary Nike Gripknit sticky yarn provides supreme ball command in dry and wet monsoon conditions.'
  },
  {
    id: 'adidas-copa-pure',
    name: 'Adidas Copa Pure 2 Elite Leather',
    price: 31000,
    originalPrice: 36000,
    badge: 'Classic K-Leather',
    image: '/images/categories/boots-tunnel.jpg',
    category: 'boots',
    groundType: 'FG (Firm Ground)',
    sizes: ['7', '8', '8.5', '9', '9.5', '10'],
    brand: 'Adidas',
    description: 'Fusionskin leather forefoot with micro-textured touch pads for effortless touch and sublime match comfort.'
  },
  {
    id: 'nike-mercurial-superfly-futsal',
    name: 'Nike Zoom Superfly 10 Academy IC / Turf',
    price: 18500,
    originalPrice: 22000,
    badge: 'Futsal Pro',
    image: '/images/boots/mercurial.jpg',
    category: 'boots',
    groundType: 'IC (Indoor Futsal)',
    sizes: ['6.5', '7', '8', '8.5', '9', '9.5', '10'],
    brand: 'Nike',
    description: 'Responsive Zoom Air heel unit with non-marking flat rubber outsole designed specifically for Nepali futsal surfaces.'
  },

  // --- FOOTBALL EQUIPMENT & ACCESSORIES (6 Products) ---
  {
    id: 'nike-strike-ball',
    name: 'Nike Strike Premier League Match Ball (Size 5)',
    price: 5999,
    originalPrice: 7500,
    badge: 'Official Spec',
    image: '/images/products/training-ball.jpg',
    category: 'equipment',
    brand: 'Nike',
    description: 'Engineered with Nike Aerowsculpt grooves for true flight precision and high-contrast visuals for evening matches.'
  },
  {
    id: 'nike-gk-gloves',
    name: 'Nike Vapor Grip3 Pro Goalkeeper Gloves',
    price: 9999,
    originalPrice: 12500,
    badge: 'Matchday Grade',
    image: '/images/products/goalkeeper-gloves.jpg',
    category: 'equipment',
    sizes: ['7', '8', '9', '10', '11'],
    brand: 'Nike',
    description: 'Grip3 technology wraps fingers in 4mm Contact Plus latex foam for all-weather grip on wet and dry pitches.'
  },
  {
    id: 'carbon-flex-shin-guards',
    name: 'Pro Carbon-Flex Ergonomic Shin Guards with Sleeves',
    price: 2799,
    originalPrice: 3500,
    badge: 'Impact Shield',
    image: '/images/equipment/shin-guards.jpg',
    category: 'equipment',
    sizes: ['S', 'M', 'L'],
    brand: 'Zentrix',
    description: 'Ultra-lightweight carbon composite shell with high-density EVA shock absorption and breathable compression sleeves.'
  },
  {
    id: 'elite-team-sports-bag',
    name: 'Zentrix Pro Matchday Duffel & Boot Bag 65L',
    price: 4499,
    originalPrice: 5500,
    badge: 'Waterproof Base',
    image: '/images/equipment/sports-bag.jpg',
    category: 'equipment',
    brand: 'Zentrix',
    description: 'Heavy-duty 65L water-resistant team duffel with ventilated boot compartment and padded ergonomic shoulder straps.'
  },
  {
    id: 'adidas-training-cones',
    name: 'Adidas Agility Disc Cones (Set of 10 with Carry Strap)',
    price: 3299,
    originalPrice: 4000,
    badge: 'Academy Pack',
    image: '/images/equipment/training-cones.jpg',
    category: 'equipment',
    brand: 'Adidas',
    description: 'Flexible, shatterproof high-visibility marker cones for speed drills, agility courses, and team tactical practice.'
  },
  {
    id: 'pro-speed-agility-set',
    name: 'Pro Speed & Agility Ladder + Hurdle Training Set',
    price: 4199,
    originalPrice: 5200,
    badge: 'Coaching Set',
    image: '/images/categories/equipment-room.jpg',
    category: 'equipment',
    brand: 'Zentrix',
    description: '6-meter adjustable speed ladder with 6 ground pegs, 4 agility hurdles, and heavy duty carry pouch.'
  },

  // --- TRAINING APPAREL & GEAR (4 Products) ---
  {
    id: 'zentrix-stadium-jacket',
    name: 'Nepal National Anthem Stadium Winter Jacket',
    price: 7499,
    originalPrice: 9000,
    badge: 'Winter Anthem',
    image: '/images/products/stadium-jacket.jpg',
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Zentrix',
    description: 'Windproof, fleece-lined water-repellent stadium parka with embroidered national crest and thermal hood.'
  },
  {
    id: 'drifit-training-top',
    name: 'Pro Dri-FIT Quarter-Zip Training Drill Top',
    price: 4499,
    originalPrice: 5500,
    badge: 'Elite Breathable',
    image: '/images/products/training-top.jpg',
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL'],
    brand: 'Nike',
    description: 'Streamlined athletic fit with invisible thumb loops and sweat-wicking knit fabric for chilly morning training.'
  },
  {
    id: 'pro-match-shorts',
    name: 'Zentrix Aero-Lite Matchday Shorts',
    price: 2399,
    originalPrice: 3000,
    badge: 'Quick Dry',
    image: '/images/products/match-shorts.jpg',
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL'],
    brand: 'Zentrix',
    description: 'Ultralight 4-way stretch fabric with elastic drawcord waistband and side split hems for uninhibited movement.'
  },
  {
    id: 'pro-compression-layer',
    name: 'Pro Recovery Thermal Compression Base Layer',
    price: 3199,
    originalPrice: 3900,
    badge: 'Muscle Support',
    image: '/images/products/compression-base.jpg',
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL'],
    brand: 'Nike',
    description: 'Graduated muscle compression reduces fatigue and promotes rapid recovery during intense football fixtures.'
  },

  // --- SPECIAL OFFERS & TEAM COMBOS (5 Products) ---
  {
    id: 'futsal-team-pack-10',
    name: 'Full Futsal Team Kit Bundle (10 Outfield + 1 GK + Ball)',
    price: 34999,
    originalPrice: 44000,
    badge: 'Save रू 9,000',
    image: '/images/categories/jerseys-tunnel.jpg',
    category: 'offers',
    brand: 'Zentrix',
    description: 'Complete tournament package: 10 customized player jerseys with custom name/number print, 1 padded GK kit, and 1 FIFA-spec match ball.'
  },
  {
    id: 'nepal-superfan-combo',
    name: 'Nepal Superfan Combo (Home Jersey + Stadium Jacket)',
    price: 9499,
    originalPrice: 12500,
    badge: 'Save रू 3,000',
    image: '/images/jerseys/nepal/home.jpg',
    category: 'offers',
    brand: 'Zentrix',
    description: 'The ultimate matchday supporter set: Official Nepal 2026 Crimson Jersey plus the fleece-lined Stadium Anthem Jacket.'
  },
  {
    id: 'striker-master-pack',
    name: 'Pro Striker Pack (Nike Mercurial + Grip Socks + Shinguards)',
    price: 38999,
    originalPrice: 45000,
    badge: 'Save रू 6,000',
    image: '/images/boots/mercurial.jpg',
    category: 'offers',
    brand: 'Nike',
    description: 'Everything a top striker needs: Nike Mercurial Vapor 16 boots, anti-slip pro grip socks, and Carbon-Flex shin guards.'
  },
  {
    id: 'goalkeeper-fortress-bundle',
    name: 'Goalkeeper Fortress Pack (Nike Gloves + Padded Pants + Grip Spray)',
    price: 13999,
    originalPrice: 17500,
    badge: 'Save रू 3,500',
    image: '/images/products/goalkeeper-gloves.jpg',
    category: 'offers',
    brand: 'Nike',
    description: 'Complete protection and grip package for serious shot-stoppers in Nepal district and corporate tournaments.'
  },
  {
    id: 'grassroots-coach-kit',
    name: 'Academy Coaching Set (2 Nike Balls + 10 Cones + Agility Ladder)',
    price: 11999,
    originalPrice: 15000,
    badge: 'Save रू 3,000',
    image: '/images/products/training-ball.jpg',
    category: 'offers',
    brand: 'Nike',
    description: 'Comprehensive coaching and training bundle for school teams, youth academies, and local futsal clubs.'
  },
];

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.team?.toLowerCase().includes(lowercaseQuery) ||
      product.country?.toLowerCase().includes(lowercaseQuery) ||
      product.brand?.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterProducts = (filters: {
  continent?: string | null;
  country?: string | null;
  club?: string | null;
  size?: string | null;
  priceRange?: [number, number] | null;
}): Product[] => {
  return products.filter((product) => {
    if (filters.continent && product.continent !== filters.continent) return false;
    if (filters.country && product.country !== filters.country) return false;
    if (filters.club && product.team !== filters.club) return false;
    if (filters.size && !product.sizes?.includes(filters.size)) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) return false;
    }
    return true;
  });
};