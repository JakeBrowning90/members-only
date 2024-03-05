var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

router.get('/sign-up', user_controller.sign_up_get);

router.post('/sign-up', user_controller.sign_up_post);

// Get log-in form
router.get('/log-in', user_controller.log_in_get);

// Post log-in form
router.post('/log-in', user_controller.log_in_post);

router.get('/log-out', user_controller.log_out_get);

// Get membership password form
router.get('/confirm', user_controller.confirm_get);

// Post membership password form
router.post('/confirm', user_controller.confirm_post);

// Get admin password form
router.get('/admin', user_controller.admin_get);

// Post admin password form
router.post('/admin', user_controller.admin_post);

module.exports = router;
