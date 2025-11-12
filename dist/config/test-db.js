"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
async function testConnection() {
    try {
        const [rows] = await db_1.db.query('SELECT NOW() AS fecha_actual;');
        console.log('✅ Conexión exitosa a MySQL:', rows);
    }
    catch (err) {
        console.error('❌ Error al conectar a MySQL:', err);
    }
}
testConnection();
