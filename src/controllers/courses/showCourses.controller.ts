import { Request, Response } from "express";
import showCoursesService from "./../../services/courses/showCourses.service"

async function showCourses(req: Request, res: Response) {

    const workspace_name = req.baseUrl.split("/")
    const courses = await showCoursesService(workspace_name[1]);

    return res.status(200).json({courses});


}

export default showCourses;