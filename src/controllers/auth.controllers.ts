import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

// LOGIN – maneja usuarios y clientes
export const login = async (req: Request, res: Response) => {
  try {
    const { correo, contrasena } = req.body;

    // 1️⃣ Buscar en usuarios
    let user = await prisma.usuarios.findUnique({ where: { correo } });

    // 2️⃣ Si no existe, buscar en clientes
    if (!user) {
      const cliente = await prisma.clientes.findUnique({ where: { correo } });
      if (!cliente) return res.status(404).json({ message: "Usuario o cliente no encontrado" });

      const valid = await bcrypt.compare(contrasena, cliente.contrasena);
      if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

      const token = jwt.sign(
        {
          id_cliente: cliente.id_cliente,
          nombre: cliente.nombre,
          correo: cliente.correo,
          rol: "CLIENTE",
        },
        JWT_SECRET,
        { expiresIn: "2h" }
      );

      return res.json({
        message: "Login exitoso (cliente)",
        token,
        rol: "CLIENTE",
      });
    }

    // 3️⃣ Validar contraseña de usuario normal
    const valid = await bcrypt.compare(contrasena, user.contrasena);
    if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol,
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      message: "Login exitoso (usuario)",
      token,
      rol: user.rol,
    });

  } catch (error: any) {
    console.error("Error login:", error);
    res.status(500).json({ message: error.message });
  }
};

// GENERAR TOKEN MANUAL (solo testing)
export const generateToken = async (req: Request, res: Response) => {
  try {
    const { id_usuario } = req.body;

    const user = await prisma.usuarios.findUnique({
      where: { id_usuario: Number(id_usuario) }
    });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const token = jwt.sign(
      { id_usuario: user.id_usuario, rol: user.rol },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Token generado", token });
  } catch (error: any) {
    console.error("Error generateToken:", error);
    return res.status(500).json({ message: error.message });
  }
};
