const express = require("express");
const router = express.Router();

const {
  CreateCard,
  AddElementToCard,
  IncrementAndDecrementValidator,
  DeleteElementFromCardValidator
} = require("../utils/validator/CardValidator");
const {
  CreateCardService,
  AddElementToCardService,
  ClearCardService,
  DeleteElmentFromCardService,
  UpdateCardService,
  IncrementQuantity,
  DecrementQuantity,
} = require("../services/CardService");
const { AuthService, Allowed } = require("../services/AuthService");

router.post("/", AuthService, Allowed("user"), CreateCard, CreateCardService);
router
  .route("/:id")
  .post(
    AuthService,
    Allowed("user"),
    AddElementToCard,
    AddElementToCardService
  )
  .delete(
    AuthService,
    Allowed("user"),
    DeleteElementFromCardValidator,
    DeleteElmentFromCardService
  );
router.put(
  "/increment/:id",
  AuthService,
  Allowed("user"),
  IncrementAndDecrementValidator,
  IncrementQuantity
);

router.put(
  "/decrement/:id",
  AuthService,
  Allowed("user"),
  IncrementAndDecrementValidator,
  DecrementQuantity
);


module.exports = router;
