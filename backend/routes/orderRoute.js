import express from "express";

import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  // verifyPayfast,
  placeOrderPayfast,
  payfastIPN,
  // paymentFailed,
  // paymentSuccess,
  verify,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);
orderRouter.post("/payfast", authUser, placeOrderPayfast);

// User Features
orderRouter.post("/userorders", authUser, userOrders);

// Verify payment
orderRouter.post("/verify", authUser, verifyStripe);
// orderRouter.post("/verifyStripe", authUser, verifyStripe);
// orderRouter.post("/verifyPayfast", authUser, verifyPayfast);
// orderRouter.post("/paymentfailed", paymentFailed);
// orderRouter.post("/paymentsuccess", paymentSuccess);
// orderRouter.post("/verify", authUser, verifyStripe);
orderRouter.post("/payfast/notify", authUser, payfastIPN);

export default orderRouter;
