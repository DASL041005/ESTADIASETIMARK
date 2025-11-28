import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  rol: string;
  nombre: string;
  correo: string;
  id_usuario?: number;
  id_cliente?: number;
  exp: number;
}

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Error decodificando token", error);
    return null;
  }
};

export const getUserRole = () => {
  const user = getUserFromToken();
  return user?.rol || null;
};
