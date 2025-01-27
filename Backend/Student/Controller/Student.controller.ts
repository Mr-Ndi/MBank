import { studentService } from "../Service/Student.service";
import { Request, Response } from "express"
import { OAuth2Client } from 'google-auth-library';
import { Student } from "../Model/Student.model";
import jwt from 'jsonwebtoken'


const studService = new studentService()
const students = new Student
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const oauthClient = new OAuth2Client(CLIENT_ID)

export const register = async (req: Request, res: Response): Promise<any> => {
    const {
        username,
        email,
        password,
        school,
        department,
        regnumber
    } = req.body
    if (! username || ! email || !password || !school || ! department || !regnumber) {
        res.status(400).json({error: "All fields are required"})
    }
    try {
        const message = await studService.newAccount(username, email, password, school, department, regnumber )
        res.status(201).json({message:`${message}`});
        return;
    } catch (error: any) {
        console.log(`Error occured ${error.message}`)
    }
}

export const loginginside = async(req: Request, res:Response):Promise<any> =>{
    const { email, password } = req.body
    
    if( !email || !password ){
        res.status(400).json({ error: "All fields are required"})
    }
    try {
        const token = await studService.checkingUser(password, email)
        res.status(200).json({message: "login successfuly", token: `${token}`})
        return;
    } catch (error:any) {
        console.log(`Error occured ${error.message}`)
    }
}
export const googleLogin = async (req: Request, res: Response): Promise<any> => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Google token is required" });
    }

    try {
        const ticket = await oauthClient.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ error: "Invalid Google token" });
        }

        const { email, name } = payload;
        let Stud = await students.findStudent(email!);
        if (!Stud) {
            Stud = await studService.newAccount(name!, email!, "google-auth", "", "", 0);
        }

        if (!Stud) {
            return res.status(500).json({ error: "Failed to create a new student account" });
        }
        const jwtSecret = process.env.JWT_SECREAT;
        if (!jwtSecret) {
            throw new Error("JWT secret is not defined");
        }
        const jwtToken = jwt.sign(
            { studentId: Stud.id, email: Stud.email },
            jwtSecret,
            { expiresIn: "1h" }
        );
        return res.status(200).json({
            message: "Login successful",
            token: jwtToken,
        });
    } catch (error: any) {
        console.error(`Google login error: ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
