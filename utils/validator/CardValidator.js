const ValidatorMiddleware = require("../../middleware/ValidatorMiddleware");
const { check } = require("express-validator");
const BookModule = require("../../module/BookModule");

exports.CreateCard = [
  check("data")
    .notEmpty()
    .withMessage(" data is required")
    .isArray()
    .withMessage("not valid form for data")
    .custom(async (value, { req }) => {
      const error = [];
      const promise = value.map(async (element) => {
        let b;
        try {
          b = await BookModule.findOne({ _id: element.id });
        } catch (err) {
          error.push(err.toString());
        }
        return b
          ? {
              book: b._id.toString(),
              price: b.price,
              quantity: element.quantity,
            }
          : null;
      });

      const DemoBooks = await Promise.all(promise);

      if (error.length > 0) throw new Error("book ids not valid");

      req.body.books = DemoBooks;
      return true;
    }),
  ValidatorMiddleware,
];

exports.AddElementToCard = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("id not valid"),
  check("bookId")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("id not valid"),
  ValidatorMiddleware
];


exports.IncrementAndDecrementValidator = [
  check('id')
  .notEmpty()
  .withMessage('id is required')
  .isMongoId()
  .withMessage('id is not valid'),
  ValidatorMiddleware
]

exports.DeleteElementFromCardValidator = [
  check('id')
  .notEmpty()
  .withMessage('id is required')
  .isMongoId()
  .withMessage('id is not valid'),
  check("bookId")
  .notEmpty()
  .withMessage("id is required")
  .isMongoId()
  .withMessage("id not valid"),
  ValidatorMiddleware
]