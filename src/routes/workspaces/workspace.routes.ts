import { Router } from "express";

import createWorkspace from "../../controllers/workspaces/createWorkspace.controller";
import showWorkspace from "../../controllers/workspaces/showWorkspace.controller";

const coursesRoutes = Router();

coursesRoutes.post("/workspace_name/workspaces", createWorkspace);
coursesRoutes.get("/workspace_name/:name", showWorkspace);

export default coursesRoutes;
