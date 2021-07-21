const products = require("express").Router();
const {
  getAllProducts,
  getProducts,
  createProducts,
  updateProducts,
  deleteProducts,
} = require("../queries/products");
const itemReviewsController = require("./itemReviewsController");

const msgNotFound = (itemId) => `id ${itemId} was not found in database.`;
const catchError = (value) => value === "error";

const dataVerification = (req, res, next) => {
  next();
};

products.use("/:productId/itemReviews", itemReviewsController);

products.get("/", async (req, res) => {
  const allItems = await getAllProducts(req.query);
  res.json(allItems);
});

products.get("/:ids", async (req, res) => {
  const { ids } = req.params;
  try {
    if (!ids.includes(",")) {
      const item = await getProducts(ids);
      if (!item.name) {
        console.log(msgNotFound(ids));
        throw msgNotFound(ids);
      }
      return res.json([item]);
    }

    const items = await getProducts(ids);
    res.json(items);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

products.post("/", dataVerification, async (req, res) => {
  try {
    const newItems = await createProducts(req.body);
    if (catchError(newItems)) {
      console.log(`Error adding ${req.body} to database.`);
      throw `Error adding ${req.body} to database.`;
    }
    res.json(newItems.length ? newItems : [newItems]);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

products.put("/:ids", dataVerification, async (req, res) => {
  const { ids } = req.params;
  try {
    const updatedItems = await updateProducts(ids, req.body);
    if (catchError(updatedItems)) {
      console.log(msgNotFound(ids));
      throw msgNotFound(ids);
    }
    res.json(updatedItems.length ? updatedItems : [updatedItems]);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

products.delete("/:ids", async (req, res) => {
  const { ids } = req.params;
  try {
    const deletedItems = await deleteProducts(ids);
    if (catchError(deletedItems)) {
      console.log(msgNotFound(ids));
      throw msgNotFound(ids);
    }
    res.json(deletedItems.length ? deletedItems : [deletedItems]);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});

module.exports = products;
