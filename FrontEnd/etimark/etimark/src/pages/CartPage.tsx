// src/pages/CartPage.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage: React.FC = () => {
  const { cartItems, removeItemFromCart, updateItemQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert('¡Procesando pedido! Redirigiendo a la pasarela de pago...');
    // Lógica de checkout / redirección de pago iría aquí
  };

  const CartItemRow: React.FC<{ item: typeof cartItems[0] }> = ({ item }) => (
    <div className="cart-item-row">
      <div className="item-image-container">
        <img src={item.imageUrl} alt={item.name} className="item-image" />
      </div>
      
      <div className="item-details">
        <h4 className="item-name">{item.name}</h4>
        <p className="item-description-small">{item.description}</p>
        <p className="item-price-unit">${item.price.toFixed(2)} c/u</p>
      </div>

      <div className="item-quantity-control">
        <button 
            className="quantity-btn" 
            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
        >
            -
        </button>
        <input 
            type="number" 
            min="1" 
            value={item.quantity} 
            onChange={(e) => updateItemQuantity(item.id, Number(e.target.value))}
            className="quantity-input-small"
        />
        <button 
            className="quantity-btn" 
            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
        >
            +
        </button>
      </div>

      <div className="item-subtotal">
        <span className="subtotal-label">Subtotal:</span>
        <span className="subtotal-amount">${(item.price * item.quantity).toFixed(2)}</span>
      </div>

      <button className="remove-item-btn" onClick={() => removeItemFromCart(item.id)}>
        ×
      </button>
    </div>
  );

  return (
    <div className="cart-page-container">
      <h1 className="cart-title">Mi Bolsa</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Tu carrito está vacío.</h2>
          <p>¡Explora nuestros productos y encuentra lo que necesitas!</p>
          <button className="continue-shopping-btn" onClick={() => navigate('/dashboard')}>
            Continuar Comprando
          </button>
        </div>
      ) : (
        <div className="cart-content-wrapper">
          
          <div className="cart-items-list">
            {cartItems.map(item => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-summary-panel">
            <h3 className="summary-title">Resumen de tu Pedido</h3>
            
            <div className="summary-line">
                <span>Total de Productos:</span>
                <span>{cartItems.length}</span>
            </div>

            <div className="summary-line total-line">
                <span>Total a Pagar:</span>
                <span className="final-total-amount">${getCartTotal().toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Levantar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
