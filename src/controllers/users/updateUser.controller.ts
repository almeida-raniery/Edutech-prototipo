import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.service";

async function updateUser(req: Request, res: Response) {
    console.log(req)
  const updatedUser = await updateUserService(
    req.params.id,
    req.body,
    req.user.role
  );

  return res.status(201).json(updatedUser);
}

export default updateUser;
