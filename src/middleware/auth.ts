import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token requerido" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Guarda info del usuario
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
};

// Middleware para roles
export const verifyRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;

    if (!roles.includes(user.rol)) {
      return res.status(403).json({ message: "No autorizado" });
    }

    next();
  };
};
