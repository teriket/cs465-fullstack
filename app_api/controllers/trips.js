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

const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const data = await newTrip.save();
    if(!data){
        return res
            .status(400)
            .json(error);
    } else {
        return res
            .status(201)
            .json(data)
    }
}

const tripsUpdateTrip = async(req, res) => {

    const data = await Model
        .findOneAndUpdate(
            {'code': req.params.tripCode},
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

        if(!data){
            return res
                .status(400)
                .json({error: "something went wrong"});
        } else {
            return res
                .status(201)
                .json(data);
        }
}

module.exports = {
    tripList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};