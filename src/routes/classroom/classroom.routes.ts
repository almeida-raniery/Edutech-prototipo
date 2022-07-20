import { Router } from "express";
import createClassroom from '../../controllers/classrooms/createClassroom.controller';
import showClassroom from '../../controllers/classrooms/showClassroom.controller';
import updateClassroom from '../../controllers/classrooms/updateClassroom.controller';
import deleteClassroom from '../../controllers/classrooms/deleteClassroom.controller';
import VerifyToken from '../../middlewares/authentication/VerifyToken.middleware';
import verifyAdmin from '../../middlewares/authentication/verifyAdmin.middleware';

const classroomRoute = Router();

classroomRoute.post('/:workspace_name/courses/:course_id/classes', createClassroom);
classroomRoute.get('/:workspace_name/courses/:course_id/classes', VerifyToken, showClassroom);
classroomRoute.get('/:workspace_name/courses/:course_id/classes/:id', VerifyToken, showClassroom);
classroomRoute.patch('/:workspace_name/courses/:course_id/classes/:id', VerifyToken, updateClassroom)
classroomRoute.delete('/:workspace_name/courses/:course_id/classes/:id', VerifyToken, verifyAdmin, deleteClassroom);

export default classroomRoute;
