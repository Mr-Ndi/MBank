import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
  username: string;
  role: 'ADMIN' | 'GUEST';
}

export function signAccessToken(payload: TokenPayload, expiresIn: string | number = '7d'): string {
  const secret: Secret = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error('JWT secret is not configured');
  }
  return jwt.sign(payload, secret, { expiresIn } as any);
}
