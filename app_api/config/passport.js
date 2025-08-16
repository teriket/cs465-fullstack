const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Users = require('../models/user');
const User = mongoose.model('users');

passport.use(
    new localStrategy({
        usernameField: "email"
    },
    async (username, password, done) => {
        const q = await User.findOne({email: username}).exec();
        //incorrect username or password
        if (!q || !q.validPassword(password)) {
            return done(null, false, {message: "Incorrect username or password."});
        }
        return done(null, q);
    }
)
);