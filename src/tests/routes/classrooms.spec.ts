import request, { Response } from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import { IClassroomResponse } from "../mocked_data/interfaces/IClassroomResponse";
import { ICourseResponse } from "../mocked_data/interfaces/ICourseResponse";
import { IUserResponse } from "../mocked_data/interfaces/IUserResponse";
import { IWorkspaceResponse } from "../mocked_data/interfaces/IWorkspaceResponse";
import {
  mockedCourse,
  mockedStudent,
  mockedWorkspace,
} from "../mocked_data/mocked-data";

let connection: DataSource;
let workspaceData: IWorkspaceResponse;
let adminUser: IUserResponse;
let studentUser: IUserResponse;
let testCourse: ICourseResponse;
let testClassroom: IClassroomResponse;
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

  const newCourse = await request(app)
    .post(`${workspaceData.name}/courses`)
    .send(mockedCourse);

  testCourse = newCourse.body.course;
});

afterAll(async () => {
  await connection.destroy();
});

describe("Testando criação de classe", () => {
  test("Deve criar uma classe nova dentro de um curso como admin", async () => {
    const newCourse = {
      title: "2009-101",
    };

    const createResp = await request(app)
      .post(`${workspaceData.name}/courses/${testCourse.id}/classes`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newCourse);

    testClassroom = createResp.body.classroom;
    studentUser.class_id = testClassroom.id

    expect(createResp.status).toBe(201);
    expect(testClassroom).toBeDefined();
    expect(testClassroom).toHaveProperty("id", "course_id");
    expect(testClassroom.title).toBe(newCourse.title);
    expect(testClassroom.course_id).toBe(testCourse.id);
  });
});

describe("Testando listagem de classes em um curso", () => {
  test("Deve listar todas as classes de um curso como admin", async () => {
    const listResp = await request(app)
      .get(`${workspaceData.name}/courses/${testCourse.id}/classes`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(listResp.status).toBe(200);
    expect(listResp.body.classes).toBeDefined();
    expect(Array.isArray(listResp.body.classes)).toBe(true);
    expect(listResp.body.classes.length).toBeGreaterThan(0);
  });

  test("Deve listar uma classe específca quando admin", async () => {
    const listResp = await request(app)
      .get(`${workspaceData.name}/courses/${testCourse.id}/classes/${testClassroom.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(listResp.status).toBe(200);
    expect(listResp.body.class).toBeDefined();
    expect(listResp.body.class).toHaveProperty("id", "course_id");
    expect(listResp.body.class.title).toBe(testClassroom.title);
    expect(listResp.body.class.course_id).toBe(testClassroom.course_id);
  });

  test("Deve listar uma classe específica quando cadastrado na classe", async () => {
    const listResp = await request(app)
      .get(`${workspaceData.name}/courses/${testCourse.id}/classes/${testClassroom.id}`)
      .set("Authorization", `Bearer ${studentToken}`);

    expect(listResp.status).toBe(200);
    expect(listResp.body).toBeDefined;
    expect(listResp.body.class).toHaveProperty("id", "course_id");
    expect(listResp.body.class.title).toBe(testClassroom.title);
    expect(listResp.body.class.course_id).toBe(testClassroom.course_id);
  });
});

describe("Testando update de classe", () => {
  test("Deve fazer update em uma classe quando admin", async () => {
    const updateResp = await request(app)
      .patch(`${workspaceData.name}/courses/${testCourse.id}/classes/${testClassroom.id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "2010-102",
      });

    testClassroom = updateResp.body.class;

    expect(updateResp.status).toBe(200);
    expect(testClassroom).toBeDefined;
    expect(testClassroom.title).toBe("2010-102");
  });
});

describe("Testando deleção de classe", () => {
  test("Deve deletar uma classe quando admin", async () => {
    const deleteResp = await request(app)
      .delete(`${workspaceData.name}/courses/${testCourse.id}/classes/${testClassroom.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(deleteResp.status).toBe(200);

    const findResp = await request(app)
      .get(`${workspaceData.name}/courses/${testCourse.id}/classes/${testClassroom.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(findResp.status).toBe(404);
  });
});
