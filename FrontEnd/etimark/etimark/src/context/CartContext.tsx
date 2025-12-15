import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/Product';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void; // nombre canonical
  removeItemFromCart: (productId: number) => void;
  updateItemQuantity: (productId: number, newQuantity: number) => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe ser usado dentro de un CartProvider');
  return context;
};

interface CartProviderProps { children: ReactNode; }

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
        return copy;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeItemFromCart = (productId: number) =>
    setCartItems(prev => prev.filter(i => i.id !== productId));

  const updateItemQuantity = (productId: number, newQuantity: number) =>
    setCartItems(prev => prev.map(i => i.id === productId ? { ...i, quantity: Math.max(1, newQuantity) } : i));

  const getCartTotal = useMemo(() => () => cartItems.reduce((s, i) => s + i.price * i.quantity, 0), [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItemFromCart, updateItemQuantity, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
