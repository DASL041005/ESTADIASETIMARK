export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  stock: number;
  imageUrl: string;
  category: string; // si quieres union literal, hazla consistente: 'ROLLOS'|'SOFTWARE'|...
  rating: number;
  isOffer: boolean;
}
