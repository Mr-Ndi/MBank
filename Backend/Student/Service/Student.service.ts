import { Student } from "../Model/Student.model";

const studentModel = new Student();
export class studentService{

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
}