require("dotenv").config();
const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: raw body parser for Shopify HMAC validation
app.use("/webhook", express.raw({ type: "application/json" }));

// Home route
app.get("/", (req, res) => {
  res.send("✅ Shopify backend is running!");
});

// Shopify webhook route
app.post("/webhook", (req, res) => {
  const hmacHeader = req.headers["x-shopify-hmac-sha256"];
  const secret = process.env.SHOPIFY_SECRET;

  const generatedHash = crypto
    .createHmac("sha256", secret)
    .update(req.body, "utf8")
    .digest("base64");

  if (generatedHash === hmacHeader) {
    console.log("✅ Shopify webhook verified.");

    try {
      const body = JSON.parse(req.body.toString());
      console.log("📦 Order payload:", body);

      // TODO: Add material deduction or logging here

      res.status(200).send("Webhook processed");
    } catch (err) {
      console.error("❌ Failed to parse webhook JSON:", err);
      res.status(400).send("Bad Request");
    }
  } else {
    console.log("❌ Shopify webhook verification failed.");
    res.status(401).send("Unauthorized");
  }
});

// Start server on 0.0.0.0 (Railway needs this!)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server listening on 0.0.0.0:${PORT}`);
});
