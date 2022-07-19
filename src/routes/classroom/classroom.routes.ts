import { Router } from "express";
import createClassroom from '../../controllers/classrooms/createClassroom.controller';
import showClassroom from '../../controllers/classrooms/showClassroom.controller';
import updateClassroom from '../../controllers/classrooms/updateClassroom.controller';
import deleteClassroom from '../../controllers/classrooms/deleteClassroom.controller';
import VerifyTokenId from "../../middlewares/authentication/VerifyTokenId.middleware";

const classroomRoute = Router();

classroomRoute.post('/:workspace_name/courses/:course_id/classes', createClassroom);
classroomRoute.get('/:workspace_name/courses/:course_id/classes', VerifyTokenId, showClassroom);
classroomRoute.get('/:workspace_name/courses/:course_id/classes/:id', VerifyTokenId, showClassroom);
classroomRoute.patch('/:workspace_name/courses/:course_id/classes/:id', VerifyTokenId, updateClassroom)
classroomRoute.delete('/:workspace_name/courses/:course_id/classes/:id', VerifyTokenId, deleteClassroom);

export default classroomRoute;
