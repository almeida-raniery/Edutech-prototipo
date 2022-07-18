import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";

async function deleteUser(req: Request, res: Response) {
  const userDeleted = await deleteUserService(req.params.id);
  return res.status(204).json(userDeleted);
}

export default deleteUser;
