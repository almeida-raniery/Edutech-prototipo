import { Router } from "express";
import createUser from "../../controllers/users/createUser.controller";
import showUser from "../../controllers/users/showUser.controller";
import deleteUserService from "../../services/users/deleteUser.service";
import updateUserService from "../../services/users/updateUser.service";

const route = Router();

route.post('/workspace_name/users', createUser);
route.get('/workspace_name/user', showUser);
route.patch('/workspace_name/users/:id', updateUserService)
route.delete('/workspace_name/users/:id', deleteUserService);

export default route;