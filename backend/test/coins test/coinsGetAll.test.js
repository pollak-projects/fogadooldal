import request from "supertest";
import app from "../../index.js";

test("GET /coins/getAll/:id should return 200", async () => {
  const testUserId = 2; 
  const response = await request(app).get(`/coins/getAll/${testUserId}`);

  expect(response.status).toBe(200);
});
