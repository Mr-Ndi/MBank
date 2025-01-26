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