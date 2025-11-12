import jwt from 'jsonwebtoken';

// Se recomienda mover el secreto a variables de entorno
const ACCESS_SECRET = process.env.ACCESS_SECRET || 'secret12345utd';

// Tipo opcional para payload
interface JwtPayload {
  userId: string;
}

// Función para generar token de acceso
export const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    { userId } as JwtPayload,
    ACCESS_SECRET,
    { expiresIn: '15m' } // Expira en 15 minutos
  );
};

// Función para verificar token (opcional, útil para middleware)
export const verifyAccessToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
  } catch (err) {
    console.error('Token inválido:', err);
    return null;
  }
};
