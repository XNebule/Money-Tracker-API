const request = require("supertest")
const app = require("../src/app")
const path = require('path')
const ApiError = require("../src/utils/ApiError")

require("dotenv").config({
    path: path.resolve(process.cwd(), '.env.test')
})

global.testContext = {
    token: null,
    userId: null,
    baseUrl: '/api'
}

beforeAll(async () => {
    const login = await request(app).post("/api/auth/login").send({
        email: "dummy1@example.com",
        password: "123456789"
    })

    if (!login.body.token) {
        throw new ApiError("Failed to authenticate test user")
    }

    global.testContext.token = login.body.token

    const jwt = require("jsonwebtoken")
    const decoded = jwt.decode(login.body.token)
    global.testContext.userId = decoded.userId

    console.log(`Test context ready (user: ${decoded.userId})`)
})