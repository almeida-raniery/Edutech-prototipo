import { Request, Response } from "express";
import showCourseByIdService from "../../services/courses/showCourseById.service"

async function showCourseById(req: Request, res: Response) {

    const course = await showCourseByIdService(req.params.course_id );
    return res.status(204).json(course);

}

export default showCourseById;