"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes")); // Tus rutas de autenticación
const client_1 = require("@prisma/client");
const app_1 = require("./app");
const protected_routes_1 = __importDefault(require("./routes/protected.routes"));
const prisma = new client_1.PrismaClient(); // Inicializamos Prisma
const PORT = 3000;
// Middlewares
app_1.app.use(express_1.default.json()); // Todo lo que reciba será JSON
app_1.app.use((0, morgan_1.default)('dev')); // Mostrar logs de las peticiones
app_1.app.use((0, cors_1.default)()); // Habilitar CORS
// Rutas
app_1.app.use('/api/auth', auth_routes_1.default);
app_1.app.use('/api/protected', protected_routes_1.default);
// Conexión a la base de datos y arranque del servidor
async function main() {
    try {
        await prisma.$connect(); // Conectar a MySQL
        console.log('✅ Conectado a la base de datos MySQL');
        app_1.app.listen(PORT, () => {
            console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error);
        process.exit(1); // Salir si hay error
    }
}
// Ejecutar main
main();
