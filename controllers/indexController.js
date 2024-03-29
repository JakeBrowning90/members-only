const Message = require('../models/message');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Get all messages to display on homepage in reverse-chronological order
exports.index_get = asyncHandler(async(req, res, next) => {
    const allMessages = await Message.find()
        .sort({ timestamp: -1 })
        .populate("user")
        .exec();

    res.render('index', { 
        title: 'Members Only',
        messages: allMessages, 
    });
});