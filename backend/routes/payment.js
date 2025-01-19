const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_9oF5dJnJf9nko6", // Replace with your Razorpay Key ID
  key_secret: "gbkRtsAq86UgU4L5PJUnr4QJ", // Replace with your Razorpay Key Secret
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body; // Amount in paise (100 times the actual amount)

    // Razorpay order creation options
    const options = {
      amount: amount, // Amount in paise
      currency: "INR",
      receipt: "receipt_order_123",
    };

    const order = await razorpayInstance.orders.create(options);

    // Send the order details back to the frontend
    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
