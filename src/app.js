const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const rateLimit = require("express-rate-limit")

const authRoutes = require("./modules/auth/routes")
const transactionRoutes = require("./modules/transaction/routes")
const categoryRoutes = require("./modules/category/routes")
const analyticRoutes = require("./modules/analytic/routes")

const authMiddleware = require("../middleware/auth")
const errorMiddleware = require("../middleware/error")
const ApiError = require("./utils/ApiError")

const app = express()
app.use(helmet())
app.use(cors())

const limiter = rateLimit ({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
})

app.use(limiter)
app.use(express.json())
app.use(express.static("public"))

app.use("/api/auth", authRoutes)
app.use("/api/transaction", authMiddleware, transactionRoutes)
app.use("/api/category", authMiddleware, categoryRoutes)
app.use("/api/analytic", authMiddleware, analyticRoutes)

app.use((req, res, next) => {
    const error = new ApiError("Route not found", 404)
    next(error)
})

app.use(errorMiddleware)

module.exports = app