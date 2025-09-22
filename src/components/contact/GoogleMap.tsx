'use client';

interface GoogleMapProps {
  address?: string;
  className?: string;
}

export default function GoogleMap({ 
  address = "123 Rue des Fleurs, 75001 Paris, France",
  className = "w-full h-64 lg:h-80 rounded-2xl"
}: GoogleMapProps) {
  // Pour l'instant, on utilise un placeholder
  // En production, vous pouvez intégrer Google Maps API ou autre service de cartographie
  
  return (
    <div className={`${className} bg-sage-100 flex items-center justify-center relative overflow-hidden`}>
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-sage-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🗺️</span>
        </div>
        <p className="text-sage-600 font-light text-lg mb-2">
          Carte interactive
        </p>
        <p className="text-sm text-sage-500">
          {address}
        </p>
        <p className="text-xs text-sage-400 mt-3">
          Intégration Google Maps disponible en production
        </p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-6 left-6 w-10 h-10 bg-sage-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-8 right-8 w-8 h-8 bg-gold-200 rounded-full opacity-60"></div>
      <div className="absolute top-1/3 right-12 w-6 h-6 bg-sage-300 rounded-full opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-cream-300 rounded-full opacity-50"></div>
    </div>
  );
}