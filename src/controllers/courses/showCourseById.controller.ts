import { Request, Response } from "express";
import showCourseByIdService from "../../services/courses/showCourseById.service";

async function showCourseById(req: Request, res: Response) {

    const workspace_name = req.params.workspace_name;
    const courses = await showCourseService(req.params.course_id );
    return res.status(204).json(courses);


}

export default showCourseById;