// DEPENDENCIES
const db = require("../db/dbConfig.js");

// QUERIES

/* INDEX */
const getAllReviews = async (product_id) => {
  try {
    const allReviews = await db.any(
      "SELECT * FROM item_reviews WHERE product_id = $1",
      product_id,
    );
    return allReviews;
  } catch (err) {
    return "error";
  }
};

/* SHOW */
const getReview = async (id) => {
  try {
    const oneReview = await db.one(
      "SELECT * FROM item_reviews WHERE id=$1",
      id,
    );
    return oneReview;
  } catch (err) {
    return "error";
  }
};

// CREATE
const newReview = async (review) => {
  try {
    const newReview = await db.one(
      `
      INSERT INTO item_reviews
      (reviewer, title, content, rating, product_id)
      VALUES
      ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        review.reviewer,
        review.title,
        review.content,
        review.rating,
        review.product_id,
      ],
    );
    return newReview;
  } catch (err) {
    return "error";
  }
};

/* UPDATE */
const updateReview = async (id, review) => {
  try {
    const updatedReview = await db.one(
      `
      UPDATE item_reviews
      SET reviewer=$1, title=$2, content=$3, rating=$4, product_id=$5
      WHERE id=$6
      RETURNING *
      `,
      [
        review.reviewer,
        review.title,
        review.content,
        review.rating,
        review.product_id,
        id,
      ],
    );
    return updatedReview;
  } catch (err) {
    return "error";
  }
};

/* DELETE */
const deleteReview = async (id) => {
  try {
    const deletedReview = await db.one(
      `
      DELETE FROM item_reviews
      WHERE id=$1
      RETURNING *
      `,
      id,
    );
    return deletedReview;
  } catch (err) {
    return "error";
  }
};

// EXPORTS
module.exports = {
  getAllReviews,
  getReview,
  newReview,
  updateReview,
  deleteReview,
};
