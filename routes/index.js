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

module.exports = router;
