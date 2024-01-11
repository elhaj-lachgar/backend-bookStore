const express = require("express");
const router = express.Router();

const {
  CheckoutService,
  CreateLineItems,
  webHookService
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


router
  .post("/checkout-webhoks" ,express.raw({type : "application/json"}),webHookService);

module.exports = router;
