import React from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import { mockProducts } from "../data/mockProducts";
import "./ImpresorasPage.css";

const ImpresorasPage: React.FC = () => {
  // Productos reales desde mockProducts
  const printerProducts: Product[] = mockProducts.filter(
    (p) => p.category === "IMPRESORAS"
  );

  // Productos simulados para completar tarjetas
  const simulatedPrinters: Product[] = [
    {
      id: 9001,
      name: "Impresora Industrial TX-500",
      description: "Alta velocidad para producción continua.",
      price: 12500,
      stock: 15,
      imageUrl: "https://www.mimaki.es/wp-content/uploads/2014/03/Tx500-1800DS_with-image.jpg",
      category: "IMPRESORAS",
      rating: 4.8,
      isOffer: true,
    },
    {
      id: 9002,
      name: "Impresora Compacta MiniPrint",
      description: "Perfecta para oficinas y negocios pequeños.",
      price: 6200,
      stock: 40,
      imageUrl: "https://secciones.atiogroup.com.mx/web/image/product.template/24/image_1024?unique=204ee8c",
      category: "IMPRESORAS",
      rating: 4.6,
      isOffer: false,
    },
    {
      id: 9003,
      name: "Impresora Portátil LabelGo",
      description: "Ligera, recargable y compatible con Bluetooth.",
      price: 3400,
      stock: 60,
      imageUrl: "https://m.media-amazon.com/images/I/61LaHJe3eVL._AC_UF894,1000_QL80_.jpg",
      category: "IMPRESORAS",
      rating: 4.4,
      isOffer: true,
    },
    {
      id: 9004,
      name: "Impresora TT ProLine X7",
      description: "Especialista en etiquetas industriales.",
      price: 19500,
      stock: 10,
      imageUrl: "https://store.azerty.com.mx/custom/imagenes/productos/aTSC-MX241P.jpg",
      category: "IMPRESORAS",
      rating: 4.9,
      isOffer: false,
    },
    {
      id: 9005,
      name: "Impresora EcoPrint 300",
      description: "Bajo consumo y alta precisión.",
      price: 7800,
      stock: 20,
      imageUrl: "https://mediaserver.goepson.com/ImConvServlet/imconv/0df7d8c9fe1f070272a40cf03d121ad33d7a1f67/1200Wx1200H?use=banner&hybrisId=B2C&assetDescr=C11CD81303_productSlider_big_3",
      category: "IMPRESORAS",
      rating: 4.5,
      isOffer: false,
    },
    {
      id: 9006,
      name: "Impresora Premium UltraLabel",
      description: "La mejor calidad de impresión en su categoría.",
      price: 15900,
      stock: 12,
      imageUrl: "https://profoto.com.mx/cdn/shop/products/1594281159_1573781_grande.jpg?v=1682040744",
      category: "IMPRESORAS",
      rating: 4.7,
      isOffer: true,
    },
  ];

  // Mezclar reales + simuladas
  const allPrinters = [...printerProducts, ...simulatedPrinters];

  return (
    <div className="impresoras-page-container">
      <h1 className="impresoras-title">Impresoras ETIMARK</h1>

      <p className="impresoras-subtitle">
        Impresoras de etiquetas industriales, comerciales y especializadas para
        tu negocio.
      </p>

      <section className="product-grid-section">
        <h2 className="section-header">Impresoras Destacadas</h2>

        <div className="impresoras-grid">
          {allPrinters.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="impresoras-table-section">
        <h2 className="section-header">Compatibilidad de Impresoras</h2>

        <table className="impresoras-table">
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Tecnología</th>
              <th>Compatible con</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Zebra ZD421</td>
              <td>Térmica Directa</td>
              <td>Rollos Térmicos</td>
            </tr>
            <tr>
              <td>Zebra ZT411</td>
              <td>Transferencia Térmica</td>
              <td>Ribbon + Rollos TT</td>
            </tr>
            <tr>
              <td>Sato CL4NX</td>
              <td>TT Industrial</td>
              <td>Etiquetas Industriales</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ImpresorasPage;
