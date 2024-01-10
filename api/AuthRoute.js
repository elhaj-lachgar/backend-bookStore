const express = require("express");
const router = express.Router();

const {
  SignedInValidator,
  SignedUpValidator,
  UpdateUserValidator,
  ChangePasswordValidator
} = require("../utils/validator/AuthValidator");

const { UploadeHandler, upload } = require("../utils/multer");

const {
  SignedInService,
  SignedUpService,
  UpdateUserProfile,
  Clouding,
  AuthService,
  Allowed,
  ChangePasswordOfUser,
  GetUsersService
} = require("../services/AuthService");

router.post("/sign-in", SignedInValidator, SignedInService);
router.post(
  "/sign-up",
  upload.single("image"),
  UploadeHandler("profile"),
  Clouding("profile"),
  SignedUpValidator,
  SignedUpService
);
router.put(
  "/update-user",
  upload.single("image"),
  UploadeHandler("profile"),
  Clouding("profile"),
  UpdateUserValidator,
  UpdateUserProfile
);

router.put(
  "/change-password",
  AuthService,
  Allowed("user"),
  ChangePasswordValidator,
  ChangePasswordOfUser
)

router.get("/all-users/admin" , AuthService, Allowed("admin"),GetUsersService)

module.exports = router;
