import { createContext } from 'react';
import { IUser } from '../../interfaces/user';

interface IContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  logout: () => void;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
}

export const AuthContext = createContext({} as IContextProps);
