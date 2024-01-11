const ValidatorMiddleware = require("../../middleware/ValidatorMiddleware");
const { check } = require("express-validator");

exports.DeleteOrderValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("id not valid"),
  ValidatorMiddleware,
];

exports.UpdateStatusOfDelaiverdValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("id not valid"),

  check("delaivred_date")
    .notEmpty()
    .withMessage("delaivred_date is required")
    .custom((value , {req}) => {
      const regxdate = new RegExp(
        /(18|19|20)\d{2}\-(0[1-9]|1[0,1,2])\-(0[1-9]|[12][0-9]|3[01])/
      );

      const Isvalid = regxdate.test(value);

      if (!Isvalid) throw new Error("date not valid form");
      const date = new Date(value);
      req.body.date = date;
      return true;
    }),

  ValidatorMiddleware,
];
