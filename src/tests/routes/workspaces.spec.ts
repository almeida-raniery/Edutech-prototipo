import request from "supertest";
import app from "../../app";
import { Role } from "../../entities/Role";
import AppDataSource from "../../data-source";
describe("Testando geração de workspace", () => {
  let workspaceData = { name: "Kenzie" };

  test("Deve criar um workspace novo pela rota /workspaces", async () => {
    workspaceData = { name: "Kenzie" };
    const resp = await request(app).post("/workspaces").send(workspaceData);

    expect(resp.status).toBe(201);
    expect(resp.body.name).toBe(workspaceData.name);
    expect(resp.body.id).toBeDefined();
  });

  test("Workspace deve ter ao menos um papel de usuário", async () => {
    const roleRepository = AppDataSource.getRepository(Role);
    const roles = await roleRepository.findBy({
      workspace: { name: workspaceData.name },
    });

    expect(roles.length).toBeGreaterThan(0);
  });

  test("Workspace deve ter um usuário com papel de admin", async () => {
    const roleRepository = AppDataSource.getRepository(Role);
    const adminRole = await roleRepository.findOneBy({
      workspace: { name: workspaceData.name },
      permissions: 1,
    });

    expect(adminRole).toBeInstanceOf(Role);
    expect(adminRole?.users.length).toBeGreaterThan(0);
  });
});
