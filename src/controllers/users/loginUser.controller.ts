import { Request, Response } from "express";
import userLoginService from "../../services/users/loginUser.service";

async function loginUser(req: Request, res: Response) {
  
const splitBaseUrl = req.baseUrl.split("/");
  const workspace_name = splitBaseUrl[1];

  const token = await userLoginService(req.body, workspace_name);
  return res.status(200).json({ token });
}

export default loginUser;
