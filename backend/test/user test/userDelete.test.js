import request from "supertest";
import app from "../../index.js";
import { json } from "express";

test("POST /user/delete should pass", async () => {
  await request(app).post("/user/add").send({
    username: "test1",
    password: "test",
    email: "test@test.com",
    full_name: "test",
  });
  const response = await request(app)
    .delete(`/user/delete?id=${JSON.parse(response.text).id}`)
    .send();
  expect(response.status).toBe(204);
});
