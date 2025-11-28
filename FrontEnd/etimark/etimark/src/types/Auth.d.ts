export interface JwtPayload {
  id_usuario?: number;
  id_cliente?: number;
  nombre: string;
  correo: string;
  rol: "CLIENTE" | "EMPLEADO" | "ADMIN";
  exp?: number;
  iat?: number;
}
