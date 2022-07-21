import { request, Request, Response } from "express";
import updateClassroomService from "../../services/classrooms/updateClassroom.service";

async function updateClassroom(req: Request, res: Response) {
  const workspace_name = req.baseUrl.split("/")[1];
  const course_id = req.baseUrl.split("/")[3];
  const class_id = req.params.id;
  const { role } = req.body;
  const { title } = req.body;
  

  const update= await updateClassroomService(
    workspace_name,
    course_id,
    class_id,
    role,
    title
  ); 

  return res.status(200).json(update);
}

export default updateClassroom;
