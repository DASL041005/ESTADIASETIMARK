// src/pages/DashboardPage.tsx

import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import "./DashboardPage.css";
import type { Product } from "../types/Product";

interface BackendProduct {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio_base: number;
  stock: number;
  id_tipo: number;
}

const DashboardPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data: BackendProduct[] = await getProducts();

        // 🔥 MAPEO DEL BACKEND → FRONTEND
        const mapped = data.map((p) => ({
          id: p.id_producto,
          name: p.nombre,
          description: p.descripcion,
          price: p.precio_base,
          stock: p.stock,

          // Datos adicionales (TEMPORAL / MOCK)
          imageUrl: "https://via.placeholder.com/300x200?text=" + encodeURIComponent(p.nombre),
          category: "HARDWARE",
          rating: 4.5,
          isOffer: false,
        }));

        setProducts(mapped);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const promoProducts = products.filter((p) => p.price < 5000);
  const hardwareProducts = products.filter((p) => p.category === "HARDWARE");

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="dashboard-page-container">
      
      <section className="product-grid-section">
        <h2 className="section-title">🔥 Promociones Exclusivas 🔥</h2>
        <div className="product-grid">
          {promoProducts.length > 0 ? (
            promoProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No hay promociones disponibles.</p>
          )}
        </div>
      </section>

      <section className="product-grid-section">
        <h2 className="section-title">Productos Hardware</h2>
        <div className="product-grid">
          {hardwareProducts.length > 0 ? (
            hardwareProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No hay productos en hardware.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
