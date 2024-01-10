const ValidatorMiddleware = require("../../middleware/ValidatorMiddleware");
const { check } = require("express-validator");
const CategoryModule = require("../../module/CategoryModule");

exports.CreateBookValidator = [
  check("title").notEmpty().withMessage("title is required"),

  check("description").notEmpty().withMessage("description is required"),

  check("value")
    .notEmpty()
    .withMessage("value is required")
    .isNumeric()
    .withMessage("value is not valid"),

  check("currency")
    .notEmpty()
    .withMessage("currency is required")
    .custom((value, { req }) => {
      (req.body.price = {
        value: req.body.value,
        currency: value,
      }),
        delete req.body.value;
      delete req.body.currency;

      return true;
    }),

  check("newcategory")
    .notEmpty()
    .withMessage("category is required")
    .custom(async (value, { req }) => {
      const category = await CategoryModule.findOne({ name: value });
      if (!category) throw new Error("Category not found");
      delete req.body.newcategory;
      req.body.category = category._id.toString();
      console.log(req.body);
      return true;
    }),

  check("author").notEmpty().withMessage("author is required"),

  check("publishedAt")
    .notEmpty()
    .withMessage("publishedAt is required")
    .custom((value, { req }) => {
      const regxdate = new RegExp(
        /(18|19|20)\d{2}\-(0[1-9]|1[0,1,2])\-(0[1-9]|[12][0-9]|3[01])/
      );

      const Isvalid = regxdate.test(value);

      if (!Isvalid) throw new Error("date not valid form");

      const date = new Date(value);

      req.body.publishedAt = date;
      return true;
    }),
  ValidatorMiddleware,
];

exports.UpdateBookValidator = [
  check("id")
    .notEmpty()
    .withMessage("Book id is required")
    .isMongoId()
    .withMessage("Book id is not valid")
    .custom(({ req }) => {
      const IsValid =
        req.body.price ||
        req.body.title ||
        req.body.description ||
        req.body.category ||
        req.body.author ||
        req.body.publishedAt;
      if (!IsValid) throw new Error("all parameters are vide");
      return true;
    }),

  check("price").optional().isNumeric().withMessage("price not numeric "),

  check("category")
    .optional()
    .isMongoId()
    .withMessage("category not valid ")
    .custom(async (value) => {
      const category = await CategoryModule.findOne({ _id: value });
      if (!category) throw new Error("Category not found");
      return true;
    }),

  check("publishedAt")
    .optional()
    .custom((value) => {
      // TODO: DATE VALIDATOR
    }),

  ValidatorMiddleware,
];

exports.GetBookValidator = [
  check("id")
    .notEmpty()
    .withMessage("Book id is required")
    .isMongoId()
    .withMessage("Book id is not valid"),
  ValidatorMiddleware,
];

exports.DeleteBookValidator = [
  check("id")
    .notEmpty()
    .withMessage("Book id is required")
    .isMongoId()
    .withMessage("Book id is not valid"),
  ValidatorMiddleware,
];
