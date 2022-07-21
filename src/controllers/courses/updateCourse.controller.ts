import { Request, Response } from "express";
import updateCourseService from "../../services/courses/updateCourse.service";

async function updateCourse(req: Request, res: Response) {

    const newCourse = await updateCourseService( req.params.course_id, req.body.title)
    return res.status(200).json(newCourse)

}

export default updateCourse;