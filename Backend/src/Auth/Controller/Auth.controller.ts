import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthService from '../Service/Auth.service.js';


export default class AuthController {
    static async googleCallback (req: Request, res: Response): Promise<any> {
        try {
            const user = req.user;
            if (!user) {
                return res.status(400).json({ message: 'User information not found' });
            }

            const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                username: user.username,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
            );

            return res.json({
                status: 'success',
                message: 'Google login successful',
                data:[
                    {
                        token,
                        ...user
                    }
                ]
            });
        } catch (err) {
            return res.status(500).json({ message: 'Authentication failed', error: err });
        }
    }

    static async createUserWithPassword (req: Request, res: Response): Promise<any> {
        try {
            const result = await AuthService.createUserWithPassword(req.body);
            const { password, ...userWithoutPassword } = result;
            return  res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: userWithoutPassword
            });
        } catch (err) {
            return res.status(500).json({ message: 'User creation failed', error: err });
        }
    }
};
