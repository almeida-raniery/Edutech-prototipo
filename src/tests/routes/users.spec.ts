import request, { Response } from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import { IUserResponse } from "../mocked_data/interfaces/IUserResponse";
import { IWorkspaceResponse } from "../mocked_data/interfaces/IWorkspaceResponse";
import { mockedWorkspace } from "../mocked_data/mocked-data";

let connection: DataSource;
let workspaceData: IWorkspaceResponse;
let adminUser: IUserResponse;
let testUser: IUserResponse;
let token: string;

beforeAll(async () => {
  await AppDataSource.initialize()
    .then((res) => (connection = res))
    .catch((err) => {
      console.error("Erro ao inicializar o servidor", err);
    });

  const workspace = await request(app)
    .post("workspaces/")
    .send(mockedWorkspace);
  workspaceData = workspace.body;
  adminUser = workspaceData.user;

  const loginResp = await request(app)
    .post(`${workspaceData.name}/login`)
    .send({ email: adminUser.email, password: adminUser.email });

  const { token: respToken } = loginResp.body;

  token = respToken;
});

afterAll(async () => {
  await connection.destroy();
});

describe("Testando criação de usuário", () => {
  test("Deve criar um usuário novo dentro de um workspace", async () => {
    const newUser = {
      name: "Chang",
      email: "senorcheng@greendale.com",
      password: "changnesia",
      role: workspaceData.roleT.id,
    };

    const createResp = await request(app)
      .post(`${workspaceData.name}/users`)
      .set("Authorization", `Bearer ${token}`)
      .send(newUser);

    testUser = createResp.body.user;

    expect(createResp.status).toBe(201);
    expect(testUser).toBeDefined();
    expect(testUser).toHaveProperty("id", "role");
    expect(testUser.email).toBe(newUser.email);
    expect(testUser.name).toBe(newUser.name);
    expect(testUser.role_id).toBe(newUser.role);
  });
});

describe("Testando listagem de usuários", () => {
  test("Deve listar todos os usuários de um workspace como admin", async () => {
    const listResp = await request(app)
      .get(`${workspaceData.name}/users`)
      .set("Authorization", `Bearer ${token}`);

    expect(listResp.status).toBe(200);
    expect(listResp.body).toBeDefined();
    expect(Array.isArray(listResp.body)).toBe(true);
    expect(listResp.body.users.length).toBeGreaterThan(0);
  });

  test("Deve listar um usuário específico quando admin", async () => {
    const listResp = await request(app)
      .get(`${workspaceData.name}/users/${testUser.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(listResp.status).toBe(200);
    expect(listResp.body.user).toBeDefined();
    expect(listResp.body.user).toHaveProperty("id", "role");
    expect(listResp.body.user.email).toBe(testUser.email);
    expect(listResp.body.user.name).toBe(testUser.name);
    expect(listResp.body.user.role_id).toBe(testUser.role_id);
  });

  test("Deve listar um usuário específico quando mesmo usuário", async () => {
    const loginResp = await request(app)
      .post(`${workspaceData.name}/login}`)
      .send({ email: testUser.email, password: testUser.password });

    const { token } = loginResp.body;

    const listResp = await request(app)
      .get(`${workspaceData.name}/users/${testUser.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(listResp.status).toBe(200);
    expect(listResp.body).toBeDefined();
    expect(listResp.body).toHaveProperty("id", "role");
    expect(listResp.body.email).toBe(testUser.email);
    expect(listResp.body.name).toBe(testUser.name);
    expect(listResp.body.role_id).toBe(testUser.role_id);
  });
});

describe("Testando update de usuário", () => {
  test("Deve fazer update em um usuário quando admin", async () => {
    const updateResp = await request(app)
      .patch(`${workspaceData.name}/users/${testUser.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Kevin",
        email: "Kevin@greendale.com",
        role: workspaceData.roleS.id,
      });

    testUser = updateResp.body.user;

    expect(updateResp.status).toBe(200);
    expect(testUser).toBeDefined();
    expect(testUser.email).toBe("Kevin@greendale.com");
    expect(testUser.name).toBe("Kevin");
    expect(testUser.role_id).toBe(workspaceData.roleS.id);
  });

  test("Deve fazer update em um usuário quando mesmo usuário", async () => {
    const loginResp = await request(app)
      .post(`${workspaceData.name}/login}`)
      .send({ email: testUser.email, password: testUser.password });

    const { token } = loginResp.body;

    const updateResp = await request(app)
      .patch(`${workspaceData.name}/users/${testUser.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Chang", email: "Chang@greendale.com" });

    testUser = updateResp.body.user;

    expect(updateResp.status).toBe(200);
    expect(updateResp.body).toBeDefined();
    expect(testUser.email).toBe("Chang@greendale.com");
    expect(testUser.name).toBe("Chang");
  });
});

describe("Testando deleção de usuário", () => {
  test("Deve deletar um usuário quando admin", async () => {
    const deleteResp = await request(app)
      .delete(`${workspaceData.name}/users/${testUser.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResp.status).toBe(200);

    const findResp = await request(app)
      .get(`${workspaceData.name}/users/${testUser.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(findResp.status).toBe(404);
  });
});
