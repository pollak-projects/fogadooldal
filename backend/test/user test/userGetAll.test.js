import request from "supertest";
import app from "../../index.js";

test("POST /user/getAll should pass", async () => {
  const response = await request(app).get("/user/getAll").send();
  expect(response.status).toBe(200);
});
