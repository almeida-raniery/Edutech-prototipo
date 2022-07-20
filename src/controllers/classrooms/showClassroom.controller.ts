import { request, Request, Response } from "express";
import showClassroomService from "../../services/classrooms/showClassroom.service";

async function showClassroom(req: Request, res: Response) {

    const workspace_name = req.params.workspace_name;
    const course_id = req.params.id;
    const classes = await showClassroomService(workspace_name,course_id);
    
    return res.status(200).json(classes);
}

export default showClassroom;