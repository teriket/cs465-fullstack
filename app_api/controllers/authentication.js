const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

const register = async(req, res) => {
    //make sure all parameters are in the message
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
        .status(400)
        .json({"message" : "All fields are required."});
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: '' //start with an empty password.  It will be populated with a salted hash
    });
    user.setPassword(req.body.password);
    const q = await user.save();

    if (!q){
        return res
        .status(400)
        .json({message: ""});
    } else {
        //return new user token
        const token = user.generateJWT();
        return res
            .status(200)
            .json(token);
    }
};

const login = (req, res) => {
    //validate message to ensure that email and password are present
    if(!req.body.email || !req.body.password){
        return res
            .status(400)
            .json({message : "All fields required"});
    }

    //delegate authentication to passport module
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            //Error in authentication process
            return res
                .status(404)
                .json( err );
        }

        if ( user ) { //Authentication succeeded, generate JWT
            const token = user.generateJWT();
            res
                .status(200)
                .json( {token} );
        } else { //auth failed return error
            res
                .status(401)
                .json(info);
        } 
    }) (req, res);

};

const authenticateJWT = async(req, res) => {}

module.exports = {
    register,
    login,
    authenticateJWT
};