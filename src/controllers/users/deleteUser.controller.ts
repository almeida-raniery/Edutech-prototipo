import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";

async function deleteUser(req: Request, res: Response) {
  
  const workspace_name = req.params.workspace_name;
  const userDeleted = await deleteUserService(req.params.id , workspace_name );
  return res.status(204).json(userDeleted);
}

export default deleteUser;
