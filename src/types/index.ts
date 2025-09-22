export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductCategory;
  occasion?: Occasion;
  inStock: boolean;
  stockQuantity: number;
  featured?: boolean;
  rating?: number;
  reviews?: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Occasion {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  deliveryDate?: Date;
  specialInstructions?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discountAmount?: number;
  couponCode?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  total: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discountAmount?: number;
  couponCode?: string;
  deliveryDate: Date;
  specialInstructions?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  card?: {
    last4: string;
    brand: string;
    expiryMonth: number;
    expiryYear: number;
  };
  isDefault: boolean;
}

export interface DeliveryTracking {
  orderId: string;
  trackingNumber: string;
  status: OrderStatus;
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  deliveryPersonnel?: {
    name: string;
    phone: string;
    photo?: string;
  };
  estimatedArrival?: Date;
  updates: TrackingUpdate[];
}

export interface TrackingUpdate {
  id: string;
  status: OrderStatus;
  message: string;
  location?: string;
  timestamp: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface FilterOptions {
  categories?: string[];
  occasions?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  inStockOnly?: boolean;
  sortBy?: 'name' | 'price' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NewsletterSubscription {
  email: string;
  preferences?: {
    promotions: boolean;
    newProducts: boolean;
    orderUpdates: boolean;
  };
}

export interface DeliveryInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  instructions?: string;
}

export interface BillingInfo {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country?: string;
  company?: string;
}

export interface PaymentFormData {
  deliveryInfo: DeliveryInfo;
  billingInfo?: BillingInfo;
  useSameBillingAddress: boolean;
}

export interface Ville {
  id: string;
  nom: string;
  codePostal: string;
  actif: boolean;
}