import { Request, Response } from "express";
import showUserService from "../../services/users/showUser.service";

async function showUser(req: Request, res: Response) {
    
  try {
    const infoUser = await showUserService(req.params.id);
    return res.status(200).json(infoUser);

} catch (err) {
    return res.status(400);
  }
}

export default showUser;
