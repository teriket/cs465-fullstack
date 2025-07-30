const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

const tripList = async(req, res) => {
    const data = await Model
        .find({})
        .exec();

    if(!data){
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(data);
    }
};

const tripsFindByCode = async(req, res) => {
    const data = await Model
        .find({'code' : req.params.tripCode })
        .exec();

    if(!data){
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(data);
    }
};

module.exports = {
    tripList,
    tripsFindByCode
};