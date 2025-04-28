import request from "supertest";
import app from "../../index.js";

test("GET /groups/getAll should return 200", async () => {
  const response = await request(app).get("/group/getAll");
  expect(response.status).toBe(200);
});
