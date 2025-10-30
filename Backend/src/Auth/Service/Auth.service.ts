import argon2 from 'argon2';
import AuthRepository from '../Repository/Auth.repo.js';
import { UserInterface } from '../Interface/Auth.interface.js';
import dotenv from 'dotenv';
dotenv.config();

export default class AuthService {
    static async handleGoogleAuth(profile: any): Promise<any> {
        let user = await AuthRepository.findUserByGoogleId(profile.id);

        if (!user) {
            user = await AuthRepository.createUser({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails?.[0].value,
                firstName: profile.name?.givenName || '',
                lastName: profile.name?.familyName || '',
            });
        }

        return user;
    }

    static async createUserWithPassword(userData: Partial<UserInterface>): Promise<UserInterface> {

        const existingUser = await AuthRepository.findUserByEmail(userData.email!);
        if (existingUser) {
            throw new Error('Email is already in use.');
        }
        const newUser = await AuthRepository.createUser({...userData, password: await argon2.hash(userData.password!)});
        return newUser;
    }
};
