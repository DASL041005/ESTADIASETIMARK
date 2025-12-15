import { api } from "./api";

export const loginRequest = async (correo: string, contrasena: string) => {
  const res = await api.post("/login", { correo, contrasena });
  return res.data; // espera { token, rol, message }
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_role");
};
