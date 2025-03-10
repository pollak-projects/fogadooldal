import request from "supertest";
import app from "../../index.js";

test("POST /auth/login should pass", async () => {
  const response = await request(app).post("/auth/login").send({
    username: "adika",
    password: "adi123",
  });
  expect(response.status).toBe(200);
});
