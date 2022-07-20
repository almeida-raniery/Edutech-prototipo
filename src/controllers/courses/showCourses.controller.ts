import { Request, Response } from "express";
import showCoursesService from "./../../services/courses/showCourses.service"

async function showCourses(req: Request, res: Response) {

    const workspace_name = req.params.workspace_name
    const courses = await showCoursesService(workspace_name);

    return res.status(200).json({courses});


}

export default showCourses;