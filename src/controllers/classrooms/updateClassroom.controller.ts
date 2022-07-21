import { Request, Response } from "express";
import updateClassroomService from "../../services/classrooms/updateClassroom.service";

async function updateClassroom(req: Request, res: Response) {
    const { workspace_name } = req.params
    const { course_id } = req.params
    const { id } = req.params
    const { role } = req.user
    const { title } = req.body
    await updateClassroomService(workspace_name, course_id, id, role, title)
    return res.status(204).json({ message: "Classroom was updated successfully" })
}

export default updateClassroom;