// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: "CLIENTE" | "EMPLEADO" | "ADMIN" | null;
  loadingAuth: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface JwtPayload {
  rol: "CLIENTE" | "EMPLEADO" | "ADMIN";
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  loadingAuth: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"CLIENTE" | "EMPLEADO" | "ADMIN" | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoadingAuth(false);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded.rol) {
        setUserRole(decoded.rol);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
      }
    } catch {
      localStorage.removeItem("token");
    }

    setLoadingAuth(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode<JwtPayload>(token);

    setUserRole(decoded.rol);
    setIsAuthenticated(true);
  };

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role"); // por si existe
  setUserRole(null);
  setIsAuthenticated(false);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, loadingAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
