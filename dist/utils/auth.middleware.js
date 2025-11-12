"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const generateToken_1 = require("./generateToken");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer <token>"
    if (!token)
        return res.status(401).json({ message: 'Token no proporcionado' });
    const payload = (0, generateToken_1.verifyAccessToken)(token);
    if (!payload)
        return res.status(403).json({ message: 'Token inválido' });
    // Guardamos el payload en la request para usarlo después
    req.user = payload;
    next();
};
exports.authenticateToken = authenticateToken;
