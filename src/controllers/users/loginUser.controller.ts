import { Request, Response } from "express";
import userLoginService from "../../services/users/loginUser.service";

async function loginUser(req: Request, res: Response){

    try{
        const userLogged = await userLoginService(req.body);
        return res.status(200).json({userLogged});

    }catch(err){
        return res.status(400);
    }
}

export default loginUser;