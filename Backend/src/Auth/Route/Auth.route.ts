import express from 'express';
import passport from '../Config/passport.config.js';
import { AuthController } from '../Controller/Auth.controller.js';

const Authrouter = express.Router();
Authrouter.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

Authrouter.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/auth/login-failure' }), AuthController.googleCallback);

export default Authrouter;
