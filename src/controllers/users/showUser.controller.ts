import { Request, Response } from "express";
import showUserService from "../../services/users/showUser.service";
import { instanceToPlain } from "class-transformer";


async function showUser(req: Request, res: Response) {

    const workspace_name = req.params.workspace_name    
    const infoUser = await showUserService(req.params.id, workspace_name);
    return res.status(200).json(instanceToPlain(infoUser));

}

export default showUser;
