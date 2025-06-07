require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Basic health check
app.get("/", (req, res) => {
  res.send("✅ Shopify backend is running!");
});

// Sample webhook receiver (for Shopify order creation webhook)
app.post("/webhook/order-created", (req, res) => {
  console.log("📦 Order created webhook received:", req.body);
  res.status(200).send("Webhook received");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
