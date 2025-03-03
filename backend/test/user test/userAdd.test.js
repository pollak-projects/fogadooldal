import request from "supertest";
import app from "../../index.js";

test("POST /user/add should pass", async () => {
  const response = await request(app).post("/user/add").send({
    username: "test",
    password: "test",
    email: "test@test.com",
    full_name: "test",
  });
  await request(app)
    .delete(`/user/delete?id=${JSON.parse(response.text).id}`)
    .send();
  expect(response.status).toBe(201);
});
