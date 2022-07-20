import { Router } from "express";
import createCourse from '../../controllers/courses/createCourse.controller';
import showCourses from '../../controllers/courses/showCourses.controller';
import showCourseById from '../../controllers/courses/showCourseById.controller';
import updateCourse from '../../controllers/courses/updateCourse.controller';
import deleteCourse from '../../controllers/courses/deleteCourse.controller';
import VerifyToken from '../../middlewares/authentication/VerifyToken.middleware';
import verifyAdmin from '../../middlewares/authentication/verifyAdmin.middleware';

const courseRoute = Router();

courseRoute.post('', VerifyToken, verifyAdmin, createCourse);
courseRoute.get('', VerifyToken, verifyAdmin, showCourses);
courseRoute.get('/:course_id', VerifyToken, verifyAdmin, showCourseById);
courseRoute.patch('/:course_id', VerifyToken, verifyAdmin, updateCourse);
courseRoute.delete('/:course_id', VerifyToken, verifyAdmin, deleteCourse);


export default courseRoute;
