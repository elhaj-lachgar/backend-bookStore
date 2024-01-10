const express = require("express");
const router = express.Router();

const {
  CreateCategoryValidator,
  DeleteCategoryValidator,
  GetBook,
  UpdateCategoryValidator,
} = require("../utils/validator/CategoryValidator");

const { AuthService, Allowed } = require("../services/AuthService");

const {
  CreateCategoryService,
  DeleteCategoryService,
  GetCategoryService,
  UpdateCategoryService,
  GetCategorysService
} = require("../services/CategoryService");

router
  .route("/")
  .post(
    CreateCategoryValidator,
    CreateCategoryService,
  )
  .get(GetCategorysService)




router
  .route("/:id")
  .get(GetBook, GetCategoryService)
  .put(
    AuthService,
    Allowed("admin"),
    UpdateCategoryValidator,
    UpdateCategoryService
  )
  .delete(
    AuthService,
    Allowed("admin"),
    DeleteCategoryValidator,
    DeleteCategoryService
  );



module.exports = router ;