import express from 'express';
import passport from '../Config/passport.config.js';
import AuthController  from '../Controller/Auth.controller.js';
import SharedMiddleware from '../../utils/middleware.shared.js';
import { loginSchema, registerSchema } from '../Schema/Auth.schema.js';

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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with basic information and a hashed password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - username
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Alce
 *                 description: The user's first name (2–30 characters).
 *               lastName:
 *                 type: string
 *                 example: Johnsorn
 *                 description: The user's last name (2–30 characters).
 *               username:
 *                 type: string
 *                 example: alcej
 *                 description: The username for login (3–30 characters).
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alic.johnson@example.com
 *                 description: The user's unique email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: securePass123
 *                 description: The user's password (minimum 6 characters, will be hashed).
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: e827d81b-2b08-435f-933f-7873880ca903
 *                     googleId:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: alic.johnson@example.com
 *                     firstName:
 *                       type: string
 *                       example: Alce
 *                     lastName:
 *                       type: string
 *                       example: Johnsorn
 *                     username:
 *                       type: string
 *                       example: alcej
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-10-30T17:22:03.800Z
 *       400:
 *         description: Validation error or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid input data
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

Authrouter.post('/register', SharedMiddleware.validateBody(registerSchema), AuthController.createUserWithPassword);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user with their email and password. Returns a JWT access token and basic user info.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alic.johnson@example.com
 *                 description: The user's registered email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: securePass123
 *                 description: The user's plain text password to be verified.
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                       description: JWT access token used for authentication.
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           example: e827d81b-2b08-435f-933f-7873880ca903
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: alic.johnson@example.com
 *                         firstName:
 *                           type: string
 *                           example: Alce
 *                         lastName:
 *                           type: string
 *                           example: Johnsorn
 *                         username:
 *                           type: string
 *                           example: alcej
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: 2025-10-30T17:22:03.800Z
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

Authrouter.post('/login',SharedMiddleware.validateBody(loginSchema), AuthController.loginWithPassword);

export default Authrouter;
