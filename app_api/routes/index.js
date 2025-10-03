const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); //Enable JSON Web Tokens

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

//Registration endpoint
router
    .route("/register")
    .post(authController.register);

//Login Endpoint
router
    .route("/login")
    .post(authController.login);

// define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripList)
    .post(authenticateJWT, tripsController.tripsAddTrip);

// GET individual trip data by requried parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip);

// Increment views on a trip
router
    .route('/trips/:tripCode/views')
    .put(tripsController.tripsAddOneView);

// Make sure clients have a valid web token
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    if(authHeader == null){ //Auth header not present
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length < 1){ //not enough tokens in header
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    if(token == null){ //null bearer token
        return res.sendStatus(401);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err){
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified;  //set the auth to the decoded object
    });
    next();  // We need to continue or this will hang forever
}

module.exports = router;