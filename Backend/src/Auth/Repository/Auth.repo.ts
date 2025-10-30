import { PrismaClient } from "@prisma/client";
import { UserInterface } from "../Interface/Auth.interface.js";

const prisma = new PrismaClient();

export default class AuthRepository {
  static async findUserByGoogleId(googleId: string): Promise<UserInterface | null> {
    return await prisma.user.findUnique({
      where: { googleId },
    }); 
  }

  static async createUser(data: Partial<UserInterface>): Promise<UserInterface> {
    return await prisma.user.create({
      data: {
        googleId: data.googleId!,
        email: data.email!,
        firstName: data.firstName!,
        lastName: data.lastName!,
        username: data.username!,
      },
    });
  }
};
