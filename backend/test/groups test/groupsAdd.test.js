import request from "supertest";
import app from "../../index.js";

test("POST /groups/add should pass", async () => {
  const response = await request(app).post("/group/add").send({
    name: "test",
    write: true,
    read: true,
    update: true,
    del: true,
  });
  await request(app).delete("/group/delete").send({
    name: "test",
  });
  expect(response.status).toBe(201);
});
