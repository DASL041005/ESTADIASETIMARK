import type { Product } from "../types/Product";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Rollo Térmico 57x40",
    description: "Ideal para tickets de punto de venta",
    price: 120,
    stock: 50,
    imageUrl: "/images/rollo-a.jpg",
    category: "ROLLOS",
    rating: 4.5,
    isOffer: false,
  },
  {
    id: 2,
    name: "Rollo Transferencia 76x25",
    description: "Alta duración para etiquetado industrial",
    price: 180,
    stock: 30,
    imageUrl: "/images/rollo-b.jpg",
    category: "ROLLOS",
    rating: 4.7,
    isOffer: true,
  }
];
