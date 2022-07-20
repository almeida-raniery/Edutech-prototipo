import { Request, Response } from "express";
import createWorkspaceService from "../../services/workspaces/createWorkspace.service";

<<<<<<< HEAD
function createWorkspace(req: Request, res: Response) {
=======
async function createWorkspace(req: Request, res: Response) {
  try {
    const { name} = req.body;
    
    const created = await createWorkspaceService({ name });
   
    return res.status(200).json(created);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({
        error: err.name,
        message: err.message,
      });
    }
  }
>>>>>>> c9269ae710d37522ee07532d3aebe0d72b047623
}

export default createWorkspace;
