const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripList)
    .post(tripsController.tripsAddTrip);

// GET individual trip data by requried parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;