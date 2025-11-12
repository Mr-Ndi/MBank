import { UserInterface } from '../Auth/Interface/Auth.interface';
import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserInterface;
  }
}
