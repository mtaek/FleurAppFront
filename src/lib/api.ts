import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const authStorage = localStorage.getItem('flower-auth-storage');
          if (authStorage) {
            try {
              const parsed = JSON.parse(authStorage);
              const token = parsed.state?.token;
              if (token) {
                config.headers.Authorization = `Bearer ${token}`;
              }
            } catch (error) {
              console.error('Error parsing auth storage:', error);
            }
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired, try to refresh or redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('flower-auth-storage');
            window.location.href = '/auth/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Products API
  async getProducts(params?: any) {
    const response = await this.client.get('/api/produits', { params });
    return response.data;
  }

  async getProduct(id: string) {
    const response = await this.client.get(`/api/produits/${id}`);
    return response.data;
  }

  async getCategories() {
    const response = await this.client.get('/api/categories');
    return response.data;
  }

  // Orders API
  async createOrder(orderData: any) {
    const response = await this.client.post('/api/commandes', orderData);
    return response.data;
  }

  async getOrders() {
    const response = await this.client.get('/api/commandes');
    return response.data;
  }

  async getOrder(id: string) {
    const response = await this.client.get(`/api/commandes/${id}`);
    return response.data;
  }

  async getOrderTracking(id: string) {
    const response = await this.client.get(`/api/commandes/${id}/tracking`);
    return response.data;
  }

  // User API
  async updateProfile(userData: any) {
    const response = await this.client.put('/api/user/profile', userData);
    return response.data;
  }

  async addAddress(address: any) {
    const response = await this.client.post('/api/user/addresses', address);
    return response.data;
  }

  async updateAddress(addressId: string, address: any) {
    const response = await this.client.put(`/api/user/addresses/${addressId}`, address);
    return response.data;
  }

  async deleteAddress(addressId: string) {
    const response = await this.client.delete(`/api/user/addresses/${addressId}`);
    return response.data;
  }

  // Payment API
  async createPaymentIntent(amount: number, currency = 'eur') {
    const response = await this.client.post('/api/payments/create-intent', {
      amount,
      currency,
    });
    return response.data;
  }

  async confirmPayment(paymentIntentId: string) {
    const response = await this.client.post('/api/payments/confirm', {
      paymentIntentId,
    });
    return response.data;
  }

  // Contact API
  async submitContactForm(formData: any) {
    const response = await this.client.post('/api/contact', formData);
    return response.data;
  }

  async subscribeNewsletter(email: string) {
    const response = await this.client.post('/api/newsletter/subscribe', { email });
    return response.data;
  }

  // Coupons API
  async validateCoupon(code: string) {
    const response = await this.client.post('/api/coupons/validate', { code });
    return response.data;
  }
}

export const apiClient = new ApiClient();