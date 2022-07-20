import { Request, Response } from "express";
import showWorkspaceService from "../../services/workspaces/showWorkspace.service";

async function showWorkspace(req: Request, res: Response) {
  try {
    const {workspace_name} = req.params;
    const workspaces = await showWorkspaceService({ name:workspace_name });
    
    return res.status(200).json(workspaces);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({
        error: err.name,
        message: err.message,
      });
    }
  }
}

export default showWorkspace;
