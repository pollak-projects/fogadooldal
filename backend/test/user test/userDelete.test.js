import request from "supertest";
import app from "../../index.js";

test("DELETE /user/delete should work", async () => {
  // 1. Felhasználó létrehozása
  const userData = {
    username: `testuser_${Date.now()}`,
    password: "test123",
    email: `test_${Date.now()}@test.com`,
    full_name: `Test User_${Date.now()}`,
  };

  const createResponse = await request(app).post("/user/add").send(userData);

  const userId = createResponse.body.id;

  // 2. Törlés tesztelése
  const deleteResponse = await request(app)
    .delete(`/user/delete?id=${userId}`)
    .send();

  // 3. Eredmény ellenőrzése
  expect(deleteResponse.status).toBe(204);

  const getResponse = await request(app).get(`/user/get?id=${userId}`);
  expect(getResponse.status).toBe(404);
});
