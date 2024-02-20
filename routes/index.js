var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only' });
});

// Placeholder sign-up form
router.get('/sign-up', function(req, res, next) {
  res.render('sign-up', { title: 'Sign-up' });
});

// TODO: create new user
router.post('/sign-up', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
