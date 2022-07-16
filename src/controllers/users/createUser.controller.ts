import { Request, Response } from "express";
import createUserService from "../../services/users/createUser.service";
import { instanceToPlain } from "class-transformer";

async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const createdUser = await createUserService(name, email, password);

    return res.json(instanceToPlain(createdUser));
    
  } catch (err) {
    return res.status(400);
  }
}

export default createUser;
