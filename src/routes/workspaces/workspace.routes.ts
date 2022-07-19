import { Router } from "express";

import createWorkspace from "../../controllers/workspaces/createWorkspace.controller";
import showWorkspace from "../../controllers/workspaces/showWorkspace.controller";

const workspaceRoute = Router();

workspaceRoute.post("/workspaces", createWorkspace);
workspaceRoute.get("/:workspace_name/:name", showWorkspace);

export default workspaceRoute;
