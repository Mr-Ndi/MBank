import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import AuthService from '../Service/Auth.service.js';
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, 
async (accessToken: string, refreshToken: string, profile: Profile, done: Function) => {
  try {

    console.log("Profile:", profile)
    const result = await AuthService.handleGoogleAuth(profile);

    // For now, just return the profile:
    return done(null, result);
  } catch (error) {
    return done(error);
  }
}));

export default passport;
