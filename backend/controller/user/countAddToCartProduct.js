const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req?.userId;

    // Validate userId
    if (!userId) {
      return res.status(401).json({
        message: "User is not authenticated",
        error: true,
        success: false,
      });
    }

    // Count cart items for the user
    const count = await addToCartModel.countDocuments({ userId });

    return res.status(200).json({
      data: { count },
      message: "Cart item count retrieved successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error in countAddToCartProduct:", error);
    return res.status(500).json({
      message: error?.message || "An error occurred while counting cart items",
      error: true,
      success: false,
    });
  }
};

module.exports = countAddToCartProduct;
