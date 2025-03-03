import request from "supertest";
import app from "../../index.js";

test("POST /user/update should pass", async () => {
  await request(app).post("/group/add").send({
    username: "test",
    password: "test",
    email: "test@test.com",
    full_name: "test",
  });
  const response = await request(app).put("/user/update").send({
    username: "test543",
    password: "test",
    email: "test@test.com",
    groupsNeve: "admin",
  });
  await request(app)
    .delete(`/user/delete?id=${JSON.parse(response.text).id}`)
    .send();
  expect(response.status).toBe(200);
});
