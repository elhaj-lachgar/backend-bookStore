const ValidatorMiddleware = require('../../middleware/ValidatorMiddleware');
const { check } = require('express-validator');
const CategoryModule = require("../../module/CategoryModule");



exports.CreateCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage('name is required ')
    .custom(async (value ) => {
        const category = await CategoryModule.findOne({ name: value });
        if (category) throw new Error("Category name is already in use");
        return true;
    }),
    ValidatorMiddleware
]


exports.UpdateCategoryValidator = [

    check('id')
    .notEmpty()
    .withMessage('Category id is required') 
    .isMongoId()
    .withMessage('Category id is  not valid'),

    check('name')
    .optional()
    .custom(async (value ) => {
        const category = await CategoryModule.findOne({ name: value });
        if (category) throw new Error("Category name is already in use");
        return true;
    }),
    ValidatorMiddleware
]


exports.DeleteCategoryValidator = [
    check('id')
    .notEmpty()
    .withMessage('Category id is required') 
    .isMongoId()
    .withMessage('Category id is  not valid'),
    ValidatorMiddleware
]


exports.GetBook = [
    check('id')
    .notEmpty()
    .withMessage('Category id is required') 
    .isMongoId()
    .withMessage('Category id is  not valid'),
    ValidatorMiddleware
]