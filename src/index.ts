import app from "./app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PORT = 3000;

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(" Conectado a la base de datos MySQL");
    console.log(` Servidor funcionando en http://localhost:${PORT}`);
  } catch (error) {
    console.error(" Error al conectar a la base de datos:", error);
  }
});
