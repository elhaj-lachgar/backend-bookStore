const { check } = require('express-validator');
const ValidatorMiddleware = require('../../middleware/ValidatorMiddleware');

exports.CheckoutValidator = [
    check('card')
    .notEmpty()
    .withMessage("card is required")
    .isMongoId()
    .withMessage("card id n not valid"),

    check("address")
    .notEmpty()
    .withMessage("address is required")
    .isMongoId()
    .withMessage("address id n not valid"),
    ValidatorMiddleware
]