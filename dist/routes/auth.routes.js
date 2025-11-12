"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = require("express");
const router = (0, express_1.Router)();
// Ruta de prueba
router.get('/test', (req, res) => {
    res.json({ message: 'Ruta de autenticación funcionando 🚀' });
});
exports.default = router;
