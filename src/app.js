const express = require("express")

const categoryRoutes = require("./modules/category/routes")
const authRoutes = require("./modules/auth/routes")

const authMiddleware = require("../middleware/auth")
const errorMiddleware = require("../middleware/error")
const ApiError = require("./utils/ApiError")

const app = express()

app.use(express.json())
app.use(express.static("public"))

app.use("/api/auth", authRoutes)
app.use("/api/category", authMiddleware, categoryRoutes)

app.use((req, res, next) => {
    const error = new ApiError("Route not found", 404)
    next(error)
})

app.use(errorMiddleware)

module.exports = app