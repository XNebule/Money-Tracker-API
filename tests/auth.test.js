const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/config/dbase");

describe("Auth API", () => {
  it("should register a new user", async () => {

    const res = await request(app).post("/api/auth/register").send({
      email: "dummy1@example.com",
      password: "123456789",
    });

    console.log(res.body);
  });

  it("should login user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "dummy1@example.com",
        password: "123456789",
      })
    console.log(res.body)
  })
});

afterAll(async () => {
  await pool.end();
});
