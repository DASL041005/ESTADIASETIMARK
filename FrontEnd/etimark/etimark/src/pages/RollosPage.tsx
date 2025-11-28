// src/pages/RollosPage.tsx
import React from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/Product';
import './RollosPage.css';
import { mockProducts } from '../data/mockProducts'; // <--- CORREGIDO

const RollosPage: React.FC = () => {
  // Productos filtrados por categoría real del sistema
  const rollosProducts: Product[] = mockProducts.filter(
    (p) => p.category === "ROLLOS"
  );

  return (
    <div className="rollos-page-container">
      <h1 className="rollos-title">Rollos y Etiquetas ETIMARK</h1>
      <p className="rollos-subtitle">
        Encuentra la medida exacta de Transferencia Térmica, Térmica Directa o
        Plástica que necesitas para tu negocio.
      </p>

      {/* PRODUCTOS DESTACADOS */}
      <section className="product-grid-section">
        <h2 className="section-header">Productos Destacados</h2>

        <div className="rollos-grid">
          {rollosProducts.length > 0 ? (
            rollosProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="no-products">No hay rollos disponibles en este momento.</p>
          )}
        </div>
      </section>

      {/* TABLA DE MEDIDAS */}
      <section className="reference-table-section">
        <h2 className="section-header">Guía de Medidas Populares</h2>

        <table className="rollos-table">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Medida (mm)</th>
              <th>Etiquetas x Rollo</th>
            </tr>
          </thead>

          <tbody>
            <tr><td>Etiqueta Transferencia Térmica</td><td>31x19</td><td>7500</td></tr>
            <tr><td>Etiqueta Transferencia Térmica</td><td>31x19</td><td>20000</td></tr>
            <tr><td>Etiqueta Térmica Directa</td><td>57x40</td><td>1500</td></tr>
            <tr><td>Etiqueta Térmica Directa</td><td>57x40</td><td>750</td></tr>
            <tr><td>Etiqueta Transferencia Térmica</td><td>102x51</td><td>850</td></tr>
            <tr><td>Etiqueta Transferencia Térmica</td><td>51x25</td><td>1600</td></tr>
            <tr><td>Etiqueta Transferencia Térmica Plástica</td><td>76x25</td><td>2000</td></tr>
            <tr><td>Etiqueta Transferencia Térmica</td><td>38x25</td><td>1600</td></tr>
            <tr><td>Etiqueta Térmica Directa</td><td>31x19</td><td>7500</td></tr>
            <tr><td>Etiqueta Transferencia Térmica</td><td>76x25</td><td>2000</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default RollosPage;
