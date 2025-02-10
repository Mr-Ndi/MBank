import { googleLogin, loginginside, register } from "../Controller/Student.controller.ts";  
import express from "express";  
import { validateRequest } from "../Middleware/validationMiddleware.ts";  
import { loginSchema, registerSchema } from "../Middleware/validationSchemas.ts";  

const studentRouter = express.Router();

studentRouter.post("/signup", validateRequest(registerSchema), register);
studentRouter.post("/login", validateRequest(loginSchema), loginginside);
studentRouter.post("/google-login", googleLogin);

export default studentRouter;
