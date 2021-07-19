// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();
const productsController = require("./controllers/productsController");

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to toy-store API!");
});

app.use("/products", productsController);

app.get("*", (req, res) => {
  res.status(404).send("Page not found.");
})

// EXPORT
module.exports = app;
