import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - FlowerShop | Contactez notre équipe de fleuristes experts',
  description: 'Contactez FlowerShop pour vos projets floraux. Notre équipe passionnée vous accompagne dans la création de bouquets uniques et arrangements sur-mesure.',
  keywords: ['contact fleuriste', 'devis fleurs', 'conseil floral', 'fleuriste Paris', 'commande personnalisée'],
  openGraph: {
    title: 'Contactez FlowerShop - Experts en art floral',
    description: 'Échangeons sur vos projets floraux. Conseil, devis et créations sur-mesure par nos fleuristes passionnés.',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}