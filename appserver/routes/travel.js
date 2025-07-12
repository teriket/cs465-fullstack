const express = require('express')
const router = express.Router()
const controller = require('../Controller/travel')

/* GET travel page */
router.get('/', controller.index);

module.exports = router;