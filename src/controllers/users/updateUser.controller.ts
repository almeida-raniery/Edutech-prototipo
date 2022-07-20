import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.service";

async function updateUser(req: Request, res: Response) {

    const workspace_name = req.params.workspace_name
    const updatedUser = await updateUserService(req.params.id, req.body, workspace_name);

    return res.status(201).json(updatedUser);

}

export default updateUser;
