// Types pour la génération automatique de reçus et factures

export interface ReceiptData {
  paymentIntentId: string;
  orderId: string;
  amount: number;
  currency: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  deliveryInfo: {
    address: string;
    city: string;
    postalCode: string;
    instructions?: string;
  };
  paymentDate: string;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export interface InvoiceData extends ReceiptData {
  invoiceNumber: string;
  dueDate: string;
  taxAmount: number;
  subtotal: number;
  companyInfo: {
    name: string;
    address: string;
    siret: string;
    email: string;
    phone: string;
  };
}

export interface EmailTemplate {
  to: string;
  subject: string;
  htmlContent: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType: string;
  }>;
}

export interface ReceiptResponse {
  success: boolean;
  receiptSent: boolean;
  invoiceSent: boolean;
  receipientEmail: string;
  message?: string;
  error?: string;
}