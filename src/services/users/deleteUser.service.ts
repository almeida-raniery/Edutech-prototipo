import { AppError } from "../../errors/AppError";
import UserRepository from "../../repositories/UserRepository";

async function deleteUserService(id: string, workspace_name:string ) {
    
    const userExists = await UserRepository.repo().findOneBy({id: id});


    if(!userExists){
        throw new AppError("User not found", 404);
    }
  
   await UserRepository.delete(id);
}

export default deleteUserService;