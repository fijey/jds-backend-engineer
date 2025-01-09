import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { generatePassword } from '@/utils/global';
import bcrypt from 'bcryptjs';

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
    
        if (user && user.password !== password) {
            return res.status(400).json({
                message: 'credential not match'
            });
        }
    
        return res.status(200).json({
            message: 'Login success',
            data: user
        });
    } catch (err: any) {
        return res.status(500).json({
            message: err.message
        });
    }
}