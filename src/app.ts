import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";

const app = express();
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use("/api", authRoutes);

// Rutas protegidas
app.use("/api", protectedRoutes);

app.get("/", (_req, res) => {
  res.send("Servidor corriendo ¡Bienvenido!");
});

export default app;
