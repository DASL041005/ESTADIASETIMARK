import { Request, Response } from "express";
import { prisma } from "../prismaClient";

// Crear cliente
export const createCliente = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, telefono, direccion, tipo_cliente } = req.body;
    const cliente = await prisma.clientes.create({
      data: { nombre, correo, telefono, direccion, tipo_cliente },
    });
    res.status(201).json({ message: "Cliente creado exitosamente", cliente });
  } catch (error: any) {
    console.error("Error createCliente:", error);
    res.status(500).json({ message: error.message || "Error al crear cliente" });
  }
};

// Obtener todos los clientes
export const getAllClientes = async (_req: Request, res: Response) => {
  try {
    const clientes = await prisma.clientes.findMany();
    res.json({ clientes });
  } catch (error: any) {
    console.error("Error getAllClientes:", error);
    res.status(500).json({ message: error.message || "Error al obtener clientes" });
  }
};

// Obtener cliente por ID
export const getClienteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cliente = await prisma.clientes.findUnique({ where: { id_cliente: parseInt(id) } });
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json({ cliente });
  } catch (error: any) {
    console.error("Error getClienteById:", error);
    res.status(500).json({ message: error.message || "Error al obtener cliente" });
  }
};

// Actualizar cliente
export const updateCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const cliente = await prisma.clientes.update({
      where: { id_cliente: parseInt(id) },
      data: updates,
    });
    res.json({ message: "Cliente actualizado", cliente });
  } catch (error: any) {
    console.error("Error updateCliente:", error);
    res.status(500).json({ message: error.message || "Error al actualizar cliente" });
  }
};

// Eliminar cliente (baja lógica)
export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cliente = await prisma.clientes.delete({
      where: { id_cliente: parseInt(id) },
    });
    res.json({ message: "Cliente eliminado", cliente });
  } catch (error: any) {
    console.error("Error deleteCliente:", error);
    res.status(500).json({ message: error.message || "Error al eliminar cliente" });
  }
};
