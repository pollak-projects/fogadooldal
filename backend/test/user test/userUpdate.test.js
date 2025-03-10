import request from "supertest";
import app from "../../index.js";

test("POST /user/update should pass", async () => {
  const response = await request(app).post("/user/add").send({
    username: "test3645",
    password: "test",
    email: "test634643@test.com",
    full_name: "test53456",
  });
  const updateResponse = await request(app)
    .put(`/user/update?id=${JSON.parse(response.text).id}`)
    .send({
      username: "test543",
      password: "test",
      email: "test7658@test.com",
      groupsNeve: "admin",
    });
  await request(app)
    .delete(`/user/delete?id=${JSON.parse(response.text).id}`)
    .send();
  expect(updateResponse.status).toBe(200);
});
