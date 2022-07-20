import createCourseService from "../../services/courses/createCourse.service";
import { Request, Response } from "express";

async function createCourse(req: Request, res: Response) {
    const { title } = req.body
    const workspace_name = req.baseUrl.split("/")
    const newCourse = await createCourseService(title, workspace_name[1])
    return res.status(201).json({ newCourse })
}

export default createCourse;