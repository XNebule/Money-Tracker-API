const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error = new Error("Unauthorized!");
      error.status = 401;
      return next(error);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token: ", decoded)

    req.user = {
      userId: decoded.userId
    }
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
