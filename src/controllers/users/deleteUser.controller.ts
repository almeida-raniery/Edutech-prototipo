import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";

async function deleteUser(req: Request, res: Response) {
  try {
    await deleteUserService(req.params.id);

    return res.status(204);
  } catch (err) {
    return res.status(400);
  }
}

export default deleteUser;
