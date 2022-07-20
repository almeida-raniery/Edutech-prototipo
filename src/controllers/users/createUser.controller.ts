import { Request, Response } from "express";
import createUserService from "../../services/users/createUser.service";
import { instanceToPlain } from "class-transformer";

async function createUser(req: Request, res: Response) {

  const workspace_name = req.params.workspace_name;
  const { name, email, password, classroom_id, role_id } = req.body;
  const createdUser = await createUserService(
    name,
    email,
    password,
    classroom_id,
    role_id,
    workspace_name
  );

  return res.json(instanceToPlain(createdUser)); 
}

export default createUser;
