const express = require("express")

const categoryRoutes = require("./modules/category/routes")

const ApiError = require("./utils/ApiError")

const app = express()

app.use(express.json())
app.use(express.static("public"))

app.use("/api/category", categoryRoutes)

app.use((req, res, next) => {
    const error = new ApiError("Route not found", 404)
    next(err)
})

module.exports = app