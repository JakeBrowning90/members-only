const Message = require('../models/message');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Get form for writing a new message
exports.message_form_get = asyncHandler(async(req, res, next) => {
    if (req.user ) {
        res.render('message-form', { title: 'Write New Message' });
    } else
        res.redirect('/');
});

// TODO: Add validation/sanitisation to messages
// Post new message
exports.message_form_post = [
    body('title')
        .trim()
        .isLength({ min: 1 })
        .withMessage("Title required.")
        .isLength({ max: 100 })
        .withMessage("Title must contain 100 or fewer characters."),
    body('body')
        .trim()
        .isLength({ min: 1 })
        .withMessage("Body required.")
        .isLength({ max: 1000 })
        .withMessage("Body must contain 1000 or fewer characters."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const message = new Message({
            title: req.body.title,
            body: req.body.body,
            timestamp: Date.now(),
            user: req.user._id
        });

        if (!errors.isEmpty()) {
            // Re-render page, display error messages and populate fields
            res.render('message-form', {
                title: 'Write New Message' ,
                message: message,
                errors: errors.array(),
            });
            return;
        } else {
            // Add new message to database and redirect to home
            await message.save();
            res.redirect('/');
        }
    })
];

// Get confirmation screen for deleting a message
exports.message_delete_get = asyncHandler(async(req, res, next) => {
    // Get message from database
    const message = await Message.findById(req.params.id)
    .populate("user")
    .exec();

    // Redirect home if message doesn't exist
    if (message === null) {
        res.redirect("/");
    }
    // Only render deletion form for admin or the post's author
    if (req.user && (req.user.is_admin || (req.user._id.equals(message.user._id)))) {
        res.render('message-delete', {
            title: 'Delete Post',
            message: message,
        });
    } else {
        res.redirect('/')
    }
});

// Delete message and redirect to home
exports.message_delete_post = asyncHandler(async(req, res, next) => {
    await Message.findByIdAndDelete(req.params.id);
    res.redirect('/');
});