import { Request, Response } from "express";
import createClassroomService from "../../services/classrooms/createClassroom.service";

async function createClassroom(req: Request, res: Response) {

    const newClassroom = await createClassroomService(req.body.title, req.params.course_id);

    return res.status(201).json(newClassroom);

}

export default createClassroom;