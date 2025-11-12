import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient";
import bcrypt from "bcryptjs";

// Secret para JWT (mejor ponerlo en .env)
const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

// LOGIN – devuelve token
export const login = async (req: Request, res: Response) => {
  try {
    const { correo, contrasena } = req.body;

    const user = await prisma.usuarios.findUnique({ where: { correo } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(contrasena, user.contrasena);
    if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id_usuario: user.id_usuario, rol: user.rol },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error: any) {
    console.error("Error login:", error);
    res.status(500).json({ message: error.message || "Error en login" });
  }
};

// ENDPOINT para generar token directo por ID de usuario (solo testing)
export const generateToken = async (req: Request, res: Response) => {
  try {
    const { id_usuario } = req.body;

    const user = await prisma.usuarios.findUnique({ where: { id_usuario: Number(id_usuario) } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const token = jwt.sign(
      { id_usuario: user.id_usuario, rol: user.rol },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Token generado", token });
  } catch (error: any) {
    console.error("Error generateToken:", error);
    res.status(500).json({ message: error.message || "Error generando token" });
  }
};
