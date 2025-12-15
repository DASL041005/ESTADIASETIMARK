import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Conexión exitosa con MySQL");
  } catch (error) {
    console.error(" Error al conectar a la base de datos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
