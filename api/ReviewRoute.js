const express = require("express");
const router = express.Router();

const {
  CreateReviewService,
  DeleteReviewService,
  UpdateReviewService,
} = require("../services/ReviewService");

const {
  CreateReviewValidator,
  DeleteReviewValidator,
  UpdateReviewValidator,
} = require("../utils/validator/ReviewValidator");

const { Allowed, AuthService } = require("../services/AuthService");

router.post(
  "/",
  AuthService,
  Allowed("user"),
  CreateReviewValidator,
  CreateReviewService
);

router
  .route("/:id")
  .put(AuthService, Allowed("user"), UpdateReviewValidator, UpdateReviewService)
  .delete(
    AuthService,
    Allowed("user"),
    DeleteReviewValidator,
    DeleteReviewService
  );

module.exports = router;
