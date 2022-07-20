import { DeepPartial, FindManyOptions, FindOneOptions, FindOperator } from "typeorm";
import AppDataSource from "../data-source";
import { Role } from "../entities/Role";
import { INewRole, IRole } from "../interfaces/Role.interface";

class RolesRepository {
  static repo() {
    return AppDataSource.getRepository(Role);
  }

  static async create(data: INewRole) {
    const repository = AppDataSource.getRepository(Role);
    return await repository.create(data);
  }

  static async find(options: FindManyOptions<Role>) {
    const repository = AppDataSource.getRepository(Role);
    return await repository.find(options);
  }

  static async findOne(options: FindOneOptions<Role>) {
    const repository = AppDataSource.getRepository(Role);
    return await repository.findOne(options);
  }

  static async save(data: IRole) {
    const repository = AppDataSource.getRepository(Role);
    return await repository.save(data);
  }

  static async delete(id: number) {
    const repository = AppDataSource.getRepository(Role);
    return await repository.delete({ id });
  }

  static async softDelete(id: number) {
    const repository = AppDataSource.getRepository(Role);
    return await repository.softDelete({ id });
  }

  static async update(id: number, data: DeepPartial<Role>) {
    const repository = AppDataSource.getRepository(Role);
    return await repository.update({ id }, data);
  }
}

export default RolesRepository;