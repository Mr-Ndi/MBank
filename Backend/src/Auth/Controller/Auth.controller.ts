import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


export const AuthController = {
  googleCallback: async (req: Request, res: Response): Promise<any> => {
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

        // Typically, you'd redirect the frontend with token as query param
        // Example: res.redirect(`https://your-frontend.com/auth?token=${token}`);
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
    },
};
