require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse raw body for webhooks
app.use("/webhook", express.raw({ type: "application/json" }));

// Simple GET to verify server is running
app.get("/", (req, res) => {
  res.send("✅ Shopify backend is running!");
});

// TEMP: Disable HMAC check to confirm Shopify hits the endpoint
app.post("/webhook", (req, res) => {
  try {
    const rawBody = req.body.toString("utf8");
    console.log("🟢 Webhook received:");
    console.log("🔸 Raw:", rawBody);
    const json = JSON.parse(rawBody);
    console.log("📦 Parsed JSON:", json);
    res.status(200).send("✅ Received without HMAC check");
  } catch (err) {
    console.error("❌ Error parsing:", err);
    res.status(400).send("Bad Request");
  }
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server listening on 0.0.0.0:${PORT}`);
});
