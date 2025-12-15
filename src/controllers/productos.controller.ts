import { Request, Response } from "express";
import { prisma } from "../prismaClient";

// Crear producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, precio_base, stock, id_tipo } = req.body;
    const product = await prisma.productos.create({
      data: { nombre, descripcion, precio_base, stock, id_tipo },
    });
    res.status(201).json({ message: "Producto creado", product });
  } catch (error: any) {
    console.error("Error createProduct:", error);
    res.status(500).json({ message: error.message || "Error al crear producto" });
  }
};

// Obtener todos los productos
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.productos.findMany({
      include: {
        tipo: true, // ⬅ incluye el nombre del tipo
      },
    });
    res.json({ products });
  } catch (error: any) {
    console.error("Error getAllProducts:", error);
    res.status(500).json({ message: error.message || "Error al obtener productos" });
  }
};


// Obtener producto por ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.productos.findUnique({
      where: { id_producto: parseInt(id) },
    });
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ product });
  } catch (error: any) {
    console.error("Error getProductById:", error);
    res.status(500).json({ message: error.message || "Error al obtener producto" });
  }
};

// Actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const product = await prisma.productos.update({
      where: { id_producto: parseInt(id) },
      data: updates,
    });
    res.json({ message: "Producto actualizado", product });
  } catch (error: any) {
    console.error("Error updateProduct:", error);
    res.status(500).json({ message: error.message || "Error al actualizar producto" });
  }
};

// Eliminar producto
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.productos.delete({
      where: { id_producto: parseInt(id) },
    });
    res.json({ message: "Producto eliminado", product });
  } catch (error: any) {
    console.error("Error deleteProduct:", error);
    res.status(500).json({ message: error.message || "Error al eliminar producto" });
  }
};
