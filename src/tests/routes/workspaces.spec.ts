import request from "supertest";
import app from "../../app";
import { Role } from "../../entities/Role";
import AppDataSource from "../../data-source";
import { DataSource } from "typeorm";
import { mockedWorkspace } from "../mocked_data/mocked-data";

describe("Testando geração de workspace", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Erro ao inicializar o servidor", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Deve criar um workspace novo pela rota /workspaces", async () => {
    const resp = await request(app).post("/workspaces").send(mockedWorkspace);

    expect(resp.status).toBe(201);
    expect(resp.body.name).toBe(mockedWorkspace.name);
    expect(resp.body.id).toBeDefined();
  });

  test("Workspace deve ter ao menos um papel de usuário", async () => {
    const roleRepository = AppDataSource.getRepository(Role);
    const roles = await roleRepository.findBy({
      workspace: { name: mockedWorkspace.name },
    });

    expect(roles.length).toBeGreaterThan(0);
  });

  test("Workspace deve ter um usuário com papel de admin", async () => {
    const roleRepository = AppDataSource.getRepository(Role);
    const adminRole = await roleRepository.findOneBy({
      workspace: { name: mockedWorkspace.name },
      permissions: 1,
    });

    expect(adminRole).toBeInstanceOf(Role);
    expect(adminRole?.users?.length).toBeGreaterThan(0);
  });
});
