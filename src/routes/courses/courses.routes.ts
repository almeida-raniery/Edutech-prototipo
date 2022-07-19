import { Router } from "express";
import createCourse from '../../controllers/courses/createCourse.controller';
import showCourse from '../../controllers/courses/showCourse.controller';
import updateCourse from '../../controllers/courses/updateCourse.controller';
import deleteCourse from '../../controllers/courses/deleteCourse.controller';
import VerifyTokenId from "../../middlewares/authentication/VerifyTokenId.middleware";
import VerifyToken from '../../middlewares/authentication/VerifyToken.middleware';
import verifyAdmin from '../../middlewares/authentication/verifyAdmin.middleware';

const courseRoute = Router();

courseRoute.post('/:workspace_name/courses', VerifyToken, verifyAdmin, createCourse);
courseRoute.get('/:workspace_name/courses', VerifyTokenId, showCourse);
courseRoute.get('/:workspace_name/courses/:course_id', VerifyTokenId, showCourse);
courseRoute.patch('/:workspace_name/courses/:course_id', VerifyTokenId, updateCourse)
courseRoute.delete('/:workspace_name/courses/:course_id', VerifyToken, VerifyTokenId, verifyAdmin, deleteCourse);

export default courseRoute;
