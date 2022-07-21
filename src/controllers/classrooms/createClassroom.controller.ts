import { Request, Response } from "express";
import createClassroomService from "../../services/classrooms/createClassroom.service";

async function createClassroom(req: Request, res: Response) {
    
    const courseId= req.baseUrl.split("/")[3];
    
    const newClassroom = await createClassroomService(req.body.title, courseId);

    return res.status(201).json(newClassroom);

}

export default createClassroom;