import { Router } from "express";
import createUser from "../../controllers/users/createUser.controller";
import deleteUser from "../../controllers/users/deleteUser.controller";
import loginUser from "../../controllers/users/loginUser.controller";
import showUser from "../../controllers/users/showUser.controller";
import updateUser from "../../controllers/users/updateUser.controller";
import VerifyTokenId from "../../middlewares/VerifyTokenId.middleware";

const userRoute = Router();

userRoute.post('/:workspace_name/users', createUser);
userRoute.post('/:workspace_name/login', loginUser);
userRoute.get('/:workspace_name/users/:id', VerifyTokenId, showUser);
userRoute.patch('/:workspace_name/users/:id', VerifyTokenId, updateUser)
userRoute.delete('/:workspace_name/users/:id', VerifyTokenId, deleteUser);

export default userRoute;
