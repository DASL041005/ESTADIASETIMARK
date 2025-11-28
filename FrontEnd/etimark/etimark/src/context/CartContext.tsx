// src/context/CartContext.tsx
import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/Product';

// 1. Definir el tipo para un ítem del carrito (producto + cantidad)
export interface CartItem extends Product {
  quantity: number;
}

// 2. Definir el tipo para el valor del Contexto
interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (product: Product, quantity: number) => void;
  removeItemFromCart: (productId: number) => void;
  updateItemQuantity: (productId: number, newQuantity: number) => void;
  getCartTotal: () => number;
}

// 3. Crear el Contexto con un valor inicial nulo
const CartContext = createContext<CartContextType | undefined>(undefined);

// 4. Hook para usar el carrito fácilmente en cualquier componente
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// 5. Proveedor del Contexto
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Lógica principal: Añadir o Actualizar un producto
  const addItemToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

      if (existingItemIndex > -1) {
        // Si el producto ya existe, actualiza la cantidad
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Si es un producto nuevo, lo añade
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Lógica para quitar completamente un producto del carrito
  const removeItemFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Lógica para cambiar manualmente la cantidad de un ítem
  const updateItemQuantity = (productId: number, newQuantity: number) => {
    setCartItems(prevItems => {
      return prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) } // Asegura que la cantidad sea al menos 1
          : item
      );
    });
  };
    
  // Calcula el total del carrito
  const getCartTotal = useMemo(() => () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);


  const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;