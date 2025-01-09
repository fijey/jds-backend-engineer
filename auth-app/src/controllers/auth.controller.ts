import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { generatePassword } from '@/utils/global';

export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nik, role } = req.body;
        const password = generatePassword({
            length: 6,
            numbers: true,
            letters: false,
            symbols: false
        });

    
        const user = new UserModel({
            nik,
            password,
            role
        });
    
        await user.save();
        
        return res.status(201).json({
            message: 'User Registered',
            data: user
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