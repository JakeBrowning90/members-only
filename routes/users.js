var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

router.get('/sign-up', user_controller.sign_up_get);

router.post('/sign-up', user_controller.sign_up_post);

// TODO: log-in form
router.get('/log-in', user_controller.log_in_get);

// TODO: post log-in
router.post('/log-in', user_controller.log_in_post);

router.get('/log-out', user_controller.log_out_get);

router.get('/confirm', user_controller.confirm_get);

router.post('/confirm', user_controller.confirm_post);

router.get('/admin', user_controller.admin_get);

router.post('/admin', user_controller.admin_post);


module.exports = router;
