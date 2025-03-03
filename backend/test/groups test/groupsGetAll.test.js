import request from "supertest";
import app from "../../index.js";

test("POST /groups/getAll should pass", async () => {
  const response = await request(app).get("/group/getAll").send();
  expect(response.status).toBe(200);
});
