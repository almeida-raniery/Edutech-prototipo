import { Request, Response } from "express";
import userLoginService from "../../services/users/loginUser.service";
import { Workspace } from '../../entities/Workspace';

async function loginUser(req: Request, res: Response){
        
        const workspace_name = req.params.workspace_name

        const userLogged = await userLoginService(req.body, workspace_name);
        return res.status(200).json({userLogged});

}

export default loginUser;