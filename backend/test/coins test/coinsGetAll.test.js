import request from "supertest";
import app from "../../index.js";

test("POST /coins/getAll should pass", async () => {
  const response = await request(app).get("/coins/getAll").send();
  expect(response.status).toBe(200);
});
