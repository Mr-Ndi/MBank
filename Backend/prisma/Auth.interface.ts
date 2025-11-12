export interface UserInterface {
  id: String;
  googleId: string | null;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: 'ADMIN' | 'GUEST';
  password?: string | null;
  createdAt: Date;
}

