const ApiError = require("../../utils/ApiError");
const cS = require("./services");

exports.createCat = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;

    if (!name) {
      throw new ApiError("Field cannot be empty!", 400);
    }

    const data = await cS.createCat(name, userId);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCats = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = await cS.getCats(userId);

    if (data.length === 0) {
      throw new ApiError("Category not found!", 404);
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.userId;

    if (!name) {
      throw new ApiError("Category name is required", 400);
    }

    const data = await cS.updateCat(id, name, userId);

    if (!data) {
      throw new ApiError("Category not found", 404);
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err)
  }
};

exports.deleteCat = async (req, res, next) => {
    try {
        const { id } = req.params
        const userId = req.user.userId
        const data = await cS.deleteCat(id, userId)
        
        if(!data) {
            throw new ApiError("Result can't be found", 404)
        }

        res.status(200).json({
            success: true,
            Message: "Deleted Successfully!"
        })

    } catch (err) {
        next(err)
    }
}