const express = require("express");

const router = express.Router();

const { AuthService, Allowed, Clouding } = require("../services/AuthService");

const { UploadeHandler, upload } = require("../utils/multer");

const {
  CreateBookService,
  DeleteBookService,
  GetBookService,
  UpdateBookService,
  GetBooksService,
  GetAdminService
} = require("../services/BookService");

const {
  CreateBookValidator,
  DeleteBookValidator,
  GetBookValidator,
  UpdateBookValidator,
} = require("../utils/validator/BookValidator");

router.post(
  "/",
  AuthService,
  Allowed("admin"),
  upload.single("image"),
  UploadeHandler("image"),
  Clouding("image"),
  CreateBookValidator,
  CreateBookService
);

router.get("/", GetBooksService);

router
  .route("/:id")
  .delete(AuthService, Allowed("admin"), DeleteBookValidator, DeleteBookService)
  .get(GetBookValidator, GetBookService)
  .put(
    AuthService,
    Allowed("admin"),
    upload.single("image"),
    UploadeHandler("image"),
    Clouding("image"),
    UpdateBookValidator,
    UpdateBookService
  );

router.get("/admin/get-books" , AuthService , Allowed("admin"),GetAdminService);

module.exports = router;
