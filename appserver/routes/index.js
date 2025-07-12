var express = require('express');
var router = express.Router();
const ctrlMain = require('../Controller/main')

/* GET home page. */
router.get('/', ctrlMain.index)

module.exports = router;
