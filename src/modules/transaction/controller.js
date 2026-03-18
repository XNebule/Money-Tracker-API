const ApiError = require("../../utils/ApiError");
const tS = require("./services");

exports.createTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, categoryId, date } = req.body;
    const userId = req.user.userId;

    if (!title || amount == null || !type) {
      throw new ApiError("Title, amount and type are required!", 400);
    }

    if (!["expense", "revenue"].includes(type)) {
      throw new ApiError("Invalid transaction type!", 400);
    }

    const data = await tS.createTransaction({
      title,
      amount,
      userId,
      type,
      categoryId,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Transaction created!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const { data, totalDocs, totalPages, page, limit } =
      await tS.getTransactions(userId, req.query);

    res.status(200).json({
      success: true,
      count: data.length,
      pagination: {
        page,
        limit,
        totalPages,
        totalDocs,
      },
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, amount, type, categoryId, date } = req.body;
    const userId = req.user.userId;

    if (!title || amount == null || !type) {
      throw new ApiError("Title, amount and type are required", 400);
    }

    const data = await tS.updateTransaction(
      id,
      title,
      amount,
      type,
      date || new Date(),
      categoryId,
      userId,
    );

    if (!data) {
        throw new ApiError("Transaction not found!", 404)
    }

    res.status(200).json({
        success: true,
        data
    })

  } catch (err) {
    next(err)
  }
};

exports.deleteTransaction = async (req, res, next) => {
    try {
        const { id } = req.params
        const userId = req.user.userId

        const data = await tS.deleteTransaction(id, userId)

        if (!data) {
            throw new ApiError("Transaction not found!", 404)
        }

        res.status(200).json({
            success: true,
            message: "Deleted successfully"
        })

    } catch (err) {
        next(err)
    }
}