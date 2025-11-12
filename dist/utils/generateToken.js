"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Se recomienda mover el secreto a variables de entorno
const ACCESS_SECRET = process.env.ACCESS_SECRET || 'secret12345utd';
// Función para generar token de acceso
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, ACCESS_SECRET, { expiresIn: '15m' } // Expira en 15 minutos
    );
};
exports.generateAccessToken = generateAccessToken;
// Función para verificar token (opcional, útil para middleware)
const verifyAccessToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
    }
    catch (err) {
        console.error('Token inválido:', err);
        return null;
    }
};
exports.verifyAccessToken = verifyAccessToken;
