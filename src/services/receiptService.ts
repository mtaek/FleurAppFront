// Service pour l'envoi automatique de reçus et factures après paiement Stripe

import { ReceiptData, InvoiceData, ReceiptResponse } from '@/types/receipt';
import { DeliveryInfo } from '@/types';

export class ReceiptService {
  private static readonly API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  /**
   * Envoie automatiquement un reçu et une facture après un paiement réussi
   */
  static async sendReceiptAndInvoice(
    paymentIntentId: string,
    orderId: string,
    amount: number,
    deliveryInfo: DeliveryInfo,
    cartItems?: Array<{name: string, quantity: number, price: number}>
  ): Promise<ReceiptResponse> {
    console.log('\n📧 === ENVOI AUTOMATIQUE REÇU + FACTURE ===');
    console.log('🔑 PaymentIntent ID:', paymentIntentId);
    console.log('📦 Order ID:', orderId);
    console.log('💰 Montant:', amount, '€');
    console.log('👤 Client:', `${deliveryInfo.firstName} ${deliveryInfo.lastName}`);
    console.log('📧 Email:', deliveryInfo.email);

    try {
      // Préparer les données pour le reçu
      const receiptData: ReceiptData = {
        paymentIntentId,
        orderId,
        amount,
        currency: 'EUR',
        customerInfo: {
          name: `${deliveryInfo.firstName} ${deliveryInfo.lastName}`,
          email: deliveryInfo.email,
          phone: deliveryInfo.phone,
        },
        deliveryInfo: {
          address: deliveryInfo.address,
          city: deliveryInfo.city,
          postalCode: deliveryInfo.postalCode,
          instructions: deliveryInfo.instructions,
        },
        paymentDate: new Date().toISOString(),
        items: cartItems,
      };

      console.log('📋 Données du reçu préparées:', receiptData);

      // Appeler l'API backend pour envoyer reçu + facture
      const response = await fetch(`${this.API_URL}/send-receipt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receiptData),
      });

      console.log('📊 Réponse API reçu:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('❌ Erreur envoi reçu:', errorData);
        throw new Error(errorData?.message || `Erreur ${response.status}`);
      }

      const result: ReceiptResponse = await response.json();
      console.log('✅ Résultat envoi:', result);

      return result;
    } catch (error) {
      console.error('💥 Erreur lors de l\'envoi du reçu:', error);
      return {
        success: false,
        receiptSent: false,
        invoiceSent: false,
        receipientEmail: deliveryInfo.email,
        error: (error as Error).message,
      };
    }
  }

  /**
   * Génère un PDF de reçu côté frontend (fallback)
   */
  static async generateReceiptPDF(receiptData: ReceiptData): Promise<Blob> {
    console.log('📄 Génération PDF reçu côté frontend...');
    
    // Ici vous pourriez utiliser une librairie comme jsPDF
    // Pour l'instant, on retourne un PDF basique
    const content = this.generateReceiptHTML(receiptData);
    
    // Conversion HTML vers PDF (nécessiterait une librairie comme puppeteer ou jsPDF)
    // Pour l'instant, on retourne un blob text
    return new Blob([content], { type: 'text/html' });
  }

  /**
   * Génère le HTML du reçu
   */
  private static generateReceiptHTML(data: ReceiptData): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Reçu - Commande ${data.orderId}</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #8B9467; padding-bottom: 20px; margin-bottom: 30px; }
            .company-name { font-size: 24px; font-weight: bold; color: #8B9467; }
            .receipt-title { font-size: 20px; margin-top: 10px; }
            .info-section { margin-bottom: 20px; }
            .info-title { font-weight: bold; color: #8B9467; margin-bottom: 10px; }
            .amount { font-size: 18px; font-weight: bold; color: #8B9467; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="company-name">🌸 Bergamotte</div>
            <div class="receipt-title">Reçu de Paiement</div>
        </div>

        <div class="info-section">
            <div class="info-title">Informations de Commande</div>
            <p><strong>Numéro de commande:</strong> ${data.orderId}</p>
            <p><strong>Date de paiement:</strong> ${new Date(data.paymentDate).toLocaleDateString('fr-FR')}</p>
            <p><strong>ID de transaction:</strong> ${data.paymentIntentId}</p>
        </div>

        <div class="info-section">
            <div class="info-title">Informations Client</div>
            <p><strong>Nom:</strong> ${data.customerInfo.name}</p>
            <p><strong>Email:</strong> ${data.customerInfo.email}</p>
            <p><strong>Téléphone:</strong> ${data.customerInfo.phone}</p>
        </div>

        <div class="info-section">
            <div class="info-title">Adresse de Livraison</div>
            <p>${data.deliveryInfo.address}</p>
            <p>${data.deliveryInfo.postalCode} ${data.deliveryInfo.city}</p>
            ${data.deliveryInfo.instructions ? `<p><strong>Instructions:</strong> ${data.deliveryInfo.instructions}</p>` : ''}
        </div>

        ${data.items ? `
        <div class="info-section">
            <div class="info-title">Articles Commandés</div>
            <table>
                <tr><th>Article</th><th>Quantité</th><th>Prix</th><th>Total</th></tr>
                ${data.items.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price.toFixed(2)}€</td>
                        <td>${(item.quantity * item.price).toFixed(2)}€</td>
                    </tr>
                `).join('')}
            </table>
        </div>
        ` : ''}

        <div class="info-section">
            <div class="info-title">Montant Total</div>
            <p class="amount">${data.amount.toFixed(2)} ${data.currency}</p>
        </div>

        <div class="footer">
            <p>Merci pour votre confiance !</p>
            <p>🌸 Bergamotte - Livraison de fleurs</p>
        </div>
    </body>
    </html>
    `;
  }

  /**
   * Télécharge le reçu PDF
   */
  static downloadReceipt(receiptData: ReceiptData) {
    console.log('💾 Téléchargement du reçu...');
    const htmlContent = this.generateReceiptHTML(receiptData);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `recu-${receiptData.orderId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('✅ Reçu téléchargé:', `recu-${receiptData.orderId}.html`);
  }
}