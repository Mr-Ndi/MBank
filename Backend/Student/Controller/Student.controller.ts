import { error } from "console";
import { studentService } from "../Service/Student.service";
import { Request, Response } from "express"

const studService = new studentService()

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