import express from 'express';
import passport from '../Config/passport.config.js';
import AuthController  from '../Controller/Auth.controller.js';
import SharedMiddleware from '../../utils/middleware.shared.js';
import { registerSchema } from '../Schema/Auth.schema.js';

const Authrouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user authentication using Google OAuth2
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Start Google OAuth2 login flow
 *     description: >
 *       Redirects the user to Google’s OAuth 2.0 consent screen where they can grant access
 *       to their Google account. After consent, Google redirects the user back to the callback URL.
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth consent screen
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Handle Google OAuth2 callback
 *     description: >
 *       This endpoint handles the callback from Google after successful authentication.
 *       It verifies the user, generates a JWT token, and returns it in the response body.
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code returned by Google.
 *       - in: query
 *         name: scope
 *         schema:
 *           type: string
 *         required: false
 *         description: The scopes granted by the user.
 *     responses:
 *       200:
 *         description: Successfully authenticated with Google and generated JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Google login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: User information not found or invalid Google credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User information not found
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Authentication failed or server error
 */

Authrouter.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

Authrouter.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/auth/login-failure' }), AuthController.googleCallback);

Authrouter.post('/register', SharedMiddleware.validateBody(registerSchema), AuthController.createUserWithPassword);

export default Authrouter;
