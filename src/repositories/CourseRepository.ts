import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";
import AppDataSource from "../data-source";
import { Course } from "../entities/Course";
import { ICourseRequest } from "../interfaces/Course.interface";

class CourseRepository {
  static repo() {
    return AppDataSource.getRepository(Course);
  }

  static async create(data: ICourseRequest) {
    const repository = AppDataSource.getRepository(Course);
    return await repository.create(data);
  }

  static async find(options: FindManyOptions<Course>) {
    const repository = AppDataSource.getRepository(Course);
    return await repository.find(options);
  }

  static async findOne(options: FindOneOptions<Course>) {
    const repository = AppDataSource.getRepository(Course);
    return await repository.findOne(options);
  }

  static async save(data: ICourseRequest) {
    const repository = AppDataSource.getRepository(Course);
    return await repository.save(data);
  }

  static async delete(id: string) {
    const repository = AppDataSource.getRepository(Course);
    return await repository.delete({ id });
  }

  static async softDelete(id: string) {
    const repository = AppDataSource.getRepository(Course);
    return await repository.softDelete({ id });
  }

  static async update(id: string, data: DeepPartial<Course>) {
    const repository = AppDataSource.getRepository(Course);
    return await repository.update({ id }, data);
  }
}

export default CourseRepository;