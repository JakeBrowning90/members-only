var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

// Placeholder sign-up form
// router.get('/sign-up', function(req, res, next) {
//   res.render('sign-up', { title: 'Sign-up' });
// });

router.get('/sign-up', user_controller.sign_up_get);

// TODO: create new user
// router.post('/sign-up', function(req, res, next) {
//   res.redirect('/');
// });

router.post('/sign-up', user_controller.sign_up_post);

// TODO: log-in form
router.get('/log-in', function(req, res, next) {
  res.redirect('/');
});

// TODO: post log-in
router.post('/log-in', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
