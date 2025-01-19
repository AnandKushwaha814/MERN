const addToCartModel = require("../../models/cartProduct");

const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req?.userId;

        // Validate currentUser
        if (!currentUser) {
            return res.status(401).json({
                message: "User is not authenticated",
                success: false,
                error: true,
            });
        }

        // Fetch all products for the current user
        const allProducts = await addToCartModel
            .find({ userId: currentUser })
            .populate("productId");

        return res.status(200).json({
            data: allProducts,
            message: "Products fetched successfully",
            success: true,
            error: false,
        });
    } catch (err) {
        console.error("Error in addToCartViewProduct:", err);
        return res.status(500).json({
            message: err?.message || "An error occurred while fetching cart products",
            error: true,
            success: false,
        });
    }
};

module.exports = addToCartViewProduct;
