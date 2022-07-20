import { Request, Response } from "express";
import { IworkspaceCreate } from "../../interfaces/Workspace.interface";
import WorkspaceRepository from "../../repositories/WorkspaceRepository";

async function showWorkspaceService({ name }: IworkspaceCreate) {
  const workspaces = await WorkspaceRepository.repo().find();
  const workspace = workspaces.find((workspace) => workspace.name === name);

  

  return workspace;
}

export default showWorkspaceService;
