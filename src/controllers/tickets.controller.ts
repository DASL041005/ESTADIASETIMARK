import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export const createTicket = async (req: Request, res: Response) => {
  try {
    const { id_cliente, asunto, mensaje } = req.body;

    if (!id_cliente || !asunto || !mensaje) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const ticket = await prisma.tickets.create({
      data: {
        id_cliente,
        asunto,
        mensaje,
      },
      include: { cliente: true }
    });

    res.status(201).json({ message: "Ticket creado exitosamente", ticket });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "Error al crear ticket" });
  }
};

export const getAllTickets = async (_req: Request, res: Response) => {
  try {
    const tickets = await prisma.tickets.findMany({
      include: { cliente: true },
      orderBy: { fecha_creacion: "desc" }
    });
    res.json({ tickets });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "Error al obtener tickets" });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await prisma.tickets.findUnique({
      where: { id_ticket: parseInt(id) },
      include: { cliente: true }
    });

    if (!ticket) return res.status(404).json({ message: "Ticket no encontrado" });

    res.json({ ticket });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "Error al obtener ticket" });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const ticket = await prisma.tickets.update({
      where: { id_ticket: parseInt(id) },
      data: updates,
      include: { cliente: true }
    });

    res.json({ message: "Ticket actualizado", ticket });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "Error al actualizar ticket" });
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const ticket = await prisma.tickets.delete({
      where: { id_ticket: parseInt(id) }
    });

    res.json({ message: "Ticket eliminado", ticket });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "Error al eliminar ticket" });
  }
};
