import request from "supertest";
import app from "../../index.js";

test("POST /groups/delete should pass", async () => {
  await request(app).post("/group/add").send({
    name: "test1",
    write: true,
    read: true,
    update: true,
    del: true,
  });
  const response = await request(app).delete("/group/delete").send({
    name: "test1",
  });
  expect(response.status).toBe(204);
});
