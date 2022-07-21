import { Router } from "express";
import createUser from "../../controllers/users/createUser.controller";
import deleteUser from "../../controllers/users/deleteUser.controller";
import loginUser from "../../controllers/users/loginUser.controller";
import showUser from "../../controllers/users/showUser.controller";
import updateUser from "../../controllers/users/updateUser.controller";
import verifyAdmin from "../../middlewares/authentication/verifyAdmin.middleware";
import VerifyToken from "../../middlewares/authentication/VerifyToken.middleware";

const userRoute = Router();

userRoute.post('/users', VerifyToken, verifyAdmin, createUser);
userRoute.post('/login', loginUser);
userRoute.get('/users/:id', VerifyToken, showUser);
userRoute.patch('/users/:id', VerifyToken, updateUser);
userRoute.delete('/users/:id', VerifyToken, verifyAdmin, deleteUser);

export default userRoute;
