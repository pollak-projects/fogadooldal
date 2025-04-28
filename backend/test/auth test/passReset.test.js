import request from "supertest";
import app from "../../index.js";

test("POST /auth/jelszoVisszaallitas should pass", async () => {
  const response = await request(app).post("/auth/jelszoVisszaallitas").send({
    email: "szilasimartin05@gmail.com",
  });
  expect(response.status).toBe(200);
});
