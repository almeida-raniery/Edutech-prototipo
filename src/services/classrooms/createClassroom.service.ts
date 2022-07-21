import { AppError } from "../../errors/AppError";
import { IClassroom } from "../../interfaces/Classroom.interface";
import ClassroomRepository from "../../repositories/ClassroomRepository";
import CourseRepository from "../../repositories/CourseRepository";
import { v4 as uuidv4 } from "uuid";

async function createClassroomService(
  classroomTitle: string,
  course_Id: string
) {
  const classroomFind = await ClassroomRepository.repo().findOneBy({
    title: classroomTitle,
    course: { id: course_Id },
  });


  if (classroomTitle.length == 0) {
    throw new AppError(`Invalid parameters`, 400);
  }
  if (course_Id.length == 0) {
    throw new AppError(`Invalid parameters`, 400);
  }

  if (classroomFind) {
    throw new AppError("Classroom already exists", 404);
  }

  const course = await CourseRepository.repo().findOneBy({
    id: course_Id,
  });

  if (!course) {
    throw new AppError("Course not exists", 400);
  }

  const newClassroom: IClassroom = {
    id: uuidv4(),
    title: classroomTitle,
    users: [],
    course: course,
    created_at: new Date(),
  };

  await ClassroomRepository.create(newClassroom);
  await ClassroomRepository.save(newClassroom);

  const response = {
    title: newClassroom.title,
    class_id: newClassroom.id,
    course: newClassroom.course,
    created_at: newClassroom.created_at,
  };

  return response;
}

export default createClassroomService;
