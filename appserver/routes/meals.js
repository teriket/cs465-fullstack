var express = require('express');
var router = express.Router();
const controller = require('../Controller/meals')

/* GET meals page. */
router.get('/', controller.index)

module.exports = router;
