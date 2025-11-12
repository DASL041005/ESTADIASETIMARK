import { Router, Request, Response } from 'express';
import { authenticateToken } from '../utils/auth.middleware';

const router = Router();

router.get('/profile', authenticateToken, (req: Request, res: Response) => {
    res.json({
        message: 'Ruta protegida funcionando ',
        user: (req as any).user
    });
});

export default router;
