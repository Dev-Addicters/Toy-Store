// DEPENDENCIES
const express = require("express");
const itemReviews = express.Router({ mergeParams: true });
const {
  getAllReviews,
  getReview,
  newReview,
  updateReview,
  deleteReview,
} = require("../queries/itemReviews");

// ROUTES

/* INDEX */
itemReviews.get("/", async (req, res) => {
  const { productId } = req.params;
  try {
    const allReviews = await getAllReviews(productId);
    console.log(`controller function call: ${allReviews}`);
    res.status(200).json(allReviews);
  } catch (err) {
    res.status(404).statusMessage(err);
  }
});

/* SHOW */
itemReviews.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const review = await getReview(id);
    res.status(200).json(review);
  } catch (err) {
    res.status(404).statusMessage(err);
  }
});

/* CREATE */
itemReviews.post("/", async (req, res) => {
  try {
    const review = await newReview(req.body);
    res.status(200).json(review);
  } catch (err) {
    res.status(404).statusMessage(err);
  }
});

/* UPDATE */
itemReviews.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await updateReview(id, req.body);
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(404).statusMessage(err);
  }
});

/* DELETE */
itemReviews.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await deleteReview(id);
    res.status(200).json(deletedReview);
  } catch (err) {
    res.status(404).statusMessage(err);
  }
});

// EXPORTS
module.exports = itemReviews;
