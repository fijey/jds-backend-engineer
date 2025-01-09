import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { generatePassword } from '@/utils/global';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authResponse } from '../types/auth.types';

export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nik, role } = req.body;
        const password = generatePassword({
            length: 6,
            numbers: true,
            letters: false,
            symbols: false
        });

        const hashPassword = bcrypt.hashSync(password, 10);

    
        const user = new UserModel({
            nik,
            password: hashPassword,
            role
        });

        const responseData = {
            ...user.toJSON(),
            password
        }
    
        await user.save();
        
        return res.status(201).json({
            message: 'User Registered',
            data: responseData
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(400).json({
                message: 'NIK already registered'
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
    
        const user = await UserModel.findOne({ nik });

        if (!user) {
            return res.status(400).json({
                message: 'credential not match'
            });
        }

        console.log('truth password', user.password);
    
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                message: 'credential not match'
            });
        }

        const token = jwt.sign({nik: user?.nik, role: user?.role}, process.env.JWT_SECRET || '', {expiresIn: '1h'});
        const {password: _, ...userWithoutPassword} = user.toJSON();

        const authResponse: authResponse = {
            message: 'Login success',
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
            message: 'private claims',
            data: req.user || {}
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message
        });
    }
}