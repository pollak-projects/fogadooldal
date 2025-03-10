import request from "supertest";
import app from "../../index.js";

test("POST /user/add should pass", async () => {
  const response = await request(app).post("/user/add").send({
    username: "test324",
    password: "test",
    email: "test543@test.com",
    full_name: "test4563",
  });
  console.log(response.text)
  await request(app)
    .delete(`/user/delete?id=${JSON.parse(response.text).id}`)
    .send();
  expect(response.status).toBe(201);
});
