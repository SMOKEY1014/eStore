import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import crypto from "crypto";

//global variables
const currency = "zar";
const deliveryCharge = 150;

// Gateway initialized
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing Orders using COD(Cash On Delivery)
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      //status: "Order Placed",
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing Orders using Stripe
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      // status: "Order Placed",
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing Orders using RazorPay
const placeOrderRazorpay = async (req, res) => {};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

// Place order using Payfast
const placeOrderPayfast = async (req, res) => {
  const { userId, items, amount, address } = req.body;

  try {
    const data = {
      // merchant_id: 16456367,
      merchant_id: process.env.PAYFAST_MERCHANT_ID,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY,
      // return_url: "https://github.com/SMOKEY1014/eStore",
      // cancel_url: "https://github.com/SMOKEY1014/eStore",
      // notify_url: "https://github.com/SMOKEY1014/eStore",
      amount: amount, // PayFast accepts amounts in cents
      item_name: "Order payment",
      custom_str1: userId,
    };

    const pfParamString = Object.keys(data)
      .map(
        (key) => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`
      )
      .join("&");

    // Generate signature (if you want to handle it manually, else rely on PayFast sandbox for testing)
    const signature = crypto
      .createHash("md5")
      .update(pfParamString + "&passphrase=" + process.env.PAYFAST_PASSPHRASE)
      .digest("hex");

    data.signature = signature;

    // Create a URL with all the parameters
    const paymentUrl = `https://payfast.co.za/eng/process?${new URLSearchParams(
      data
    ).toString()}`;

    // Send the payment URL back to the frontend
    res.json({ success: true, paymentUrl });
  } catch (error) {
    console.error("Error initiating payment:", error);
    res
      .status(500)
      .json({ success: false, message: "Payment initiation failed" });
  }
};

// All Orders data for User for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

// Update Order Status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  placeOrderPayfast,
};
