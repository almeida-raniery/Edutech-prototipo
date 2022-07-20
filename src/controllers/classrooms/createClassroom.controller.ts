import { Request, Response } from "express";
import createClassroomService from "../../services/classrooms/createClassroom.service";

async function createClassroom(req: Request, res: Response) {

    const { classroomTitle } = req.body.title;

    const newClassroom = await createClassroomService(classroomTitle, req.params.course_id);


}

export default createClassroom;