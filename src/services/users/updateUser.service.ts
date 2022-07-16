import { Request, Response } from "express";
import { IUser } from "../../interfaces/User.interface";
import UserRepository from "../../repositories/UserRepository";

async function updateUserService(id: string, objectUser: any) {

    objectUser.last_login = new Date();

    await UserRepository.update(id, objectUser);

    return "user updated";

}

export default updateUserService;