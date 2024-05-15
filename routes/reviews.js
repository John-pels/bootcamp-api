const Review = require("../models/Review");
const express = require("express");
const { getReviews, getReview, addReview } = require("../controllers/reviews");

const reviewsRouter = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

reviewsRouter
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description location.state location.city",
    }),
    getReviews
  )
  .post(protect, authorize("user", "admin"), addReview);

reviewsRouter.route("/:id").get(getReview);

module.exports = reviewsRouter;
