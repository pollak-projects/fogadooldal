import request from "supertest";
import app from "../../index.js";

test("POST /coins/add should fail", async () => {
  const userData = {
    username: `testuserCoinAdd_${Date.now()}`,
    password: "test123",
    email: `testuserCoinAdd_${Date.now()}@test.com`,
    full_name: `Test User_${Date.now()}`,
  };

  const createResponse = await request(app).post("/user/add").send(userData);

  const userId = createResponse.body.id;

  const response = await request(app)
    .put("/coins/update")
    .send({
      mennyiseg: 4546546,
      userid: Number(userId),
    });
  expect(response.status).toBe(200);
});
