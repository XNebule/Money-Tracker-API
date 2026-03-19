const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/config/dbase");

let token;
let testCategoryId;

beforeAll(async () => {
  const login = await request(app).post("/api/auth/login").send({
    email: "dummy1@example.com",
    password: "123456789",
  });

  console.log("Login response:", login.body);

  token = login.body.token;

  if (!token) {
    throw new Error("No token received - check login response structure");
  }

  const categoryRes = await request(app)
    .post("/api/category")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test Category",
    });

  console.log("Category creation:", categoryRes.body);

  testCategoryId = categoryRes.body.data?.id;
  console.log("Category ID:", testCategoryId); // Debug this
});

describe("Transaction API", () => {
  it("should create transaction", async () => {
    // FIX: Use categoryId (camelCase) not category_id
    const transactionData = {
      title: "Test Transaction",
      amount: 1000,
      type: "expense",
      categoryId: testCategoryId, // <-- FIXED: was category_id
      date: "2024-03-19",
    };

    console.log("Sending:", transactionData);
c
    const res = await request(app)
      .post("/api/transaction")
      .set("Authorization", `Bearer ${token}`)
      .send(transactionData);

    console.log("Create response:", res.body);
    console.log("Status:", res.status);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.title).toBe("Test Transaction");
  });

  it("debug what controller receives", async () => {
    // Temporarily add console.log(req.body) in your transaction controller

    const res = await request(app)
      .post("/api/transaction")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Debug",
        amount: 100,
        type: "expense",
        categoryId: testCategoryId,
      });

    console.log("Full response:", res.status, res.body);
  });
});

afterAll(async () => {
  await pool.end();
});
