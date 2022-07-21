import { Request, Response } from "express";
import createUserService from "../../services/users/createUser.service";
import { instanceToPlain } from "class-transformer";

async function createUser(req: Request, res: Response) {

  const workspace_name = req.baseUrl.split("/")
  const { name, email, password, classroom_id, role_id } = req.body;
  const createdUser = await createUserService(
    name,
    email,
    password,
    classroom_id,
    role_id,
    workspace_name[1]
  );

  return res.status(201).json(instanceToPlain(createdUser)); 
}

export default createUser;
