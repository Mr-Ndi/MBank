import jwt from "jsonwebtoken";
import { Student } from "../Model/Student.model";

const studentModel = new Student();
export class studentService{

    private static JWT_SECREAT = process.env.JWT_SECREAT || "Your_own_token"
      /**
     * Creating a new user.
     * @param username - The nick name for the user.
     * @param email - The user's email account
     * @param password  - Student defined password
     * @param school - School that student belongs to
     * @param department - The department that a student belongs to.
     * @param regnumber - Student's own registration number.
     */
    async newAccount(
        username: string,
        email: string,
        password:string,
        school: string,
        department: string,
        regnumber: number): Promise <any>{
            const existingStudent = await studentModel.findStudent(email)
            if (existingStudent) {
                throw new Error ("Email is already in use.");
            }
            await studentModel.NewStudent(
                username,
                email,
                password,
                school,
                department,
                regnumber
            )
            console.log( "user registered" )
    }

    /**
     * Verfying if the the student is in database then allow him t enter the house
     * @param password - The provided password
     * @param email - The email account for the student
     * @returns A boolean indicating wether password matches or not
     */
    async checkingUser(password: string, email: string): Promise <any>{
        const student = await studentModel.findStudent(email)

        if (!student) {
            throw new Error("Invalid email or Password")
        }
        const validPassword = await studentModel.verfyPassword(password, student.password);
        if (!validPassword) {
            throw new Error(" Hey invalid Password is being used ")
        }
        const token = jwt.sign({ studentId: student.id, email: student.email }, studentService.JWT_SECREAT,{
            expiresIn: "1h"
        }
        );
        return token
    }
}