import { Router } from "express";
import VerifyTokenId from "../../middlewares/VerifyTokenId.middleware";
import createCourse from '../../controllers/courses/createCourse.controller';
import showCourse from '../../controllers/courses/showCourse.controller';
import updateCourse from '../../controllers/courses/updateCourse.controller';
import deleteCourse from '../../controllers/courses/deleteCourse.controller';

const courseRoute = Router();

courseRoute.post('/:workspace_name/courses', createCourse);
courseRoute.get('/:workspace_name/courses', VerifyTokenId, showCourse);
courseRoute.get('/:workspace_name/courses/:course_id', VerifyTokenId, showCourse);
courseRoute.patch('/:workspace_name/courses/:course_id', VerifyTokenId, updateCourse)
courseRoute.delete('/:workspace_name/courses/:course_id', VerifyTokenId, deleteCourse);

export default courseRoute;
