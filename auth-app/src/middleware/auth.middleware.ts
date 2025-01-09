import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare module 'express' {
    interface Request {
        user?: {
            nik: string;
            role: string;
        };
    }
}

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization') || '';

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    try {
        const [_, tokenValue] = token.split(' ');
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET || '') as {nik: string, role: string};
        req.user = decoded;
        console.log('decoded', decoded);
        next();
    } catch (err) {

        console.log('error', err);
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}