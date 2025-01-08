import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model';

export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nik, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = new UserModel({
            nik,
            password: hashedPassword,
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