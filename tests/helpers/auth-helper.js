const request = require("supertest");
const app = require("../../src/app");

class AuthHelper {
  constructor() {
    this.token = null;
    this.userId = null;
  }

  async init() {
    if (this.token) return this;

    const res = await request(app).post("/api/auth/login").send({
      email: "dummy1@example.com",
      password: "123456789",
    });

    this.token = res.body.token

    const jwt = require("jsonwebtoken")
    const decoded = jwt.decode(this.token)
    this.userId = decoded.userId

    return this
  }

  getToken() {
    return this.token || global.testContext?.token
  }

  getUserId() {
    return this.userId || global.testContext?.userId
  }

  authHeader() {
    return `Bearer ${this.getToken()}`
  }
}

module.exports = new AuthHelper()