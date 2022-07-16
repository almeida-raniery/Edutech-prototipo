import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";

async function deleteUser(req: Request, res: Response) {
  try {
    const userDeleted = await deleteUserService(req.params.id);

    return res.status(203).json(userDeleted);
  } catch (err) {
    return res.status(400);
  }
}

export default deleteUser;
