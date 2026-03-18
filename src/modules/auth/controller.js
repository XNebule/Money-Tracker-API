const aS = require("./services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../../utils/ApiError");

exports.regisCred = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || password == null) {
      throw new ApiError("Email and password required!", 400);
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const data = await aS.regisCred(email, hashedPass);

    res.status(201).json({
      success: true,
      Message: "Account created",
      data,
    });
  } catch (err) {
    if (err.code === "23505") {
      throw new ApiError("Email already registered!", 409);
    }
    next(err);
  }
};

exports.loginCred = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError("Email and password required!", 400);
    }

    const user = await aS.loginCred(email);

    if (!user) {
      throw new ApiError("Invalid credential!", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError("Invalid credential!", 401);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
        success: true,
        token
    })

  } catch (err) {
    next(err)
  }
};
