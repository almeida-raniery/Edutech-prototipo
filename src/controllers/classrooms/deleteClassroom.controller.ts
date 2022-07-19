import { Request, Response } from "express";
import deleteClassroomService from "../../services/classrooms/deleteClassroom.service";

async function deleteClassroom(req: Request, res: Response) {

    const classroomDeleted = await deleteClassroomService( req.params.id);
    return res.status(204).json(classroomDeleted);


}

export default deleteClassroom;