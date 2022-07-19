import { Request, Response } from "express";
import deleteCourseService from "../../services/courses/deleteCourse.service";

async function deleteCourse(req: Request, res: Response) {

    const workspace_name = req.params.workspace_name;
    const courseDeleted = await deleteCourseService(req.params.course_id , workspace_name );
    return res.status(204).json(courseDeleted);

}

export default deleteCourse;