import { Ville } from '@/types';

const API_BASE_URL = 'http://localhost:8080/api';

export const villesService = {
  async getVilles(): Promise<Ville[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/villes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const villes: Ville[] = await response.json();
      // Filtrer seulement les villes actives
      return villes.filter(ville => ville.actif === true);
    } catch (error) {
      console.error('Erreur lors de la récupération des villes:', error);
      // Retourner une liste par défaut en cas d'erreur
      return [
        { id: '1', nom: 'Paris', codePostal: '75001', actif: true },
        { id: '2', nom: 'Lyon', codePostal: '69001', actif: true },
        { id: '3', nom: 'Marseille', codePostal: '13001', actif: true }
      ];
    }
  }
};