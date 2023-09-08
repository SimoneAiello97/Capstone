import { IUser } from "./IUser";

export interface IAuthData {
  accessToken: string;
  user: IUser;
  username?:string;
}
