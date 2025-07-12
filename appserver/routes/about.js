var express = require('express');
var router = express.Router();
const controller = require('../Controller/about')

/* GET about page. */
router.get('/', controller.index)

module.exports = router;
