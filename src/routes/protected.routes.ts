import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/role.middleware";
import { getAllProducts } from "../controllers/productos.controller";

const router = Router();

// Clientes
router.get("/productos", verifyToken, requireRole("CLIENTE"), getAllProducts);

// Empleados
router.get("/empleado/pedidos", verifyToken, requireRole("EMPLEADO"), (req, res) => {
  res.json({ msg: "Lista de pedidos" });
});

// Admin
router.get("/admin/dashboard", verifyToken, requireRole("ADMIN"), (req, res) => {
  res.json({ msg: "Panel administrativo" });
});

export default router;
