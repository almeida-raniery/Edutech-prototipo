import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.service";

async function updateUser(req: Request, res: Response) {


    try{
        const updatedUser = await updateUserService(req.params.id, req.body);

        return res.status(201).json(updatedUser);

    }catch(err){
        return res.status(400);
    }

}

export default updateUser;