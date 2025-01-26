import { register } from "../Controller/Student.controller";
import express from "express";

const studentRouter = express.Router()

studentRouter.post('/register', register)