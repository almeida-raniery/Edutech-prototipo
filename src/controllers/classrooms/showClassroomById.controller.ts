import { request, Request, Response } from "express";
import showClassroomService from "../../services/classrooms/showClassroom.service";
import showClassroomServiceById from "../../services/classrooms/showClassroomById.service";

async function showClassroomById(req: Request, res: Response) {
  const workspace_name = req.baseUrl.split("/")[1];
  const course_id = req.baseUrl.split("/")[3];
  const classroom_id = req.params.id;

  const classes = await showClassroomServiceById(
    workspace_name,
    course_id,
    classroom_id
  );

  return res.status(200).json(classes);
}

export default showClassroomById;
