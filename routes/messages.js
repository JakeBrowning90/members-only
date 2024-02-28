var express = require('express');
var router = express.Router();

const message_controller = require('../controllers/messageController');

// TODO: get new message form (or make popup on home?)
router.get('/new-message', message_controller.message_form_get);

// TODO: post new message
router.post('/new-message', message_controller.message_form_post);

// TODO: get delete messate form
router.get('/delete', message_controller.message_delete_get);

// TODO: post delete message form
router.post('/delete', message_controller.message_delete_post);

module.exports = router;