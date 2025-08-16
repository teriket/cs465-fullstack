const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});


// method to set a users password
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha512').toString('hex');
};

/**
 * validate a password is correct
*/
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

//method to generate a JSON web token for the current record
userSchema.methods.generateJWT = function() {
    return jwt.sign({
        //payload for this JWT
        _id: this._id,
        email: this.email,
        name: this.name
    },
    process.env.JWT_SECRET, //the key to encrypt the token
    { expiresIn: '1h'} //expires 1 hour after creation
);
}

const User = mongoose.model('users', userSchema);
module.exports = User;