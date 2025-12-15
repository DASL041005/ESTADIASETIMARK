// controllers/clientes.controller.ts
import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import bcrypt from "bcryptjs";

/**
 * Controlador para crear cliente + usuario
 */
export const createCliente = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, telefono, direccion, contrasena } = req.body;

    // VALIDAR CAMPOS
    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    // 1) Verificar si el correo ya está registrado como cliente
    const existingClient = await prisma.clientes.findUnique({
      where: { correo }
    });

    if (existingClient) {
      return res.status(409).json({ message: "El correo ya está registrado como cliente" });
    }

    // 2) Verificar si ya existe como usuario (tabla Usuarios)
    const existingUser = await prisma.usuarios.findUnique({
      where: { correo }
    });

    if (existingUser) {
      return res.status(409).json({ message: "El correo ya está registrado como usuario" });
    }

    // 3) Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // 4) Crear cliente (guardando la contraseña en Clientes)
    const cliente = await prisma.clientes.create({
      data: {
        nombre,
        correo,
        telefono,
        direccion,
        contrasena: hashedPassword,
        tipo_cliente: "NORMAL"
      }
    });

    // 5) Crear usuario vinculado (tabla Usuarios) - opcional pero consistente
    const usuario = await prisma.usuarios.create({
      data: {
        nombre,
        correo,
        contrasena: hashedPassword,
        rol: "CLIENTE"
      }
    });

    return res.status(201).json({
      message: "Cuenta creada exitosamente",
      cliente,
      usuario
    });
  } catch (err: unknown) {
    // Manejo robusto del error
    console.error("Error createCliente:", err);

    // Si es un error de Prisma con constraint unique (P2002), devolvemos 409
    // Como err puede ser unknown, los chequeos a continuación son seguros:
    try {
      // @ts-ignore - acceder al error de prisma si existe
      if (err?.code === "P2002") {
        return res.status(409).json({ message: "Valor duplicado (unique constraint)" });
      }
    } catch {}

    return res.status(500).json({ message: "Error al crear cliente" });
  }
};

// Otros controladores: listar, obtener por id, actualizar, eliminar
export const getAllClientes = async (_req: Request, res: Response) => {
  try {
    const clientes = await prisma.clientes.findMany();
    return res.json({ clientes });
  } catch (err) {
    console.error("Error getAllClientes:", err);
    return res.status(500).json({ message: "Error al obtener clientes" });
  }
};

export const getClienteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cliente = await prisma.clientes.findUnique({
      where: { id_cliente: parseInt(id, 10) }
    });

    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
    return res.json({ cliente });
  } catch (err) {
    console.error("Error getClienteById:", err);
    return res.status(500).json({ message: "Error al obtener cliente" });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const cliente = await prisma.clientes.update({
      where: { id_cliente: parseInt(id, 10) },
      data: updates
    });

    return res.json({ message: "Cliente actualizado", cliente });
  } catch (err) {
    console.error("Error updateCliente:", err);
    return res.status(500).json({ message: "Error al actualizar cliente" });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cliente = await prisma.clientes.delete({
      where: { id_cliente: parseInt(id, 10) }
    });

    return res.json({ message: "Cliente eliminado", cliente });
  } catch (err) {
    console.error("Error deleteCliente:", err);
    return res.status(500).json({ message: "Error al eliminar cliente" });
  }
};
