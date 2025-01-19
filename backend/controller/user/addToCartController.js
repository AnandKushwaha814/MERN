const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req?.userId;

    // Validate input
    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
        error: true,
      });
    }

    if (!currentUser) {
      return res.status(401).json({
        message: "User is not authenticated",
        success: false,
        error: true,
      });
    }

    // Check if the product is already in the cart for the current user
    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvailable) {
      return res.status(409).json({
        message: "Product already exists in the cart",
        success: false,
        error: true,
      });
    }

    // Create new cart item
    const payload = {
      productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new addToCartModel(payload);
    const savedProduct = await newAddToCart.save();

    return res.status(201).json({
      data: savedProduct,
      message: "Product added to cart",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error in addToCartController:", err);
    return res.status(500).json({
      message:
        err?.message ||
        "An error occurred while adding the product to the cart",
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
