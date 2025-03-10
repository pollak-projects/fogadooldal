import request from "supertest";
import app from "../../index.js";
import { json } from "express";

test("POST /user/delete should pass", async () => {
  const response = await request(app).post("/user/add").send({
    username: "test142",
    password: "test",
    email: "test4131@test.com",
    full_name: "test31",
  });
  const deleteResponse = await request(app)
    .delete(`/coin/delete?id=${JSON.parse(response.text).id}`)
    .delete(`/user/delete?id=${JSON.parse(response.text).id}`)
    .send();
  expect(deleteResponse.status).toBe(204);
});
