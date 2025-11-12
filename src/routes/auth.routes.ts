import { Router } from "express";

// ==============================
// IMPORTAR CONTROLADORES
// ==============================
import { login, generateToken } from "../controllers/auth.controllers";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/usuarios.controller";

import {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
} from "../controllers/clientes.controller";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productos.controller";

import {
  getAllCotizaciones,
  getCotizacionById,
  createCotizacion,
  updateCotizacion,
  deleteCotizacion
} from "../controllers/cotizaciones.controller";

// ==============================
// INICIALIZAR ROUTER
// ==============================
const router = Router();

/* ==============================
   AUTH
============================== */
// Login normal
router.post("/login", login);
// Generar token por ID de usuario (solo testing)
router.post("/generate-token", generateToken);

/* ==============================
   USUARIOS
============================== */
router.get("/usuarios", getAllUsers);
router.get("/usuarios/:id", getUserById);
router.post("/usuarios", createUser);
router.put("/usuarios/:id", updateUser);
router.delete("/usuarios/:id", deleteUser);

/* ==============================
   CLIENTES
============================== */
router.get("/clientes", getAllClientes);
router.get("/clientes/:id", getClienteById);
router.post("/clientes", createCliente);
router.put("/clientes/:id", updateCliente);
router.delete("/clientes/:id", deleteCliente);

/* ==============================
   PRODUCTOS
============================== */
router.get("/productos", getAllProducts);
router.get("/productos/:id", getProductById);
router.post("/productos", createProduct);
router.put("/productos/:id", updateProduct);
router.delete("/productos/:id", deleteProduct);

/* ==============================
   COTIZACIONES
============================== */
router.get("/cotizaciones", getAllCotizaciones);
router.get("/cotizaciones/:id", getCotizacionById);
router.post("/cotizaciones", createCotizacion);
router.put("/cotizaciones/:id", updateCotizacion);
router.delete("/cotizaciones/:id", deleteCotizacion);

export default router;
