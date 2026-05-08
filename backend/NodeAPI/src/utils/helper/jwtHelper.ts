import jwt, { SignOptions } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"];

export function generateToken(payload: { userId: number; email: string }): string {
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string): { userId: number; email: string } {
    return jwt.verify(token, SECRET) as { userId: number; email: string };
}