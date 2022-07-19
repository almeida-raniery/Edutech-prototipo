import createCourseService from "../../services/courses/createCourse.service";
import { Request, Response } from "express";

async function createCourse(req: Request, res: Response) {
    const { title } = req.body
    const workspaceName = req.params.workspace_name
    await createCourseService(title, workspaceName)
    return res.status(201).json({ message: "Course was created successfully" })
}

export default createCourse;