// src/pages/ProductDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css'; // <-- La importación correcta de los estilos de la página
import type { Product } from '../types/Product';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  type CartActions = {
    addToCart?: (product: Product, qty: number) => void;
    addItem?: (product: Product, qty: number) => void;
  };
  const cart = useCart() as unknown as CartActions;
  const addToCart = cart.addToCart;
  const productId = parseInt(id || '0', 10);

  useEffect(() => {
    // Buscar el producto por ID en los datos simulados
    const foundProduct = mockProducts.find(p => p.id === productId);
    setProduct(foundProduct || null);
  }, [productId]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Si la imagen falla, usamos un placeholder genérico con el nombre del producto
    const placeholderText = product?.name || "PRODUCTO ETIMARK";
    const placeholderUrl = `https://placehold.co/600x450/E0E0E0/333?text=${encodeURIComponent(placeholderText)}`;
    e.currentTarget.src = placeholderUrl;
  };
  
  if (!product) {
    return <div className="detail-loading">Cargando producto o Producto no encontrado...</div>;
  }

  // Lógica para limitar la cantidad al stock
  const maxQuantity = product.stock > 0 ? product.stock : 1;

  return (
    <div className="product-detail-page">
      <div className="product-detail-content">
        
        {/* Columna de Imagen */}
        <div className="product-detail-image-gallery">
          <img 
            src={product.imageUrl} 
            alt={`Imagen principal de ${product.name}`} 
            className="main-product-image" 
            onError={handleImageError} 
          />
          {/* Se podrían agregar miniaturas aquí si hubiera más imágenes */}
        </div>

        {/* Columna de Información */}
        <div className="product-detail-info">
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-category">Categoría: {product.category}</p>
          <div className="detail-price-box">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            <span className="detail-currency">USD</span>
          </div>
          
          <div className="detail-status">
            <span className={`detail-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? `En Stock: ${product.stock} unidades` : 'Agotado Temporalmente'}
            </span>
          </div>

          <p className="detail-description-header">Descripción del Producto:</p>
          <p className="detail-description">{product.description}</p>
          
          {/* Controles de Compra */}
          <div className="detail-purchase-controls">
            <div className="quantity-control">
              <label htmlFor="quantity">Cantidad:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, maxQuantity))}
                min={1}
                max={maxQuantity}
              />
            </div>

            <button
              className="detail-add-to-cart-btn"
              onClick={() => {
                if (addToCart) {
                  addToCart(product, quantity);
                } else if (typeof cart.addItem === 'function') {
                  // fallback if your context exposes a different method name
                  cart.addItem(product, quantity);
                } else {
                  // no-op or notify developer; avoids runtime crash if API is different
                  console.warn('Cart context has no addToCart or addItem method');
                }
              }}
              disabled={product.stock === 0 || quantity > product.stock || quantity <= 0}
            >
              Añadir a Mi Bolsa
            </button>
          </div>
          
          {product.stock > 0 && <p className="detail-shipping-info">🚚 Envío gratis a partir de 100 USD.</p>}
          
        </div>
      </div>
      
      {/* Sección de Especificaciones o Similares */}
      <section className="product-detail-specs">
        <h2>Detalles Técnicos</h2>
        <ul>
          <li>**Material:** {product?.category === 'ROLLOS' ? 'Papel Térmico / Transferencia Térmica' : 'N/A'}</li>
          <li>**Uso:** {product?.category === 'ROLLOS' ? 'Almacén, Envíos, Punto de Venta' : 'N/A'}</li>
        </ul>
      </section>
      
    </div>
  );
};

export default ProductDetailPage;
