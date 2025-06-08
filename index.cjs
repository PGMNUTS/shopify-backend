require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: parse raw body ONLY for /webhook route
app.use("/webhook", express.raw({ type: "application/json" }));

// Home route
app.get("/", (req, res) => {
  res.send("✅ Shopify backend is running!");
});

// Webhook route (HMAC skipped for testing)
app.post("/webhook", (req, res) => {
  console.log("🔔 Webhook hit (HMAC disabled)");
  console.log("🧾 Raw Body:", req.body?.toString());

  try {
    const body = JSON.parse(req.body.toString());
    console.log("📦 Parsed payload:", body);
  } catch (err) {
    console.error("❌ JSON parse error:", err);
  }

  res.status(200).send("✅ Webhook received (no HMAC check)");
});

// Start server on Railway-compatible IP
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server listening on 0.0.0.0:${PORT}`);
  console.log(`🔥 LIVE at 0.0.0.0:${PORT} 🔥`);
});
