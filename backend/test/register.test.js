import request from "supertest";
import app from "../index.js";

test("POST /auth/register should fail", async () => {
  const response = await request(app).post("/auth/register").send({
    username: "test",
    full_name: "test",
    email: "test@test.com",
    groupsNeve: "test",
    password: "test",
  });
  expect(response.status).toBe(400);
});
