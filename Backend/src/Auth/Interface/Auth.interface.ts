export interface UserInterface {
  id: String;
  googleId: string | null;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password?: string | null;
  createdAt: Date;
}

