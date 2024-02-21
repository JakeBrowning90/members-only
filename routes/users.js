var express = require('express');
var router = express.Router();

// Placeholder sign-up form
router.get('/sign-up', function(req, res, next) {
  res.render('sign-up', { title: 'Sign-up' });
});

// TODO: create new user
router.post('/sign-up', function(req, res, next) {
  res.redirect('/');
});

// TODO: log-in form
router.get('/log-in', function(req, res, next) {
  res.redirect('/');
});

// TODO: post log-in
router.post('/log-in', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
