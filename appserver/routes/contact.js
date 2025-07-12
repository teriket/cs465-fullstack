var express = require('express');
var router = express.Router();
const controller = require('../Controller/contact')

/* GET contact page. */
router.get('/', controller.index)

module.exports = router;
