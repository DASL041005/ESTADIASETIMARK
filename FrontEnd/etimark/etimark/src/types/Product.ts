export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  stock: number;
  imageUrl: string;
  category: string;
  rating: number;
  isOffer: boolean;
}
