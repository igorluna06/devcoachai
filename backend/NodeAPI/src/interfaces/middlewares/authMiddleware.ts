import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../domain/errors/UserError";
import { verifyToken } from "../../utils/helper/jwtHelper";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError();
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch {
        throw new UnauthorizedError();
    }
}