const mongoose = require('./db');
const trip = require('./travlr');
const fs = require('fs');

//read data from json file
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

//delete existant records, then insert seed data
const seedDB = async () => {
    await trip.deleteMany({});
    await trip.insertMany(trips);
};

// close the mongoDB connection and exit
seedDB().then(async () => {
    await mongoose.connection.close();
    process.exit(0);
});