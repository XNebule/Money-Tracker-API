const client = require("../../config/dbase")

exports.regisCred = async (email, password) => {
    const result = await client.query(
        `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`,
        [email, password]
    )
    return result.rows[0]
}

exports.loginCred = async (email) => {
    const result = await client.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    )
    return result.rows[0]
}