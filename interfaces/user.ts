export interface UserType {
  name?: string;
  cart?: any[];
  city?: string;
  address?: string;
  email: string;
}
export interface IUser {
  id: string;
  fullname: string;
  image: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
