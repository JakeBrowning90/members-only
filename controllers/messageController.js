const Message = require('../models/message');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.message_form_get = asyncHandler(async(req, res, next) => {
    res.render('message-form', { title: 'Write New Message' });
});

// TODO: Add validation/sanitisation to messages
exports.message_form_post = [
    body('title')
        .trim(),
    body('body')
        .trim(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const message = new Message({
            title: req.body.title,
            body: req.body.body,
            timestamp: Date.now(),
            user: req.user._id
        });

        if (!errors.isEmpty()) {
            res.render('message-form', {
                title: 'Write New Message' ,
                message: message,
                errors: errors.array(),
            });
            return;
        } else {
            await message.save();
            res.redirect('/');
        }
    })
];

exports.message_delete_get = asyncHandler(async(req, res, next) => {
    res.redirect('/');
});

exports.message_delete_post = asyncHandler(async(req, res, next) => {
    res.redirect('/');
});