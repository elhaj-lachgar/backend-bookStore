const express = require("express");
const router = express.Router();

const { Allowed, AuthService } = require("../services/AuthService");

const {
  CreateAddressValidator,
  DeleteAddressValidator,
} = require("../utils/validator/AddresseValidator");

const {
  CreateAddressService,
  DeleteAddressService,
  GetUserAddressService,
} = require("../services/AddressService");

router
  .route("/")
  .get(AuthService, Allowed("user"), GetUserAddressService)
  .post(AuthService, Allowed("user"),CreateAddressValidator, CreateAddressService);

router.delete(
  "/:id",
  AuthService,
  Allowed("user"),
  DeleteAddressValidator,
  DeleteAddressService
);

module.exports = router;
