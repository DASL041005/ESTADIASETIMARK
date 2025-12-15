import React from "react";
import "./CartDrawer.css";
import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeItemFromCart, updateItemQuantity, getCartTotal } = useCart();

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Mi Bolsa</h2>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Tu bolsa está vacía.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} />

              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>${item.price.toFixed(2)}</p>

                <div className="quantity-controls">
                  <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <button className="remove-btn" onClick={() => removeItemFromCart(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <h3>Total: ${getCartTotal().toFixed(2)}</h3>
        <button className="checkout-btn">Proceder al Pago</button>
      </div>
    </div>
  );
};

export default CartDrawer;
