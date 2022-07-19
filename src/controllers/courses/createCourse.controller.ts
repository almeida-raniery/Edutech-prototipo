import createCourseService from "../../services/courses/createCourse.service";

import { Request, Response } from "express";

async function createCourse(req: Request, res: Response) {
    try {
        const { title } = req.body
        const { role } = req.user
        const course = await createCourseService(title, role)
        return res.status(201).json(course)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({
                error: error.name,
                message: error.message,
            });
        }
    }
}

export default createCourse;