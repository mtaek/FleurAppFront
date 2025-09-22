import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Cart, CartItem, Product, Ville } from '@/types';

interface CartStore {
  cart: Cart;
  globalDeliveryDate: string;
  globalTimeSlot: string;
  selectedVille: Ville | null;
  addToCart: (product: Product, quantity?: number, deliveryDate?: Date, specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateDeliveryDate: (itemId: string, deliveryDate: Date) => void;
  updateSpecialInstructions: (itemId: string, instructions: string) => void;
  setGlobalDeliveryDate: (date: string) => void;
  setGlobalTimeSlot: (timeSlot: string) => void;
  setSelectedVille: (ville: Ville | null) => void;
  clearCart: () => void;
  applyCoupon: (couponCode: string) => Promise<boolean>;
  removeCoupon: () => void;
  getTotalItems: () => number;
  syncWithBackend: () => Promise<void>;
}

const calculateTotals = (items: CartItem[], discountAmount = 0): Pick<Cart, 'subtotal' | 'tax' | 'shippingCost' | 'total'> => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = 0; // Prix TTC - pas de TVA à ajouter
  const shippingCost = 0; // Livraison gratuite - prix TTC incluent tout
  const total = subtotal - discountAmount;
  
  return { subtotal, tax, shippingCost, total };
};

const initialCart: Cart = {
  items: [],
  total: 0,
  subtotal: 0,
  tax: 0,
  shippingCost: 0,
  discountAmount: 0,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: initialCart,
      globalDeliveryDate: '',
      globalTimeSlot: '10:00-12:00',
      selectedVille: null,
      
      setGlobalDeliveryDate: (date: string) => {
        set({ globalDeliveryDate: date });
      },
      
      setGlobalTimeSlot: (timeSlot: string) => {
        set({ globalTimeSlot: timeSlot });
      },

      setSelectedVille: (ville: Ville | null) => {
        set({ selectedVille: ville });
      },
      
      addToCart: (product, quantity = 1, deliveryDate, specialInstructions) => {
        set((state) => {
          const existingItemIndex = state.cart.items.findIndex(
            item => item.productId === product.id && 
                   item.deliveryDate?.getTime() === deliveryDate?.getTime()
          );
          
          let updatedItems: CartItem[];
          
          if (existingItemIndex >= 0) {
            updatedItems = [...state.cart.items];
            updatedItems[existingItemIndex].quantity += quantity;
          } else {
            const newItem: CartItem = {
              id: `cart_${Date.now()}_${Math.random()}`,
              productId: product.id,
              product,
              quantity,
              deliveryDate,
              specialInstructions,
            };
            updatedItems = [...state.cart.items, newItem];
          }
          
          const totals = calculateTotals(updatedItems, state.cart.discountAmount);
          
          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              ...totals,
            }
          };
        });
      },
      
      removeFromCart: (itemId) => {
        set((state) => {
          const updatedItems = state.cart.items.filter(item => item.id !== itemId);
          const totals = calculateTotals(updatedItems, state.cart.discountAmount);
          
          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              ...totals,
            }
          };
        });
      },
      
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }
        
        set((state) => {
          const updatedItems = state.cart.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          );
          const totals = calculateTotals(updatedItems, state.cart.discountAmount);
          
          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              ...totals,
            }
          };
        });
      },
      
      updateDeliveryDate: (itemId, deliveryDate) => {
        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items.map(item =>
              item.id === itemId ? { ...item, deliveryDate } : item
            )
          }
        }));
      },
      
      updateSpecialInstructions: (itemId, instructions) => {
        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items.map(item =>
              item.id === itemId ? { ...item, specialInstructions: instructions } : item
            )
          }
        }));
      },
      
      clearCart: () => {
        set({ cart: initialCart });
      },
      
      applyCoupon: async (couponCode) => {
        try {
          // API call to validate coupon
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: couponCode }),
          });
          
          const result = await response.json();
          
          if (result.success) {
            set((state) => {
              const discountAmount = result.data.discountAmount;
              const totals = calculateTotals(state.cart.items, discountAmount);
              
              return {
                cart: {
                  ...state.cart,
                  couponCode,
                  discountAmount,
                  ...totals,
                }
              };
            });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
      
      removeCoupon: () => {
        set((state) => {
          const totals = calculateTotals(state.cart.items, 0);
          
          return {
            cart: {
              ...state.cart,
              couponCode: undefined,
              discountAmount: 0,
              ...totals,
            }
          };
        });
      },
      
      getTotalItems: () => {
        return get().cart.items.reduce((total, item) => total + item.quantity, 0);
      },
      
      syncWithBackend: async () => {
        try {
          const user = JSON.parse(localStorage.getItem('user') || 'null');
          if (!user) return;
          
          // Sync cart with backend
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/sync`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify(get().cart),
          });
        } catch (error) {
          console.error('Failed to sync cart with backend:', error);
        }
      },
    }),
    {
      name: 'flower-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: {
          ...state.cart,
          items: state.cart.items.map(item => ({
            ...item,
            deliveryDate: item.deliveryDate ? item.deliveryDate.toISOString() : undefined,
          })),
        },
        globalDeliveryDate: state.globalDeliveryDate,
        globalTimeSlot: state.globalTimeSlot,
        selectedVille: state.selectedVille,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.cart?.items) {
          state.cart.items = state.cart.items.map(item => ({
            ...item,
            deliveryDate: item.deliveryDate ? new Date(item.deliveryDate as any) : undefined,
          })) as CartItem[];
        }
      },
    }
  )
);