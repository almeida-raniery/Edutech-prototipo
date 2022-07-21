import { Request, Response } from "express";
import showWorkspaceService from "../../services/workspaces/showWorkspace.service";

async function showWorkspace(req: Request, res: Response) {
  
    const {workspace_name} = req.params;
    const workspaces = await showWorkspaceService({ name:workspace_name });
    
    return res.status(200).json(workspaces);
  
}

export default showWorkspace;
