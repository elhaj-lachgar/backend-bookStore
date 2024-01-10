const express = require("express");
const router = express.Router();

const {
  CheckoutService,
  CreateLineItems,
} = require("../services/PayementService");

const { AuthService, Allowed } = require("../services/AuthService");
const { CheckoutValidator } = require("../utils/validator/PaymentValidator");

router.post(
  "/",
  AuthService,
  Allowed("user"),
  CheckoutValidator,
  CreateLineItems,
  CheckoutService
);

module.exports = router;
