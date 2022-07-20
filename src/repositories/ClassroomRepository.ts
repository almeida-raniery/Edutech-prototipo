import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";
import AppDataSource from "../data-source";
import { Classroom } from "../entities/ClassRoom";
import { IClassroom, IClassroomRequest } from "../interfaces/Classroom.interface";

class ClassroomRepository {
  static repo() {
    return AppDataSource.getRepository(Classroom);
  }

  static async create(data: IClassroomRequest) {
    const repository = AppDataSource.getRepository(Classroom);
    return await repository.create(data);
  }

  static async find(options: FindManyOptions<Classroom>) {
    const repository = AppDataSource.getRepository(Classroom);
    return await repository.find(options);
  }

  static async findOne(options: FindOneOptions<Classroom>) {
    const repository = AppDataSource.getRepository(Classroom);
    return await repository.findOne(options);
  }

  static async save(data: IClassroom) {
    const repository = AppDataSource.getRepository(Classroom);
    return await repository.save(data);
  }

  static async delete(id: string) {
    const repository = AppDataSource.getRepository(Classroom);
    return await repository.delete({ id });
  }

  static async softDelete(id: string) {
    const repository = AppDataSource.getRepository(Classroom);
    return await repository.softDelete({ id });
  }

  static async update(id: string, data: DeepPartial<Classroom>) {
    const repository = AppDataSource.getRepository(Classroom);
    return await repository.update({ id }, data);
  }
}

export default ClassroomRepository;