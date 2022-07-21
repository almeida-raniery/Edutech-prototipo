import { Request, Response } from "express";
import createWorkspaceService from "../../services/workspaces/createWorkspace.service";

async function createWorkspace(req: Request, res: Response) {
  
    const { name} = req.body;
    
    const created = await createWorkspaceService({ name });
    console.log(name);
   
    return res.status(201).json(created);
}

export default createWorkspace;
