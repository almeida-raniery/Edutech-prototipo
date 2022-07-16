import UserRepository from "../../repositories/UserRepository";

async function deleteUserService(id: string) {


    console.log("cheguei aqui no service")

    const userExists = UserRepository.repo().findOneBy({id: id});

    if(!userExists){
        throw new Error("User not found");
    }
  
    await UserRepository.delete(id);
  

    return "User deleted successfully"
    

}

export default deleteUserService;