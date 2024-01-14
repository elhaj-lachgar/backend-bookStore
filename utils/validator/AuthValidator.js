const ValidatorMiddleware = require('../../middleware/ValidatorMiddleware');
const { check } = require('express-validator');
const UserModule = require ('../../module/UserModule')


exports.SignedInValidator = [
    check('email')
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("not a valid email address"),

    check('password')
    .notEmpty()
    .withMessage("password is required")
    .isLength({min : 8 })
    .withMessage("password is shorter")
    .isLength({max : 16})
    .withMessage("password is longer than 16 characters"),

    ValidatorMiddleware
]


exports.SignedUpValidator = [
    check('email')
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("not a valid email address")
    .custom(async (value) =>  {
        const user = await UserModule.findOne({ email : value });
        console.log(user);
        if(user) throw new Error(`User ${value} is already exists`);
        return true;
    }),

    check('password')
    .notEmpty()
    .withMessage("password is required")
    .isLength({min : 8 })
    .withMessage("password is shorter")
    .isLength({max : 16})
    .withMessage("password is longer than 16 characters"),

    check('confirmPassword')
    .notEmpty()
    .withMessage("confirm password is required")
    .isLength({min : 8 })
    .withMessage("confirm password is shorter")
    .isLength({max : 16})
    .custom ((value , {req}) => {
        const IsValid = value  === req.body.password ;
        if (!IsValid) 
            throw new Error("confirm password is not valid");
        return true ;
    }),

    
    ValidatorMiddleware
]


exports.UpdateUserValidator =  [
    check('email')
    .optional()
    .isEmail()
    .withMessage("not a valid email address"),
    ValidatorMiddleware
]


exports.ChangePasswordValidator = [
    check('currentpassword')
    .notEmpty()
    .withMessage("currentpassword is required "),

    check('newpassword')
    .notEmpty()
    .withMessage('newpassword is required')
    .custom((val,{req})=>{
        const IsValid = val == req.body.newpassword;
        if(!IsValid) throw new Error("password is not mashable");
        return true;
    }),


    check('confirmpassword')
    .notEmpty()
    .withMessage('confirmpassword is required'),

    ValidatorMiddleware
]


exports.UpdateRoleOfUserValidator = [
    check('id')
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("id not valid"),

    check("role")
    .notEmpty()
    .withMessage("role is required")
    .custom(value=>{
        const v = ["user" , "admin"].includes(value);
        if(!v) throw new Error("role not supported");
        return true;
    })
]