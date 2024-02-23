const User = require('../models/user');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.sign_up_get = asyncHandler(async(req, res, next) => {
    res.render('sign-up', { title: 'Sign-up' });
});

//TODO: params for fields, check for email in use, confirm password match, sanitize inputs
exports.sign_up_post = [
    body("first_name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("First name required")
        .isLength({ max: 20 })
        .withMessage("First name must not exceed 20 characters"),
    body("last_name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Last name required")
        .isLength({ max: 20 })
        .withMessage("Last name must not exceed 20 characters"),
    body("email")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Email required")
        .isEmail()
        .withMessage("Invalid email address")
        .isLength({ max: 30 })
        .withMessage("Email must not exceed 30 characters")
        .custom(async value =>{
            const existinguser = await User.findOne({ email: value });
            if (existinguser) {
                throw new Error('Email already in use.')
            }
        }),
    body("password")
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be between 8 and 20 characters."),
    body("confirm_password")
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Typed passwords do not match"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            is_member: false,
            is_admin: false
        });
        if (!errors.isEmpty()) {
            res.render('sign-up', {
                title: 'Sign-up' ,
                errors: errors.array(),
            });
            return;
        } else {
            await user.save();
            res.redirect('/');
        }
    })
];