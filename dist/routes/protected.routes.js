"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../utils/auth.middleware");
const router = (0, express_1.Router)();
router.get('/profile', auth_middleware_1.authenticateToken, (req, res) => {
    const user = req.user;
    res.json({ message: 'Ruta protegida accedida correctamente', user });
});
exports.default = router;
