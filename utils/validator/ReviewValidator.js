const ValidatorMiddleware = require("../../middleware/ValidatorMiddleware");
const { check } = require("express-validator");


exports.CreateReviewValidator = [
    check("bookId")
    .notEmpty()
    .withMessage("bookId is required")
    .isMongoId()
    .withMessage("bookId not valid "),

    check("rating")
    .notEmpty()
    .withMessage("rating is required")
    .isNumeric()
    .withMessage("rating must be a number"),

    ValidatorMiddleware
]


exports.UpdateReviewValidator = [
    check('id')
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("id not valid " )
    ,
    check("bookId")
    .optional()
    .isMongoId()
    .withMessage("bookId not valid "),

    check("rating")
    .optional()
    .isNumeric()
    .withMessage("rating must be a number"),

    ValidatorMiddleware
]

exports.DeleteReviewValidator = [
    check('id')
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("id not valid " )
]