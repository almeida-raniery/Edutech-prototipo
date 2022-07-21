import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IworkspaceCreate } from "../../interfaces/Workspace.interface";
import WorkspaceRepository from "../../repositories/WorkspaceRepository";

async function showWorkspaceService({ name }: IworkspaceCreate) {
  const workspaces = await WorkspaceRepository.repo().find();
  const workspace = workspaces.find((workspace) => workspace.name === name);
  

  if (name.length == 0) {
    throw new AppError(`Invalid parameters`, 400);
  }

  if (!workspace) {
    throw new AppError(`Name ${name} is not found`,404);
  }

  return workspace;
}

export default showWorkspaceService;
