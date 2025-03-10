import request from "supertest";
import app from "../../index.js";

test("POST /coins/add should fail", async () => {
  const response = await request(app).post("/coins/add").send({
    mennyiseg: 4546546,
    userid: 248,
  });
  expect(response.status).toBe(201);
});
