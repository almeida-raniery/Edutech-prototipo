import { Request, Response } from "express";
import deleteClassroomService from "../../services/classrooms/deleteClassroom.service";

async function deleteClassroom(req: Request, res: Response) {

    const workspace_name = req.params.workspace_name;
    const classroomDeleted = await deleteClassroomService( req.params.id , workspace_name );
    return res.status(204).json(classroomDeleted);


}

export default deleteClassroom;