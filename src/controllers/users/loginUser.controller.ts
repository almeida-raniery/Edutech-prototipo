import { Request, Response } from "express";
import userLoginService from "../../services/users/loginUser.service";

async function loginUser(req: Request, res: Response){

        const userLogged = await userLoginService(req.body);
        return res.status(200).json({userLogged});

}

export default loginUser;