import { Router } from "express";
import createClassroom from '../../controllers/classrooms/createClassroom.controller';
import showClassroom from '../../controllers/classrooms/showClassroom.controller';
import updateClassroom from '../../controllers/classrooms/updateClassroom.controller';
import deleteClassroom from '../../controllers/classrooms/deleteClassroom.controller';
import VerifyToken from '../../middlewares/authentication/VerifyToken.middleware';
import verifyAdmin from '../../middlewares/authentication/verifyAdmin.middleware';

const classroomRoute = Router();

classroomRoute.post('',VerifyToken, verifyAdmin, createClassroom);
classroomRoute.get('', VerifyToken, showClassroom);
classroomRoute.get('/:id', VerifyToken, showClassroom);
classroomRoute.patch('/:id', VerifyToken, verifyAdmin, updateClassroom);
classroomRoute.delete('/:id', VerifyToken, verifyAdmin, deleteClassroom);

export default classroomRoute;
