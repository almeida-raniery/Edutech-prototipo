import { AppError } from "../../errors/AppError";
import UserRepository from "../../repositories/UserRepository";

async function deleteUserService(id: string) {

    const userExists = await UserRepository.repo().findOneBy({id: id});

    if(!userExists){
        throw new AppError("User not found", 404);
    }
  
   const userDeleted = await UserRepository.delete(id);
  
    return userDeleted;
}

export default deleteUserService;