// src/components/auth/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<"CLIENTE" | "EMPLEADO" | "ADMIN">;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <div style={{ padding: 24, textAlign: "center" }}>Validando sesión...</div>;
  }

  // 🚫 No autenticado → Enviar SIEMPRE a Home
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // 🚫 Autenticado pero rol no autorizado → Enviar a Home
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // ✔ Autorizado → permitir acceso
  return <>{children}</>;
};

export default PrivateRoute;
