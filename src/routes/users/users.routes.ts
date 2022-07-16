import { Router } from "express";
import createUser from "../../controllers/users/createUser.controller";
import deleteUser from "../../controllers/users/deleteUser.controller";
import loginUser from "../../controllers/users/loginUser.controller";
import showUser from "../../controllers/users/showUser.controller";
import updateUser from "../../controllers/users/updateUser.controller";

const route = Router();

route.post('/workspace_name/users', createUser);
route.post('/workspace_name/login', loginUser);
route.get('/workspace_name/user/:id', showUser);
route.patch('/workspace_name/users/:id', updateUser)
route.delete('/workspace_name/users/:id', deleteUser);

export default route;
