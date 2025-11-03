import { Request, Response } from 'express';
import { signAccessToken } from '../../utils/jwt.js';
import AuthService from '../Service/Auth.service.js';


export default class AuthController {
    static async googleCallback (req: Request, res: Response): Promise<any> {
        try {
            const user = req.user;
            if (!user) {
                return res.status(400).json({ message: 'User information not found' });
            }

            const token = signAccessToken({ id: String(user.id), username: String(user.username) });

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

    static async loginWithPassword (req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;
            const result = await AuthService.loginWithPassword(email, password);
            return res.json({
                status: 'success',
                message: 'Login successful',
                data: [
                    result
                ]
            });
        } catch (err) {
            return res.status(500).json({ message: 'Login failed', error: err });
        }
    }
};
