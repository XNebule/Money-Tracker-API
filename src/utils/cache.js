const redis = require("../config/redis")

exports.getCache = async (key) => {
    console.log("GET CACHE: ", key)
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
}

exports.setCache = async (key, value, ttl = 60) => {
    console.log("SET CACHE: ", key)
    await redis.set(key, JSON.stringify(value), "EX", ttl)
}

exports.deleteCache = async (key) => {
    await redis.del(key)
}