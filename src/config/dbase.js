const { Pool } = require("pg")

if (!process.env.DATABASE_URL) {
    throw new Error("Database dotenv is required")
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

pool.on("error", (err) => {
    console.error("Unexpected DB pool error: ", err)
    process.exit(-1)
})

module.exports = pool