'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DocumentArrowDownIcon, EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { ReceiptService } from '@/services/receiptService';
import { ReceiptData } from '@/types/receipt';
import toast from 'react-hot-toast';

interface ReceiptOptionsProps {
  receiptData: ReceiptData;
  emailSent: boolean;
  onResendEmail?: () => void;
  className?: string;
}

export default function ReceiptOptions({
  receiptData,
  emailSent,
  onResendEmail,
  className = ''
}: ReceiptOptionsProps) {
  const handleDownloadReceipt = () => {
    console.log('💾 Téléchargement du reçu demandé');
    ReceiptService.downloadReceipt(receiptData);
    toast.success('📄 Reçu téléchargé !');
  };

  const handleResendEmail = () => {
    console.log('📧 Renvoi email demandé');
    if (onResendEmail) {
      onResendEmail();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-sage-50 border border-sage-200 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center mb-3">
        <CheckCircleIcon className="h-5 w-5 text-sage-600 mr-2" />
        <h3 className="font-medium text-sage-900">Votre reçu</h3>
      </div>

      {emailSent ? (
        <div className="mb-4">
          <div className="flex items-center text-sm text-green-700 bg-green-100 rounded-md p-3">
            <EnvelopeIcon className="h-4 w-4 mr-2" />
            <span>✅ Reçu envoyé par email à {receiptData.customerInfo.email}</span>
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <div className="flex items-center text-sm text-amber-700 bg-amber-100 rounded-md p-3">
            <EnvelopeIcon className="h-4 w-4 mr-2" />
            <span>⚠️ L&apos;envoi automatique a échoué</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <button
          onClick={handleDownloadReceipt}
          className="flex items-center justify-center w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
        >
          <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
          Télécharger le reçu
        </button>

        {!emailSent && onResendEmail && (
          <button
            onClick={handleResendEmail}
            className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <EnvelopeIcon className="h-4 w-4 mr-2" />
            Renvoyer par email
          </button>
        )}
      </div>

      <div className="mt-3 text-xs text-sage-600 text-center">
        <p>Commande: {receiptData.orderId}</p>
        <p>Transaction: {receiptData.paymentIntentId.substring(0, 20)}...</p>
      </div>
    </motion.div>
  );
}