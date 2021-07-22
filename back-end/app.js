// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const path = require("path");

// CONFIGURATION
const app = express();
const productsController = require("./controllers/productsController");
const itemReviewsController = require("./controllers/itemReviewsController");

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/doc.html"));
});

app.use("/products", productsController);
app.use("/itemReviews", itemReviewsController);

app.get("*", (req, res) => {
  res.status(404).send("Page not found.");
});

// EXPORT
module.exports = app;
