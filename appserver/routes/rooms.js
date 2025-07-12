var express = require('express');
var router = express.Router();
const controller = require('../Controller/rooms')

/* GET rooms page. */
router.get('/', controller.index)

module.exports = router;
