import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import UserRepository from "../../repositories/UserRepository";

async function showUserService(id: string, workspace_name:string ) {

    const infoUser = await UserRepository.repo().findOneBy({id: id, role: { workspace: { name: workspace_name } }})

    if(!infoUser){
        throw new AppError("User not found", 404);
    }

    const userToBeReturned = {
        id: infoUser.id,
        name: infoUser.name,
        email: infoUser.email,
        created_at: infoUser.created_at,
        last_login: infoUser.last_login
    }

    return userToBeReturned;
}

export default showUserService;