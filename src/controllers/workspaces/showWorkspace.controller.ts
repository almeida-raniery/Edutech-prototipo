import { Request, Response } from "express";
import showWorkspaceService from "../../services/workspaces/showWorkspace.service";

async function showWorkspace(req: Request, res: Response) {
  try {
    const {name} = req.params;
    const workspaces = await showWorkspaceService({ name });
    
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
