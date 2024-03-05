var express = require('express');
var router = express.Router();

const message_controller = require('../controllers/messageController');

// Get new message form 
router.get('/new-message', message_controller.message_form_get);

// Post new message
router.post('/new-message', message_controller.message_form_post);

// Get delete message form
router.get('/:id/delete', message_controller.message_delete_get);

// Post delete message form
router.post('/:id/delete', message_controller.message_delete_post);

module.exports = router;