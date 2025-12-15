// src/pages/HomePage.tsx
import React from 'react';
import BannerCarousel from '../components/BannerCarousel';

// Importamos tus productos reales
import { mockProducts } from "../data/mockProducts";
import type { Product } from '../types/Product';


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>

      {product.isOffer && product.oldPrice && (
        <p className="old-price">${product.oldPrice}</p>
      )}

      <p className="price">
        ${product.price}
      </p>

      <p className="category">{product.category}</p>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="home-page-container">

      {/* 1. CARRUSEL PRINCIPAL */}
      <BannerCarousel />

      {/* 2. SECCIÓN DESTACADA */}
      <section className="highlight-section">
        <div className="highlight-circle">
          <p>🔥 Oferta Exclusiva</p>
        </div>
      </section>

      {/* 3. GRID DE PRODUCTOS (ej: SOFTWARE) */}
      <section className="product-grid-section">
        <h2 className='section-title'>Más Productos de Software</h2>

        <div className="product-grid">
          {mockProducts
            .filter((p) => p.category.toUpperCase() === "SOFTWARE")
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;
