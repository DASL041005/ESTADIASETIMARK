import { Request, Response } from "express";
import { prisma } from "../prismaClient";

// Crear cotización
export const createCotizacion = async (req: Request, res: Response) => {
  try {
    const { id_cliente, id_usuario, id_estado, detalles } = req.body;
    /*
      detalles: [
        { id_producto: 1, cantidad: 2 },
        { id_producto: 3, cantidad: 1 }
      ]
    */

    // Calcular subtotal y total
    let subtotal = 0;

    // Buscar precios de los productos
    for (const detalle of detalles) {
      const producto = await prisma.productos.findUnique({
        where: { id_producto: detalle.id_producto },
      });
      if (!producto) {
        return res.status(404).json({ message: `Producto con ID ${detalle.id_producto} no encontrado` });
      }
      subtotal += producto.precio_base * detalle.cantidad;
      detalle.precio_final = producto.precio_base; // asignamos precio final por unidad
    }

    const iva = 0.16;
    const total = parseFloat((subtotal * (1 + iva)).toFixed(2));

    // Crear cotización
    const cotizacion = await prisma.cotizaciones.create({
      data: {
        id_cliente,
        id_usuario,
        id_estado,
        fecha_solicitud: new Date(),
        detalles: {
          create: detalles.map((d: any) => ({
            id_producto: d.id_producto,
            cantidad: d.cantidad,
            precio_final: d.precio_final,
          })),
        },
      },
      include: { detalles: true },
    });

    res.status(201).json({ message: "Cotización creada", cotizacion, subtotal, total });
  } catch (error: any) {
    console.error("Error createCotizacion:", error);
    res.status(500).json({ message: error.message || "Error al crear cotización" });
  }
};

// Obtener todas las cotizaciones
export const getAllCotizaciones = async (_req: Request, res: Response) => {
  try {
    const cotizaciones = await prisma.cotizaciones.findMany({
      include: {
        cliente: true,
        usuario: true,
        estado: true,
        detalles: {
          include: { producto: true },
        },
      },
    });
    res.json({ cotizaciones });
  } catch (error: any) {
    console.error("Error getAllCotizaciones:", error);
    res.status(500).json({ message: error.message || "Error al obtener cotizaciones" });
  }
};

// Obtener cotización por ID
export const getCotizacionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cotizacion = await prisma.cotizaciones.findUnique({
      where: { id_cotizacion: parseInt(id) },
      include: {
        cliente: true,
        usuario: true,
        estado: true,
        detalles: { include: { producto: true } },
      },
    });
    if (!cotizacion) return res.status(404).json({ message: "Cotización no encontrada" });
    res.json({ cotizacion });
  } catch (error: any) {
    console.error("Error getCotizacionById:", error);
    res.status(500).json({ message: error.message || "Error al obtener cotización" });
  }
};

// Actualizar cotización (por ejemplo cambiar estado)
export const updateCotizacion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body; // ej: { id_estado: 2 }
    const cotizacion = await prisma.cotizaciones.update({
      where: { id_cotizacion: parseInt(id) },
      data: updates,
      include: { detalles: true },
    });
    res.json({ message: "Cotización actualizada", cotizacion });
  } catch (error: any) {
    console.error("Error updateCotizacion:", error);
    res.status(500).json({ message: error.message || "Error al actualizar cotización" });
  }
};

// Eliminar cotización (status: cancelado)
export const deleteCotizacion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Para mantener historial, podemos solo actualizar estado a 'cancelado'
    const cancelado = await prisma.cotizaciones.update({
      where: { id_cotizacion: parseInt(id) },
      data: { id_estado: 3 }, // suponiendo que 3 = cancelado
    });
    res.json({ message: "Cotización cancelada", cotizacion: cancelado });
  } catch (error: any) {
    console.error("Error deleteCotizacion:", error);
    res.status(500).json({ message: error.message || "Error al cancelar cotización" });
  }
};
