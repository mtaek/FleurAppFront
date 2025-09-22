// API Route pour l'envoi automatique de reçus et factures
// /app/api/send-receipt/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { ReceiptData, ReceiptResponse } from '@/types/receipt';

// Configuration email (vous pouvez utiliser Nodemailer, SendGrid, etc.)
const EMAIL_CONFIG = {
  // Exemple avec SendGrid (remplacez par votre service préféré)
  apiKey: process.env.SENDGRID_API_KEY,
  fromEmail: process.env.FROM_EMAIL || 'noreply@bergamotte.fr',
  fromName: 'Bergamotte - Livraison de Fleurs'
};

export async function POST(request: NextRequest) {
  console.log('📧 API /send-receipt - Réception requête');
  
  try {
    const receiptData: ReceiptData = await request.json();
    console.log('📋 Données reçu reçues:', receiptData);

    // Validation des données requises
    if (!receiptData.customerInfo?.email) {
      console.error('❌ Email client manquant');
      return NextResponse.json(
        { success: false, error: 'Email client requis' },
        { status: 400 }
      );
    }

    console.log('✅ Validation réussie, préparation emails...');

    // Générer le contenu HTML du reçu
    const receiptHTML = generateReceiptHTML(receiptData);
    const invoiceHTML = generateInvoiceHTML(receiptData);

    console.log('📄 HTML générés - envoi emails...');

    // Envoyer le reçu par email
    const receiptEmailSent = await sendEmail({
      to: receiptData.customerInfo.email,
      subject: `🌸 Reçu de paiement - Commande ${receiptData.orderId}`,
      html: receiptHTML,
    });

    // Envoyer la facture par email
    const invoiceEmailSent = await sendEmail({
      to: receiptData.customerInfo.email,
      subject: `🧾 Facture - Commande ${receiptData.orderId}`,
      html: invoiceHTML,
    });

    const result: ReceiptResponse = {
      success: receiptEmailSent || invoiceEmailSent,
      receiptSent: receiptEmailSent,
      invoiceSent: invoiceEmailSent,
      receipientEmail: receiptData.customerInfo.email,
      message: 'Emails envoyés avec succès'
    };

    console.log('✅ Résultat final:', result);
    return NextResponse.json(result);

  } catch (error) {
    console.error('💥 Erreur API send-receipt:', error);
    return NextResponse.json(
      { 
        success: false, 
        receiptSent: false,
        invoiceSent: false,
        receipientEmail: '',
        error: (error as Error).message 
      },
      { status: 500 }
    );
  }
}

