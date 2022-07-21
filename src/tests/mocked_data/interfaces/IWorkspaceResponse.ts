import { IUserResponse } from "./IUserResponse";

export interface IWorkspaceResponse {
  message: string;
  user: IUserResponse;
  id:string;
  name:string;
  roleAdm: {
    id: number;
  };
  roleS: {
    id: number;
  };
  roleT: {
    id: number;
  };
}
