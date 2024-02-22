const User = require('../models/user');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.sign_up_get = asyncHandler(async(req, res, next) => {
    res.render('sign-up', { title: 'Sign-up' });
});

exports.sign_up_post = [
    body("first_name")
        .trim(),
    body("last_name")
        .trim(),
    body("email")
        .trim(),
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
            res.render('sign-up', {
                title: 'Sign-up' ,
                errors: errors.array(),
            });
            return;
        } else {
            await user.save();
            //Placeholder console log
            console.log('New user saved')
            res.redirect('/');
        }
    })
];