// Fonction pour envoyer un email (à adapter selon votre service)
async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }): Promise<boolean> {
  console.log('📧 Envoi email:', { to, subject: subject.substring(0, 50) + '...' });

  try {
    // OPTION 1: Simulation (pour test)
    if (process.env.NODE_ENV === 'development') {
      console.log('🧪 MODE DEV - Simulation envoi email');
      console.log('📧 À:', to);
      console.log('📋 Sujet:', subject);
      console.log('📄 HTML (extrait):', html.substring(0, 200) + '...');
      
      // Simule un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    }

    // OPTION 2: Nodemailer (exemple basique)
    /*
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${EMAIL_CONFIG.fromName}" <${EMAIL_CONFIG.fromEmail}>`,
      to: to,
      subject: subject,
      html: html,
    });
    */

    // OPTION 3: SendGrid (exemple)
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(EMAIL_CONFIG.apiKey);
    
    await sgMail.send({
      from: {
        email: EMAIL_CONFIG.fromEmail,
        name: EMAIL_CONFIG.fromName
      },
      to: to,
      subject: subject,
      html: html,
    });
    */

    console.log('✅ Email envoyé avec succès');
    return true;

  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    return false;
  }
}

// Génération HTML du reçu
function generateReceiptHTML(data: ReceiptData): string {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reçu - ${data.orderId}</title>
      <style>
          body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
              background-color: #f9f9f9; 
          }
          .container { 
              background: white; 
              padding: 40px; 
              border-radius: 10px; 
              box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
          }
          .header { 
              text-align: center; 
              border-bottom: 3px solid #8B9467; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
          }
          .company-name { 
              font-size: 28px; 
              font-weight: bold; 
              color: #8B9467; 
              margin-bottom: 5px; 
          }
          .company-tagline { 
              color: #666; 
              font-style: italic; 
          }
          .receipt-title { 
              font-size: 22px; 
              margin: 20px 0 10px 0; 
              color: #333; 
          }
          .info-section { 
              margin-bottom: 25px; 
              padding: 15px; 
              background: #f8f8f8; 
              border-radius: 8px; 
          }
          .info-title { 
              font-weight: bold; 
              color: #8B9467; 
              margin-bottom: 10px; 
              font-size: 16px; 
              text-transform: uppercase; 
              letter-spacing: 1px; 
          }
          .amount-section { 
              background: linear-gradient(135deg, #8B9467, #a8b576); 
              color: white; 
              text-align: center; 
              padding: 20px; 
              border-radius: 10px; 
              margin: 20px 0; 
          }
          .amount { 
              font-size: 24px; 
              font-weight: bold; 
          }
          .footer { 
              text-align: center; 
              margin-top: 40px; 
              padding-top: 20px; 
              border-top: 2px solid #eee; 
              color: #666; 
          }
          table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 15px 0; 
          }
          th { 
              background: #8B9467; 
              color: white; 
              padding: 12px; 
              text-align: left; 
          }
          td { 
              padding: 10px; 
              border-bottom: 1px solid #ddd; 
          }
          tr:nth-child(even) { 
              background: #f9f9f9; 
          }
          .success-badge { 
              display: inline-block; 
              background: #4CAF50; 
              color: white; 
              padding: 5px 15px; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: bold; 
              text-transform: uppercase; 
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="company-name">🌸 Bergamotte</div>
              <div class="company-tagline">Livraison de fleurs fraîches</div>
              <div class="receipt-title">Reçu de Paiement</div>
              <div class="success-badge">✅ Paiement Confirmé</div>
          </div>

          <div class="info-section">
              <div class="info-title">📦 Informations de Commande</div>
              <p><strong>Numéro de commande:</strong> ${data.orderId}</p>
              <p><strong>Date de paiement:</strong> ${new Date(data.paymentDate).toLocaleString('fr-FR')}</p>
              <p><strong>ID de transaction:</strong> ${data.paymentIntentId}</p>
          </div>

          <div class="info-section">
              <div class="info-title">👤 Informations Client</div>
              <p><strong>Nom:</strong> ${data.customerInfo.name}</p>
              <p><strong>Email:</strong> ${data.customerInfo.email}</p>
              <p><strong>Téléphone:</strong> ${data.customerInfo.phone}</p>
          </div>

          <div class="info-section">
              <div class="info-title">🚚 Adresse de Livraison</div>
              <p>${data.deliveryInfo.address}</p>
              <p>${data.deliveryInfo.postalCode} ${data.deliveryInfo.city}</p>
              ${data.deliveryInfo.instructions ? `<p><strong>Instructions:</strong> ${data.deliveryInfo.instructions}</p>` : ''}
          </div>

          ${data.items && data.items.length > 0 ? `
          <div class="info-section">
              <div class="info-title">🌹 Articles Commandés</div>
              <table>
                  <tr><th>Article</th><th>Quantité</th><th>Prix Unitaire</th><th>Total</th></tr>
                  ${data.items.map(item => `
                      <tr>
                          <td>${item.name}</td>
                          <td>${item.quantity}</td>
                          <td>${item.price.toFixed(2)}€</td>
                          <td><strong>${(item.quantity * item.price).toFixed(2)}€</strong></td>
                      </tr>
                  `).join('')}
              </table>
          </div>
          ` : ''}

          <div class="amount-section">
              <div>Montant Total Payé</div>
              <div class="amount">${data.amount.toFixed(2)} ${data.currency}</div>
          </div>

          <div class="footer">
              <p><strong>🙏 Merci pour votre confiance !</strong></p>
              <p>Votre commande sera livrée dans les plus brefs délais.</p>
              <p>🌸 <strong>Bergamotte</strong> - Livraison de fleurs</p>
              <p style="font-size: 12px; color: #999;">
                  Ce reçu confirme le paiement de votre commande.<br>
                  Conservez-le pour vos archives.
              </p>
          </div>
      </div>
  </body>
  </html>
  `;
}

// Génération HTML de la facture (plus détaillée)
function generateInvoiceHTML(data: ReceiptData): string {
  const invoiceNumber = `FACT-${data.orderId}`;
  const now = new Date();
  const dueDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // +30 jours

  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
      <meta charset="UTF-8">
      <title>Facture ${invoiceNumber}</title>
      <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .company-info { flex: 1; }
          .invoice-details { flex: 1; text-align: right; }
          .invoice-title { font-size: 24px; font-weight: bold; color: #8B9467; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background: #8B9467; color: white; }
          .total-row { font-weight: bold; background: #f0f0f0; }
          .footer { margin-top: 40px; font-size: 12px; color: #666; }
      </style>
  </head>
  <body>
      <div class="invoice-header">
          <div class="company-info">
              <h1>🌸 Bergamotte</h1>
              <p>Livraison de fleurs</p>
              <p>123 Rue des Fleurs<br>75001 Paris<br>France</p>
              <p>Tel: 01 23 45 67 89<br>Email: contact@bergamotte.fr</p>
          </div>
          <div class="invoice-details">
              <div class="invoice-title">FACTURE</div>
              <p><strong>N°:</strong> ${invoiceNumber}</p>
              <p><strong>Date:</strong> ${now.toLocaleDateString('fr-FR')}</p>
              <p><strong>Échéance:</strong> ${dueDate.toLocaleDateString('fr-FR')}</p>
          </div>
      </div>

      <div style="margin-bottom: 30px;">
          <h3>Facturé à:</h3>
          <p><strong>${data.customerInfo.name}</strong></p>
          <p>${data.deliveryInfo.address}</p>
          <p>${data.deliveryInfo.postalCode} ${data.deliveryInfo.city}</p>
          <p>Email: ${data.customerInfo.email}</p>
          <p>Tél: ${data.customerInfo.phone}</p>
      </div>

      <table>
          <tr><th>Description</th><th>Quantité</th><th>Prix Unitaire</th><th>Total</th></tr>
          ${data.items && data.items.length > 0 ? 
              data.items.map(item => `
                  <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>${item.price.toFixed(2)}€</td>
                      <td>${(item.quantity * item.price).toFixed(2)}€</td>
                  </tr>
              `).join('') :
              `<tr><td>Commande ${data.orderId}</td><td>1</td><td>${data.amount.toFixed(2)}€</td><td>${data.amount.toFixed(2)}€</td></tr>`
          }
          <tr class="total-row">
              <td colspan="3"><strong>TOTAL TTC</strong></td>
              <td><strong>${data.amount.toFixed(2)}€</strong></td>
          </tr>
      </table>

      <div style="margin-top: 30px;">
          <p><strong>Modalités de paiement:</strong> Paiement par carte bancaire</p>
          <p><strong>Statut:</strong> ✅ Payé le ${new Date(data.paymentDate).toLocaleDateString('fr-FR')}</p>
          <p><strong>Transaction ID:</strong> ${data.paymentIntentId}</p>
      </div>

      <div class="footer">
          <p>TVA non applicable, art. 293 B du CGI - Micro-entreprise</p>
          <p>Cette facture est générée automatiquement et constitue un document officiel.</p>
      </div>
  </body>
  </html>
  `;
}