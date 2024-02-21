var express = require('express');
var router = express.Router();

// TODO: get new message form (or make popup on home?)
router.get('/new', function(req, res, next) {
  res.render('sign-up', { title: 'Sign-up' });
});

// TODO: post new message
router.post('/new', function(req, res, next) {
  res.redirect('/');
});

// TODO: get delete messate form
router.get('/delete', function(req, res, next) {
  res.redirect('/');
});

// TODO: post delete message form
router.post('/delete', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;