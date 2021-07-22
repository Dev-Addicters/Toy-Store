const products = require("express").Router();
const {
  getAllProducts,
  getProducts,
  createProducts,
  updateProducts,
  deleteProducts,
} = require("../queries/products");
const { postCheck, putCheck } = require("../helpers/verifyData");
const itemReviewsController = require("./itemReviewsController");

const msgInvalidQuery = () => "Invalid data caused database to return an error.";
const catchError = (value) => value === "error";

products.use("/:productId/itemReviews", itemReviewsController);

products.get("/", async (req, res) => {
  const allItems = await getAllProducts(req.query);
  res.json(allItems);
});

products.get("/:ids", async (req, res) => {
  const { ids } = req.params;
  try {
    const items = await getProducts(ids);
    if (catchError(items))
      throw msgInvalidQuery();

    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

products.post("/", postCheck, async (req, res) => {
  try {
    const newItems = await createProducts(req.body);
    if (catchError(newItems))
      throw msgInvalidQuery();

    res.json(newItems);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

products.put("/:ids", putCheck, async (req, res) => {
  const { ids } = req.params;
  try {
    const updatedItems = await updateProducts(ids, req.body);
    if (catchError(updatedItems))
      throw msgInvalidQuery();

    res.json(updatedItems);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

products.delete("/:ids", async (req, res) => {
  const { ids } = req.params;
  try {
    const deletedItems = await deleteProducts(ids);
    if (catchError(deletedItems))
      throw msgInvalidQuery();

    res.json(deletedItems);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = products;
