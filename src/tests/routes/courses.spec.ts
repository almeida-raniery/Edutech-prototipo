import request, { Response } from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import { ICourseResponse } from "../mocked_data/interfaces/ICourseResponse";
import { IUserResponse } from "../mocked_data/interfaces/IUserResponse";
import { IWorkspaceResponse } from "../mocked_data/interfaces/IWorkspaceResponse";
import { mockedStudent, mockedWorkspace } from "../mocked_data/mocked-data";

let connection: DataSource;
let workspaceData: IWorkspaceResponse;
let adminUser: IUserResponse;
let studentUser: IUserResponse;
let testCourse: ICourseResponse;
let adminToken: string;
let studentToken: string;

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

  const newStudentUser = await request(app)
    .post(`${workspaceData.name}/users`)
    .send(mockedStudent);
  
  studentUser = newStudentUser.body.user;

  const adminLogin = await request(app)
    .post(`${workspaceData.name}/login`)
    .send({ email: adminUser.email, password: adminUser.email });

  const { token: adminRespToken } = adminLogin.body;

  adminToken = adminRespToken;

  const studentLogin = await request(app)
    .post(`${workspaceData.name}/login`)
    .send({ email: studentUser.email, password: studentUser.email });

  const { token: studentRespToken } = studentLogin.body;

  studentToken = studentRespToken;
});

afterAll(async () => {
  await connection.destroy();
});

describe("Testando criação de curso", () => {
  test("Deve criar um curso novo dentro de um workspace", async () => {
    const newCourse = {
      title: "Spanish",
    };

    const createResp = await request(app)
      .post(`${workspaceData.name}/courses`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newCourse);

    testCourse = createResp.body.course;

    expect(createResp.status).toBe(201);
    expect(testCourse).toBeDefined();
    expect(testCourse).toHaveProperty("id", "workspace");
    expect(testCourse.title).toBe(newCourse.title);
    expect(testCourse.workspace_id).toBe(workspaceData.id);
  });
});

describe("Testando listagem de cursos", () => {
  test("Deve listar todos os curso de um workspace como admin", async () => {
    const listResp = await request(app)
      .get(`${workspaceData.name}/courses`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(listResp.status).toBe(200);
    expect(listResp.body.courses).toBeDefined();
    expect(Array.isArray(listResp.body.courses)).toBe(true);
    expect(listResp.body.courses.length).toBeGreaterThan(0);
  });

  test("Deve listar um curso específico quando admin", async () => {
    const listResp = await request(app)
      .get(`${workspaceData.name}/courses/${testCourse.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(listResp.status).toBe(200);
    expect(listResp.body.course).toBeDefined();
    expect(listResp.body.course).toHaveProperty("id", "workspace");
    expect(listResp.body.course.name).toBe(testCourse.title);
    expect(listResp.body.course.workspace_id).toBe(testCourse.workspace_id);
  });

  test("Deve listar um curso específico quando cadastrado no curso", async () => {
    const listResp = await request(app)
      .get(`${workspaceData.name}/courses/${testCourse.id}`)
      .set("Authorization", `Bearer ${studentToken}`);

    expect(listResp.status).toBe(200);
    expect(listResp.body).toBeDefined;
    expect(listResp.body.course).toHaveProperty("id", "workspace_id");
    expect(listResp.body.course.title).toBe(testCourse.title);
    expect(listResp.body.workspace_id).toBe(testCourse.workspace_id);
  });
});

describe("Testando update de curso", () => {
  test("Deve fazer update em um curso quando admin", async () => {
    const updateResp = await request(app)
      .patch(`${workspaceData.name}/courses/${testCourse.id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Anthropology",
      });

    testCourse = updateResp.body.course;

    expect(updateResp.status).toBe(200);
    expect(testCourse).toBeDefined;
    expect(testCourse.title).toBe("Anthropology");
  });
});

describe("Testando deleção de curso", () => {
  test("Deve deletar um curso quando admin", async () => {
    const deleteResp = await request(app)
      .delete(`${workspaceData.name}/courses/${testCourse.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(deleteResp.status).toBe(200);

    const findResp = await request(app)
      .get(`${workspaceData.name}/courses/${testCourse.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(findResp.status).toBe(404);
  });
});
