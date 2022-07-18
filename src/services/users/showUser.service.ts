import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import UserRepository from "../../repositories/UserRepository";

async function showUserService(id: string) {

    const infoUser = await UserRepository.repo().findOneBy({id: id})

    if(!infoUser){
        throw new AppError("User not found", 404);
    }

    return infoUser;
}

export default showUserService;