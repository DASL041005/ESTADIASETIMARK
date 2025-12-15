// src/pages/RollosPage.tsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import { api } from "../services/api";
import "./RollosPage.css";

type BackendProduct = {
  id_producto: number;
  nombre: string;
  descripcion?: string | null;
  precio_base: number;
  stock: number;
  id_tipo?: number | null;
};

const RollosPage: React.FC = () => {
  const [rollosProducts, setRollosProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 Tarjetas simuladas extra
  const fakeCards: Product[] = [
    {
      id: 9001,
      name: "Rollo Térmico 80x80",
      description: "Ideal para puntos de venta",
      price: 95,
      stock: 50,
      imageUrl: "https://www.adosa.com.mx/media/catalog/product/0/8/082480_1.jpg?quality=80&fit=bounds&height=265&width=265&canvas=265:265",
      category: "ROLLOS",
      rating: 4.8,
      isOffer: true,
    },
    {
      id: 9002,
      name: "Etiqueta 3x2 Blanca",
      description: "Etiqueta adhesiva premium",
      price: 120,
      stock: 32,
      imageUrl: "https://alkavico.mx/cdn/shop/files/15.jpg?v=1726514981",
      category: "ROLLOS",
      rating: 4.6,
      isOffer: false,
    },
    {
      id: 9003,
      name: "Rollo Térmico 57x40",
      description: "Para terminales pequeñas",
      price: 55,
      stock: 80,
      imageUrl: "https://www.officetech.mx/wp-content/uploads/2020/04/Diseno-sin-titulo-5.png",
      category: "ROLLOS",
      rating: 4.7,
      isOffer: false,
    },
    {
      id: 9004,
      name: "Etiqueta 4x3 Transparente",
      description: "Alta resistencia y calidad",
      price: 150,
      stock: 20,
      imageUrl: "https://img.uline.com/is/image/uline/S-24299C?$Mobile_SI$",
      category: "ROLLOS",
      rating: 4.9,
      isOffer: true,
    }
  ];

  useEffect(() => {
    const fetchRollos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/productos");
        const backendProducts: BackendProduct[] = res.data.products ?? res.data;

        const onlyRollos = backendProducts.filter(
          (p) =>
            p.id_tipo === 1 ||
            (p.nombre && p.nombre.toLowerCase().includes("etiqueta"))
        );

        const mapped: Product[] = onlyRollos.map((p) => ({
          id: p.id_producto,
          name: p.nombre,
          description: p.descripcion ?? "",
          price: p.precio_base,
          stock: p.stock,
          imageUrl: `https://placehold.co/600x400/E0E0E0/333?text=${encodeURIComponent(
            p.nombre
          )}`,
          category: "ROLLOS",
          rating: 4.5,
          isOffer: false,
        }));

        setRollosProducts(mapped);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los rollos.");
      } finally {
        setLoading(false);
      }
    };
    fetchRollos();
  }, []);

  if (loading)
    return (
      <div className="rollos-page-container">
        <p>Cargando rollos...</p>
      </div>
    );

  if (error)
    return (
      <div className="rollos-page-container">
        <p className="error">{error}</p>
      </div>
    );

  // 🔥 Productos reales + productos simulados
  const finalProducts = [...rollosProducts, ...fakeCards];

  return (
    <div className="rollos-page-container">
      <h1 className="rollos-title">Rollos y Etiquetas ETIMARK</h1>
      <p className="rollos-subtitle">Encuentra la medida exacta ...</p>

      <section className="product-grid-section">
        <h2 className="section-header">Productos Destacados</h2>

        <div className="rollos-grid">
          {finalProducts.length > 0 ? (
            finalProducts.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p className="no-products">No hay rollos disponibles.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default RollosPage;
