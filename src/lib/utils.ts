import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function getImageUrl(path: string): string {
  if (!path) return '/assets/images/products/bouquet_salon.jpeg';
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${path}`;
}

export function getOrderStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    pending: 'En attente',
    confirmed: 'Confirmé',
    preparing: 'En préparation',
    out_for_delivery: 'En livraison',
    delivered: 'Livré',
    cancelled: 'Annulé',
    refunded: 'Remboursé',
  };
  return statusLabels[status] || status;
}

export function getOrderStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    pending: 'text-yellow-600 bg-yellow-100',
    confirmed: 'text-blue-600 bg-blue-100',
    preparing: 'text-orange-600 bg-orange-100',
    out_for_delivery: 'text-purple-600 bg-purple-100',
    delivered: 'text-green-600 bg-green-100',
    cancelled: 'text-red-600 bg-red-100',
    refunded: 'text-gray-600 bg-gray-100',
  };
  return statusColors[status] || 'text-gray-600 bg-gray-100';
}

export function calculateDeliveryDate(orderDate: Date, deliveryDays = 1): Date {
  const delivery = new Date(orderDate);
  delivery.setDate(delivery.getDate() + deliveryDays);
  
  // Skip weekends for same-day delivery
  if (delivery.getDay() === 0) delivery.setDate(delivery.getDate() + 1); // Sunday
  if (delivery.getDay() === 6) delivery.setDate(delivery.getDate() + 2); // Saturday
  
  return delivery;
}

export function isBusinessDay(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5; // Monday to Friday
}

export function getNextBusinessDay(date: Date = new Date()): Date {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  
  while (!isBusinessDay(nextDay)) {
    nextDay.setDate(nextDay.getDate() + 1);
  }
  
  return nextDay;
}