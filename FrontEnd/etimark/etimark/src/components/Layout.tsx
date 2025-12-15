import React from 'react';
import type { ReactNode } from 'react';
import Header from './Header'; // Asume que existe
import NavBar from './NavBar'; // Asume que existe

// Define la estructura de las propiedades que acepta el componente (el contenido de la página)
interface LayoutProps {
  children: ReactNode; 
}

/**
 * Componente Layout
 * Envuelve el contenido de la página con los elementos de diseño principales 
 * (Header, NavBar, Footer) para garantizar la consistencia visual.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // Usa 'layout-container' para el estilo general de la app
    <div className="layout-container">
      
      {/* 1. Elementos fijos de la parte superior */}
      <Header />
      <NavBar />
      
      {/* 2. Área principal de contenido (donde se renderiza RollosPage, DashboardPage, etc.) */}
      <main className="content-area">
        {children}
      </main>
      
      {/* 3. Footer fijo */}
      <footer>
        <p>&copy; {new Date().getFullYear()} ETIMARK. Todos los derechos reservados.</p>
        <p>Soporte Técnico: (55) 1234 5678</p>
      </footer>
    </div>
  );
};

export default Layout;
