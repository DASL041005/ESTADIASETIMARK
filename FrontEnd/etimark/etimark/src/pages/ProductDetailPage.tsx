// src/pages/ProductDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { useCart } from "../context/CartContext";
import "./ProductDetailPage.css";
import type { Product } from "../types/Product";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "0", 10);

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  // 🔥 CORRECTO
  const { addItemToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/productos/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error cargando producto:", err);
      }
    };

    if (productId > 0) fetchProduct();
  }, [productId]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const placeholder = product?.name || "PRODUCTO";
    e.currentTarget.src = `https://placehold.co/600x450/E0E0E0/333?text=${encodeURIComponent(
      placeholder
    )}`;
  };

  if (!product) return <div className="detail-loading">Cargando producto...</div>;

  const maxQuantity = product.stock > 0 ? product.stock : 1;

  return (
    <div className="product-detail-page">
      <div className="product-detail-content">
        {/* Imagen */}
        <div className="product-detail-image-gallery">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="main-product-image"
            onError={handleImageError}
          />
        </div>

        {/* Información */}
        <div className="product-detail-info">
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-category">Categoría: {product.category}</p>

          <div className="detail-price-box">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            <span className="detail-currency">USD</span>
          </div>

          <div className="detail-status">
            <span className={`detail-stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
              {product.stock > 0
                ? `En Stock: ${product.stock} unidades`
                : "Agotado Temporalmente"}
            </span>
          </div>

          <p className="detail-description-header">Descripción del Producto:</p>
          <p className="detail-description">{product.description}</p>

          <div className="detail-purchase-controls">
            <div className="quantity-control">
              <label htmlFor="quantity">Cantidad:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.min(parseInt(e.target.value) || 1, maxQuantity))
                }
                min={1}
                max={maxQuantity}
              />
            </div>

            <button
              className="detail-add-to-cart-btn"
              onClick={() => addItemToCart(product, quantity)}
              disabled={product.stock === 0}
            >
              Añadir a Mi Bolsa
            </button>
          </div>

          {product.stock > 0 && (
            <p className="detail-shipping-info">🚚 Envío gratis a partir de 100 USD.</p>
          )}
        </div>
      </div>

      {/* Especificaciones */}
      <section className="product-detail-specs">
        <h2>Detalles Técnicos</h2>
        <ul>
          <li>
            <strong>Material:</strong>{" "}
            {product.category === "ROLLOS" ? "Papel Térmico / Transferencia Térmica" : "N/A"}
          </li>
          <li>
            <strong>Uso:</strong>{" "}
            {product.category === "ROLLOS" ? "Almacén, Envíos, Punto de Venta" : "N/A"}
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ProductDetailPage;
