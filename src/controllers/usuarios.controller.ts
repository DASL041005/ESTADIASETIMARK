import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import bcrypt from "bcryptjs";

// Crear usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;

    // Encriptar contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const user = await prisma.usuarios.create({
      data: { nombre, correo, contrasena: hashedPassword, rol },
    });

    res.status(201).json({ message: "Usuario creado", user });
  } catch (error: any) {
    console.error("Error createUser:", error);
    res.status(500).json({ message: error.message || "Error al crear usuario" });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.usuarios.findMany();
    res.json({ users });
  } catch (error: any) {
    console.error("Error getAllUsers:", error);
    res.status(500).json({ message: error.message || "Error al obtener usuarios" });
  }
};

// Obtener usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.usuarios.findUnique({
      where: { id_usuario: parseInt(id) },
    });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ user });
  } catch (error: any) {
    console.error("Error getUserById:", error);
    res.status(500).json({ message: error.message || "Error al obtener usuario" });
  }
};

// Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await prisma.usuarios.update({
      where: { id_usuario: parseInt(id) },
      data: updates,
    });
    res.json({ message: "Usuario actualizado", user });
  } catch (error: any) {
    console.error("Error updateUser:", error);
    res.status(500).json({ message: error.message || "Error al actualizar usuario" });
  }
};

// Eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.usuarios.delete({
      where: { id_usuario: parseInt(id) },
    });
    res.json({ message: "Usuario eliminado", user });
  } catch (error: any) {
    console.error("Error deleteUser:", error);
    res.status(500).json({ message: error.message || "Error al eliminar usuario" });
  }
};
