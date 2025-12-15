import type { Product } from "../types/Product";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Etiqueta 57x40 Térmica",
    description: "Rollo térmico estándar para tickets.",
    price: 55.0,
    stock: 120,
    imageUrl: "https://placehold.co/600x400?text=57x40",
    category: "ROLLOS",
    rating: 4.5,
    isOffer: false
  },
  {
    id: 2,
    name: "Etiqueta 31x19 Transferencia",
    description: "Etiqueta para impresoras de transferencia térmica.",
    price: 75.0,
    stock: 80,
    imageUrl: "https://placehold.co/600x400?text=31x19",
    category: "ROLLOS",
    rating: 4.8,
    isOffer: true
  }
];
