import { AUTH_MESSAGES } from "@/constant/auth.constant";
import { TokenPayload } from "@/types/auth.types";
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
            message: AUTH_MESSAGES.ERRORS.UNAUTHORIZED
        });
    }
    try {
        const [_, tokenValue] = token.split(' ');
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET || '') as TokenPayload;
        req.user = decoded;

        next();
    } catch (err) {

        console.log('error', err);
        return res.status(401).json({
            message: AUTH_MESSAGES.ERRORS.UNAUTHORIZED
        });
    }
}