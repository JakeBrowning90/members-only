const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');

/* GET home page. */
router.get('/', index_controller.index_get);

module.exports = router;
