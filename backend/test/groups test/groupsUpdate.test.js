import request from "supertest";
import app from "../../index.js";

test("POST /groups/update should pass", async () => {
  await request(app).post("/group/add").send({
    name: "test2",
    write: true,
    read: true,
    update: true,
    del: true,
  });
  const response = await request(app).put("/group/update").send({
    name: "test2",
    newname: "test3",
    write: true,
    read: false,
    update: true,
    del: false,
  });
  await request(app).delete("/group/delete").send({
    name: "test3",
  });
  expect(response.status).toBe(200);
});
