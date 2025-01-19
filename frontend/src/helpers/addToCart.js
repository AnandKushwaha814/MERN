import SummaryApi from "../common";
import { toast } from "react-toastify";

const addToCart = async (e, productId) => {
  try {
    // Prevent default event behavior
    e?.stopPropagation();
    e?.preventDefault();

    // Validate productId
    if (!productId) {
      toast.error("Product ID is missing");
      return { success: false, error: true, message: "Product ID is required" };
    }

    // Make API request
    const response = await fetch(SummaryApi.addToCartProduct.url, {
      method: SummaryApi.addToCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    const responseData = await response.json();

    // Display toast based on the response
    responseData.success
      ? toast.success(responseData.message)
      : toast.error(responseData.message);

    return responseData;
  } catch (error) {
    console.error("Error in addToCart:", error);
    toast.error("An error occurred while adding the product to the cart");
    return {
      success: false,
      error: true,
      message: "An unexpected error occurred",
    };
  }
};

export default addToCart;
