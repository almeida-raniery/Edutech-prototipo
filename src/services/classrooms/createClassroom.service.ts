import { AppError } from "../../errors/AppError";
import { IClassroom } from "../../interfaces/Classroom.interface";
import ClassroomRepository from "../../repositories/ClassroomRepository";
import CourseRepository from "../../repositories/CourseRepository";
import { v4 as uuidv4 } from "uuid";

async function createClassroomService(
  classroomTitle: string,
  course_id: string
) {
    console.log(uuidv4())
  const classroomFind = await ClassroomRepository.repo().findOneBy({
    title: classroomTitle,
  });
  if (classroomFind) {
    throw new AppError("Classroom already exists", 400);
  }
  console.log("cheguei2");
  const courseExist = await CourseRepository.repo().findOneBy({
    id: course_id,
  });
  if (!courseExist) {
    throw new AppError("Course not exists", 400);
  }

  const newClassroom: IClassroom = {
    id: uuidv4(),
    title: classroomTitle,
    users: [],
    course_id: courseExist,
    created_at: new Date(),
  };

  await ClassroomRepository.create(newClassroom);
  await ClassroomRepository.save(newClassroom);

  return newClassroom;
}

export default createClassroomService;
