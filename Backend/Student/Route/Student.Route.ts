import { loginginside, register } from "../Controller/Student.controller";
import express from "express";

const studentRouter = express.Router()

studentRouter.post('/signup', register)
studentRouter.post('/login', loginginside)