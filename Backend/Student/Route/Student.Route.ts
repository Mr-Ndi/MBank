import { loginginside, register } from "../Controller/Student.controller";
import express from "express";
import { validateRequest } from "../Middleware/validationMiddleware";
import { loginSchema, registerSchema } from "../Middleware/validationSchemas";

const studentRouter = express.Router()

studentRouter.post('/signup', validateRequest(registerSchema), register)
studentRouter.post('/login', validateRequest(loginSchema), loginginside)