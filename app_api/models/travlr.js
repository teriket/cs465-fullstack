const mongoose = require('mongoose');

// trip schema
const tripSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
        index: true },
    name: {
        type: String,
        required: true,
        index: true },
    length: {
        type: String,
        required: true },
    start: {
        type: Date,
        required: true },
    resort: {
        type: String,
        required: true },
    perPerson: {
        type: String,
        required: true },
    image: {
        type: String,
        required: true },
    description: {
        type: String,
        required: true },
    views : { // Enhancement 3, updated the schema to reflect the data collection of user views
        type: Number,
        required : true,
        default : 0
    }
});

const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;