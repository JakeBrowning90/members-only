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
        .isLength({ max: 5 })
        .withMessage("First name must not exceed 5 characters"),
    body("last_name")
        .trim(),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Invalid email address"),
    body("password")
        .trim(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
        });
        if (!errors.isEmpty()) {
            console.log(errors.array())
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