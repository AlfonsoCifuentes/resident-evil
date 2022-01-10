const express = require("express");
const router = express.Router();
const locationSchema = require("../models/locations.model");
const authorize = require("../utils/middlewares/auth.middleware");
const gameSchema = require ("../models/games.model")
let gamesId;

// Get All locations
router.route('/locations').get(authorize, (req, res, next) => {
    locationSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single location
router.route('/locations/:id').get(authorize, (req, res, next) => {
    locationSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Get All games of a location
router.route('/locations/:id/games').get(/* authorize, */(req, res, next) => {
    const locationId = req.params.id;

locationSchema.findById(locationId).populate("games")
        .then((location) => {
            gamesId = location.games;
        })
        
        .then(async () => {
            const games = await gameSchema.find({ _id: gamesId.map(i => i) })
            return res.json(games);
        })
        
        .catch((error) => {
            const errorHappened = new Error();
            return next(errorHappened.message);
        })
})


module.exports = router;