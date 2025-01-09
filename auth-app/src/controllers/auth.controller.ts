import { Request, Response } from 'express';
import { generatePassword } from '@/utils/global';
import jwt from 'jsonwebtoken';
import { AuthResponse } from '@/types/auth.types';
import { AUTH_MESSAGES } from '@/constant/auth.constant';
import { User } from '@/types/user.types';


const users: User[] = [];

export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nik, role } = req.body;
        const id = generatePassword({
            length: 10,
            numbers: true,
            letters: false,
            symbols: false
        });

        if (nik.length !== 16) {
            return res.status(400).json({
                message: AUTH_MESSAGES.ERRORS.NIK_LENGTH
            });
        }

        const password = generatePassword({
            length: 6,
            numbers: true,
            letters: false,
            symbols: false
        });
    
        const user: User = {
            id: parseInt(id),
            nik,
            password,
            role
        };

        //validation nik already registered
        if (users.find(u => u.nik === nik)) {
            throw { code: 11000 };
        }

        users.push(user);

        const responseData = {
            ...user,
            password
        }
        
        return res.status(201).json({
            message: AUTH_MESSAGES.SUCCESS.REGISTERED,
            data: responseData
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(400).json({
                message: AUTH_MESSAGES.ERRORS.NIK_REGISTERED
            });
        }
        return res.status(500).json({
            message: err.message
        });
    }
};


export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nik, password } = req.body;

        const user = users.find(u => u.nik === nik && u.password === password);
        
        if (nik.length !== 16) {
            return res.status(400).json({
                message: AUTH_MESSAGES.ERRORS.NIK_LENGTH
            });
        }

        if (!user) {
            return res.status(400).json({
                message: AUTH_MESSAGES.ERRORS.INVALID_CREDENTIAL
            });
        }

        const token = jwt.sign({nik: user?.nik, role: user?.role}, process.env.JWT_SECRET || '', {expiresIn: '1h'});
        const {password: _, ...userWithoutPassword} = user;

        const authResponse: AuthResponse = {
            message: AUTH_MESSAGES.SUCCESS.LOGIN,
            data: {
                user: userWithoutPassword,
                token,
                type: 'Bearer'
            }
        }
        
        return res.status(200).json(authResponse);
    } catch (err: any) {
        return res.status(500).json({
            message: err.message
        });
    }
}

export const privateClaims = async (req: Request, res: Response): Promise<Response> => {
    try {
        return res.status(200).json({
            message: AUTH_MESSAGES.SUCCESS.PRIVATE_CLAIMS,
            data: req.user || {}
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message
        });
    }
}