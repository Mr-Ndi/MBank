// import { studentService } from "../Service/Student.service.js";
// import { Request, Response } from "express";
// import { OAuth2Client } from "google-auth-library";
// import { Student } from "../Model/Student.model.js";
// import jwt from "jsonwebtoken";

// const studService = new studentService();
// const students = new Student();
// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
// const JWT_SECRET = process.env.JWT_SECRET!;
// const oauthClient = new OAuth2Client(CLIENT_ID);

// export const register = async (req: Request, res: Response): Promise<any> => {
//     const { username, email, password, school, department, regnumber } = req.body;

//     if (!username || !email || !password || !school || !department || !regnumber) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     try {
//         const message = await studService.newAccount(username, email, password, school, department, regnumber);
//         return res.status(201).json({ message: `${message}` });
//     } catch (error: any) {
//         console.error(`Error occurred: ${error.message}`);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// export const loginginside = async (req: Request, res: Response): Promise<any> => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     try {
//         const token = await studService.checkingUser(password, email);
//         return res.status(200).json({ message: "Login successful", token: `${token}` });
//     } catch (error: any) {
//         console.error(`Error occurred: ${error.message}`);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// export const googleLogin = async (req: Request, res: Response): Promise<any> => {
//     const { token } = req.body;

//     if (!token) {
//         return res.status(400).json({ message: "Google token is required" });
//     }

//     try {
//         const ticket = await oauthClient.verifyIdToken({
//             idToken: token,
//             audience: CLIENT_ID,
//         });

//         const payload = ticket.getPayload();
//         if (!payload) {
//             return res.status(400).json({ error: "Invalid Google token" });
//         }

//         const { email, name } = payload;
//         let Stud = await students.findStudent(email!);

//         if (!Stud) {
//             console.log("User not found, creating a new account...");
//             Stud = await studService.newAccount(name!, email!, "google-auth", "", "", 0);
//         }

//         if (!Stud) {
//             return res.status(500).json({ error: "Failed to create a new student account" });
//         }

//         const jwtToken = jwt.sign(
//             { studentId: Stud.id, email: Stud.email },
//             JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         return res.status(200).json({
//             message: "Login successful",
//             token: jwtToken,
//         });
//     } catch (error: any) {
//         console.error(`Google login error: ${error.message}`);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };
