import React from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import { mockProducts } from "../data/mockProducts";
import "./SoftwarePage.css";

const SoftwarePage: React.FC = () => {
  // Software real del mock
  const softwareProducts: Product[] = mockProducts.filter(
    (p) => p.category === "SOFTWARE"
  );

  // --------- PRODUCTOS SIMULADOS EXTRA ---------
  const simulatedSoftware: Product[] = [
    {
      id: 9101,
      name: "ETI Designer Pro",
      description: "Diseño avanzado de etiquetas con plantillas inteligentes.",
      price: 2800,
      stock: 50,
      imageUrl: "https://static.vecteezy.com/system/resources/previews/020/188/879/non_2x/eti-letter-logo-creative-design-with-graphic-eti-simple-and-modern-logo-vector.jpg",
      category: "SOFTWARE",
      rating: 4.8,
      isOffer: true,
    },
    {
      id: 9102,
      name: "LabelMaster Cloud",
      description: "Plataforma online para administrar etiquetas en múltiples sucursales.",
      price: 1500,
      stock: 70,
      imageUrl: "https://s3-media0.fl.yelpcdn.com/bphoto/A5fXJOUhHfqoJgfkc9MDew/348s.jpg",
      category: "SOFTWARE",
      rating: 4.6,
      isOffer: false,
    },
    {
      id: 9103,
      name: "Barcode Generator XT",
      description: "Generador de más de 200 tipos de códigos de barras.",
      price: 2100,
      stock: 35,
      imageUrl: "https://tritonstore.co.nz/wp-content/uploads/Code-93-Barcode-Generator.jpg",
      category: "SOFTWARE",
      rating: 4.7,
      isOffer: true,
    },
    {
      id: 9104,
      name: "PrintFlow Manager",
      description: "Control centralizado para impresoras industriales.",
      price: 3200,
      stock: 20,
      imageUrl: "https://minilab.fr/1646-large_default/mpk-abonnement-print-flow-manager.jpg",
      category: "SOFTWARE",
      rating: 4.9,
      isOffer: false,
    },
    {
      id: 9105,
      name: "ETI Analytics",
      description: "Analiza consumo, impresión y costos de tus etiquetas.",
      price: 3900,
      stock: 12,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThwFJ5m81rQ66bLSG2io505EZtZD3zeUXGYg&s",
      category: "SOFTWARE",
      rating: 4.5,
      isOffer: false,
    },
    {
      id: 9106,
      name: "Warehouse Scanner Pro",
      description: "Software para lectura y administración de inventario.",
      price: 2600,
      stock: 25,
      imageUrl: "https://m.media-amazon.com/images/I/71YdeF3INEL._AC_UF350,350_QL80_.jpg",
      category: "SOFTWARE",
      rating: 4.7,
      isOffer: true,
    },
  ];

  // Unir reales + simulados
  const allSoftwareProducts = [...softwareProducts, ...simulatedSoftware];

  return (
    <div className="software-page-container">
      <h1 className="software-title">Software ETIMARK</h1>

      <p className="software-subtitle">
        Gestiona, imprime y administra tus procesos con nuestras soluciones
        profesionales de software empresarial.
      </p>

      {/* PRODUCTOS DESTACADOS */}
      <section className="product-grid-section">
        <h2 className="section-header">Programas Destacados</h2>

        <div className="software-grid">
          {allSoftwareProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* TABLA INFORMACIÓN */}
      <section className="software-table-section">
        <h2 className="section-header">Comparativa de Software</h2>

        <table className="software-table">
          <thead>
            <tr>
              <th>Software</th>
              <th>Función</th>
              <th>Licencia</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Barcode Studio</td>
              <td>Generación avanzada de códigos de barras</td>
              <td>Perpetua</td>
            </tr>
            <tr>
              <td>NiceLabel</td>
              <td>Impresión profesional de etiquetas</td>
              <td>Anual</td>
            </tr>
            <tr>
              <td>Zebra Designer Pro</td>
              <td>Diseño de etiquetas para impresoras Zebra</td>
              <td>Perpetua</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default SoftwarePage;
