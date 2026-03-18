const aS = require("./services");

exports.getCashflow = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = await aS.getCashflow(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMonthExpenses = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = await aS.getMonthExpenses(userId);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCatBreakdown = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = await aS.getCatBreakdown(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getInsights = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = await aS.getInsights(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};