import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, Address } from '@/types';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<boolean>;
  updateAddress: (addressId: string, address: Partial<Address>) => Promise<boolean>;
  deleteAddress: (addressId: string) => Promise<boolean>;
  setDefaultAddress: (addressId: string) => Promise<boolean>;
  refreshToken: () => Promise<boolean>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          
          const result = await response.json();
          
          if (result.success) {
            set({
              user: result.data.user,
              token: result.data.token,
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          } else {
            set({ isLoading: false });
            return false;
          }
        } catch (error) {
          console.error('Login error:', error);
          set({ isLoading: false });
          return false;
        }
      },
      
      register: async (userData: RegisterData) => {
        set({ isLoading: true });
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          });
          
          const result = await response.json();
          
          if (result.success) {
            set({
              user: result.data.user,
              token: result.data.token,
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          } else {
            set({ isLoading: false });
            return false;
          }
        } catch (error) {
          console.error('Registration error:', error);
          set({ isLoading: false });
          return false;
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
      
      updateProfile: async (userData: Partial<User>) => {
        const { token } = get();
        if (!token) return false;
        
        set({ isLoading: true });
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
          });
          
          const result = await response.json();
          
          if (result.success) {
            set(state => ({
              user: { ...state.user!, ...result.data },
              isLoading: false,
            }));
            return true;
          } else {
            set({ isLoading: false });
            return false;
          }
        } catch (error) {
          console.error('Profile update error:', error);
          set({ isLoading: false });
          return false;
        }
      },
      
      addAddress: async (address: Omit<Address, 'id'>) => {
        const { token } = get();
        if (!token) return false;
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/addresses`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(address),
          });
          
          const result = await response.json();
          
          if (result.success) {
            set(state => ({
              user: {
                ...state.user!,
                addresses: [...state.user!.addresses, result.data],
              }
            }));
            return true;
          }
          return false;
        } catch (error) {
          console.error('Add address error:', error);
          return false;
        }
      },
      
      updateAddress: async (addressId: string, address: Partial<Address>) => {
        const { token } = get();
        if (!token) return false;
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/addresses/${addressId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(address),
          });
          
          const result = await response.json();
          
          if (result.success) {
            set(state => ({
              user: {
                ...state.user!,
                addresses: state.user!.addresses.map(addr =>
                  addr.id === addressId ? { ...addr, ...result.data } : addr
                ),
              }
            }));
            return true;
          }
          return false;
        } catch (error) {
          console.error('Update address error:', error);
          return false;
        }
      },
      
      deleteAddress: async (addressId: string) => {
        const { token } = get();
        if (!token) return false;
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/addresses/${addressId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          const result = await response.json();
          
          if (result.success) {
            set(state => ({
              user: {
                ...state.user!,
                addresses: state.user!.addresses.filter(addr => addr.id !== addressId),
              }
            }));
            return true;
          }
          return false;
        } catch (error) {
          console.error('Delete address error:', error);
          return false;
        }
      },
      
      setDefaultAddress: async (addressId: string) => {
        const { token } = get();
        if (!token) return false;
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/addresses/${addressId}/default`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          const result = await response.json();
          
          if (result.success) {
            set(state => ({
              user: {
                ...state.user!,
                addresses: state.user!.addresses.map(addr => ({
                  ...addr,
                  isDefault: addr.id === addressId,
                })),
              }
            }));
            return true;
          }
          return false;
        } catch (error) {
          console.error('Set default address error:', error);
          return false;
        }
      },
      
      refreshToken: async () => {
        const { token } = get();
        if (!token) return false;
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          const result = await response.json();
          
          if (result.success) {
            set({ token: result.data.token });
            return true;
          } else {
            get().logout();
            return false;
          }
        } catch (error) {
          console.error('Token refresh error:', error);
          get().logout();
          return false;
        }
      },
    }),
    {
      name: 'flower-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);