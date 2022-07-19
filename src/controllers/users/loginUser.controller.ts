import { Request, Response } from "express";
import userLoginService from "../../services/users/loginUser.service";

async function loginUser(req: Request, res: Response) {
        
  const workspace_name = req.params.workspace_name;
  console.log(workspace_name)

  const userLogged = await userLoginService(req.body, workspace_name);
  return res.status(200).json({ userLogged });
}

export default loginUser;
