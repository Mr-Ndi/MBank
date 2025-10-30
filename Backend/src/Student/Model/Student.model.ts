// import { PrismaClient } from '@prisma/client'
// import argon2 from 'argon2'

// const prisma = new PrismaClient()

// export class Student{
//     /**
//      * Creating a new user.
//      * @param username - The nick name for the user.
//      * @param email - The user's email account
//      * @param password  - Student defined password
//      * @param school - School that student belongs to
//      * @param department - The department that a student belongs to.
//      * @param regnumber - Student's own registration number.
//      */
//     async NewStudent(
//         username: string,
//         email: string,
//         password:string,
//         school: string,
//         department: string,
//         regnumber: number
//     ){
//         try {
//             const hashedPassword = await argon2.hash(password)
//             const newStudent = await prisma.student.create({
//                 data: {
//                     username,
//                     email,
//                     password: hashedPassword,
//                     school,
//                     department,
//                     regnumber: Number(regnumber) 
//                 }
//         })
//         } catch (error:any) {
//             console.log(`Error occured ${error.message}`)
//         }
//         finally{
//             await prisma.$disconnect
//         }
//     }

//     /**
//      * Verfying if a user exist by using the email
//      * @param email - User email
//      * @returns - Student object if found otherwise null
//      */

//     async findStudent(email: string){
//         return prisma.student.findUnique({
//             where: { email }
//         });
//     }

//     /**
//      * Verfying if the password provided is the same as the one in the database
//      * @param password - The provided password
//      * @param hashedPassword - The password in the database
//      * @returns A boolean indicating wether password matches or not
//      */
//     async verfyPassword(password: string, hashedPassword:string){
//         return argon2.verify(hashedPassword, password)
//     }
// }