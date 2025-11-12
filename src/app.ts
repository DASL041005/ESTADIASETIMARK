import express from "express";
import cors from "cors";
import router from "./routes/auth.routes"; // <- importa tus rutas

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Montar todas las rutas con un prefijo, por ejemplo '/api'
app.use("/api", router);

// Ruta raíz opcional
app.get("/", (_req, res) => {
  res.send("Servidor corriendo ¡Bienvenido!");
});

export default app;
