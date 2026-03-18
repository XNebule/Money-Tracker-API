const dS = require('./services')

exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = await dS.getDashboard(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};