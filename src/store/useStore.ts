import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  backImage?: string;
  category: 'jerseys' | 'boots' | 'equipment' | 'kids';
  subcategory?: 'national' | 'club';
  team?: string;
  country?: string;
  continent?: 'europe' | 'south-america' | 'north-america' | 'asia' | 'africa';
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

// Product data with real jersey images
export const products: Product[] = [
  // World Cup - Europe
  { 
    id: 'england-2026-home', 
    name: 'England Home Jersey 2026', 
price: 12500, 
image: '/images/jerseys/england.jpg',
    backImage: 'https://images.footballfanatics.com/england-national-team/england-home-stadium-shirt-2024-back_ss5_p-200387662+u-3i8m9g9t5l3h7x1y9q0w+e-7v2n4k6m8p0r3t5u7.jpg?_hv=2&w=600',
    category: 'jerseys', 
    subcategory: 'national',
    team: 'England', 
    country: 'England',
    continent: 'europe',
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Nike',
    description: 'Official England home jersey for the 2026 World Cup. Features Nike Dri-FIT technology for ultimate comfort.' 
  },
  { 
    id: 'france-2026-home', 
    name: 'France Home Jersey 2026', 
price: 12500, 
image: '/images/jerseys/france.jpg',
    category: 'jerseys', 
    subcategory: 'national',
    team: 'France', 
    country: 'France',
    continent: 'europe',
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Nike',
    description: 'Official France home jersey. Premium quality with authentic team crest.' 
  },
  { 
    id: 'germany-2026-home', 
    name: 'Germany Home Jersey 2026', 
price: 11800, 
image: '/images/jerseys/germany.jpg',
    category: 'jerseys', 
    subcategory: 'national',
    team: 'Germany', 
    country: 'Germany',
    continent: 'europe',
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Adidas',
    description: 'Official Germany home jersey by Adidas. Classic design with modern performance features.' 
  },
  { 
    id: 'spain-2026-home', 
    name: 'Spain Home Jersey 2026', 
    price: 11800, 
image: '/images/jerseys/spainhome.jpg',
    category: 'jerseys', 
    subcategory: 'national',
    team: 'Spain', 
    country: 'Spain',
    continent: 'europe',
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Adidas',
    description: 'Official Spain home jersey. Vibrant red design with advanced moisture-wicking technology.' 
  },
  { 
    id: 'portugal-2026-home', 
    name: 'Portugal Home Jersey 2026', 
    price: 11881, 
image: '/images/jerseys/portugalhome.jpg',
    category: 'jerseys', 
    subcategory: 'national',
    team: 'Portugal', 
    country: 'Portugal',
    continent: 'europe',
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Nike',
    description: 'Official Portugal home jersey. Show your support for Ronaldo and the team.' 
  },
  { 
    id: 'netherlands-2026-home', 
    name: 'Netherlands Home Jersey 2026', 
    price: 11881, 
image: '/images/jerseys/NED.jpg',
    category: 'jerseys', 
    subcategory: 'national',
    team: 'Netherlands', 
    country: 'Netherlands',
    continent: 'europe',
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Nike',
    description: 'Official Netherlands home jersey. Iconic orange design.' 
  },

  // South America
  { 
    id: 'argentina-2026-home', 
    name: 'Argentina Home Jersey 2026', 
price: 13200, 
image: '/images/jerseys/argentina.jpg',
    category: 'jerseys', 
    subcategory: 'national',
    team: 'Argentina', 
    country: 'Argentina',
    continent: 'south-america',
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Adidas',
    description: 'Official Argentina home jersey. Three stars for World Cup victories.' 
  },
  { 
    id: 'brazil-2026-home', 
    name: 'Brazil Home Jersey 2026', 
    price: 13217, 
image: '/images/jerseys/brazil.jpg',
    category: 'jerseys', 
    subcategory: 'national',
    team: 'Brazil', 
    country: 'Brazil',
    continent: 'south-america',
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Nike',
    description: 'Official Brazil home jersey. Canarinho yellow with green accents.' 
  },

  // North America
  { 
    id: 'usa-2026-home', 
    name: 'USA Home Jersey 2026', 
    price: 11881, 
image: '/images/jerseys/usahome.jpg',
    category: 'jerseys', 
    subcategory: 'national',
    team: 'USA', 
    country: 'USA',
    continent: 'north-america',
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Nike',
    description: 'Official USA home jersey for the 2026 World Cup hosted in North America.' 
  },
  { 
    id: 'mexico-2026-home', 
    name: 'Mexico Home Jersey 2026', 
    price: 11881, 
image: '/images/jerseys/mexicohome.jpg',
    category: 'jerseys', 
    subcategory: 'national',
    team: 'Mexico', 
    country: 'Mexico',
    continent: 'north-america',
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Adidas',
    description: 'Official Mexico home jersey. Traditional green design.' 
  },

  // Club Jerseys
  { 
    id: 'realmadrid-2025-home', 
    name: 'Real Madrid Home Jersey 2025/26', 
    price: 109, 
image: '/images/clubs/realmadrid-home.jpg',
    category: 'jerseys', 
    subcategory: 'club',
    team: 'Real Madrid', 
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Adidas',
    description: 'Official Real Madrid home jersey. Classic white with gold details.' 
  },
  { 
    id: 'barcelona-2025-home', 
    name: 'Barcelona Home Jersey 2025/26', 
    price: 109, 
image: '/images/clubs/barcelona-home.jpg',
    category: 'jerseys', 
    subcategory: 'club',
    team: 'Barcelona', 
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Nike',
    description: 'Official Barcelona home jersey. Blaugrana stripes.' 
  },
  { 
    id: 'manutd-2025-home', 
    name: 'Manchester United Home Jersey 2025/26', 
    price: 99, 
image: '/images/clubs/manutd-home.jpg',
    category: 'jerseys', 
    subcategory: 'club',
    team: 'Manchester United', 
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Adidas',
    description: 'Official Manchester United home jersey. Iconic red devil design.' 
  },
  { 
    id: 'mancity-2025-home', 
    name: 'Manchester City Home Jersey 2025/26', 
    price: 99, 
image: '/images/clubs/mancity-home.jpg',
    category: 'jerseys', 
    subcategory: 'club',
    team: 'Manchester City', 
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Puma',
    description: 'Official Manchester City home jersey. Sky blue excellence.' 
  },
  { 
    id: 'liverpool-2025-home', 
    name: 'Liverpool Home Jersey 2025/26', 
    price: 99, 
image: '/images/clubs/liverpool-home.jpg',
    category: 'jerseys', 
    subcategory: 'club',
    team: 'Liverpool', 
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Nike',
    description: 'Official Liverpool home jersey. You will never walk alone.' 
  },
  { 
    id: 'bayern-2025-home', 
    name: 'Bayern Munich Home Jersey 2025/26', 
    price: 99, 
image: '/images/clubs/bayern-home.jpg',
    category: 'jerseys', 
    subcategory: 'club',
    team: 'Bayern Munich', 
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Adidas',
    description: 'Official Bayern Munich home jersey. Mia san mia.' 
  },

  { 
    id: 'psg-2025-home', 
    name: 'PSG Home Jersey 2025/26', 
    price: 109, 
    image: '/images/jerseys/france.jpg',
    category: 'jerseys', 
    subcategory: 'club',

    team: 'PSG', 
    season: '2025/26', 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], 
    brand: 'Nike',
    description: 'Official Paris Saint-Germain home jersey. Paris est magique.' 
  },

  // Football Boots
  { 
    id: 'nike-mercurial-vapor', 
    name: 'Nike Mercurial Vapor 16 Elite', 
    price: 36713, 
    image: 'https://images.footballfanatics.com/nike-football-boots/nike-mercurial-vapor-16-elite-fg-football-boots_ss5_p-200387713+u-3i8m9g9t5l3h7x1y9q0w+e-7v2n4k6m8p0r3t5u7.jpg?_hv=2&w=600', 
    category: 'boots', 
    sizes: ['7', '8', '9', '10', '11', '12'], 
    brand: 'Nike',
    description: 'Elite speed boots for explosive acceleration. Worn by top professionals.' 
  },
  { 
    id: 'adidas-predator-elite', 
    name: 'Adidas Predator 24 Elite', 
    price: 33375, 
image: '/images/boots/predator.jpg',
    category: 'boots', 
    sizes: ['7', '8', '9', '10', '11', '12'], 
    brand: 'Adidas',
    description: 'Precision control boots for playmakers. Enhanced ball control technology.' 
  },
  { 
    id: 'puma-future-ultimate', 
    name: 'Puma Future 7 Ultimate', 
    price: 29370, 
image: '/images/boots/puma-future.jpg',
    category: 'boots', 
    sizes: ['7', '8', '9', '10', '11', '12'], 
    brand: 'Puma',
    description: 'Adaptive fit boots with FUZIONFIT360 technology for ultimate comfort.' 
  },

  // Equipment
  { 
    id: 'nike-strike-ball', 
    name: 'Nike Strike Premier League Ball', 
    price: 6008, 
image: '/images/products/training-ball.jpg',
    category: 'equipment', 
    brand: 'Nike',
    description: 'Official Premier League match ball replica. High visibility design.' 
  },
  { 
    id: 'adidas-training-cones', 
    name: 'Adidas Training Cones Set', 
    price: 3338, 
image: '/images/equipment/training-cones.jpg',
    category: 'equipment', 
    brand: 'Adidas',
    description: 'Set of 10 training cones for drills and practice sessions.' 
  },
  { 
    id: 'nike-gk-gloves', 
    name: 'Nike Vapor Grip3 Goalkeeper Gloves', 
    price: 10013, 
image: '/images/equipment/goalkeeper-gloves.jpg',
    category: 'equipment', 
    sizes: ['7', '8', '9', '10', '11'], 
    brand: 'Nike',
    description: 'Professional goalkeeper gloves with Grip3 technology for superior grip.' 
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