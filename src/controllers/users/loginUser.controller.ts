import { Request, Response } from "express";
import userLoginService from "../../services/users/loginUser.service";

async function loginUser(req: Request, res: Response) {
        
  const workspace_name = req.params.workspace_name;

  const token = await userLoginService(req.body, workspace_name);
  return res.status(200).json({ token });
}

export default loginUser;
