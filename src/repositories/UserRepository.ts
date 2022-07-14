import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";
import AppDataSource from "../data-source";
import { User } from "../entities/User";
import { IUserRequest } from "../interfaces/User.interface";

class UserRepository {
  static repo() {
    return AppDataSource.getRepository(User);
  }

  static async create(data: IUserRequest) {
    const repository = AppDataSource.getRepository(User);
    return await repository.create(data);
  }

  static async find(options: FindManyOptions<User>) {
    const repository = AppDataSource.getRepository(User);
    return await repository.find(options);
  }

  static async findOne(options: FindOneOptions<User>) {
    const repository = AppDataSource.getRepository(User);
    return await repository.findOne(options);
  }

  static async save(data: IUserRequest) {
    const repository = AppDataSource.getRepository(User);
    return await repository.save(data);
  }

  static async delete(id: string) {
    const repository = AppDataSource.getRepository(User);
    return await repository.delete({ id });
  }

  static async softDelete(id: string) {
    const repository = AppDataSource.getRepository(User);
    return await repository.softDelete({ id });
  }

  static async update(id: string, data: DeepPartial<User>) {
    const repository = AppDataSource.getRepository(User);
    return await repository.update({ id }, data);
  }
}

export default UserRepository;
