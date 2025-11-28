// src/components/ProductCard.tsx
import React from 'react';
import  type { Product } from '../types/Product';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart() as unknown as { addToCart: (product: Product, quantity: number) => void };
  
  // Función para manejar el error de carga de imagen
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Si la imagen falla, usamos un placeholder genérico con el nombre del producto
    const placeholderUrl = `https://placehold.co/400x300/E0E0E0/333?text=${encodeURIComponent(product.name)}`;
    e.currentTarget.src = placeholderUrl;
  };


  return (
    <div className="product-card" onClick={() => navigate(`/productos/${product.id}`)}>
      <div className="product-image-container">
        <img 
          src={product.imageUrl} 
          alt={`Imagen de ${product.name}`} 
          className="product-image"
          onError={handleImageError} // ⬅️ MANEJO DE ERROR
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)} USD</p>
        <p className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {product.stock > 0 ? `En stock: ${product.stock}` : 'Agotado'}
        </p>
        <button 
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation(); // Evita navegar a la página de detalle
            addToCart(product, 1);
          }}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
