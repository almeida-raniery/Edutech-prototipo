
import UserRepository from "../../repositories/UserRepository";

async function updateUserService(id: string, objectUser: any) {
    
    //verificando se usuário existe para gerar erro
    const user = await UserRepository.repo().findOneBy({ id: objectUser.id });
    
    await UserRepository.update(id, {...objectUser});
    

    return "user updated";

}

export default updateUserService;