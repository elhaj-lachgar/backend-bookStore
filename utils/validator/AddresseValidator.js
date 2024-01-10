const ValidatorMiddleware = require("../../middleware/ValidatorMiddleware");
const { check } = require("express-validator");

exports.CreateAddressValidator = [
  check("codePostal")
    .notEmpty()
    .withMessage("code postal is required"),

  check("country").notEmpty().withMessage("contry is required"),

  check("streat").notEmpty().withMessage("streat is required"),

  check("city").notEmpty().withMessage("city is required"),

  ValidatorMiddleware,
];


exports.DeleteAddressValidator = [
    check('id')
    .notEmpty().withMessage("id is required")
    .isMongoId().withMessage("id is not valid"),
    ValidatorMiddleware
]