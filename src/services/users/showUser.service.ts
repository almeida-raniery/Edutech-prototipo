import { Request, Response } from "express";
import UserRepository from "../../repositories/UserRepository";

async function showUserService(id: string) {

    const infoUser = await UserRepository.repo().findOneBy({id: id})

    return infoUser;


}

export default showUserService;