const express = require("express");
const router = express.Router();
const characterSchema = require("../models/character.model");
const gamesModel = require("../models/games.model");
const authorize = require("../utils/middlewares/auth.middleware");

///////////
const gameSchema = require ("../models/games.model")
let gamesId;

// Get All characters
router.route('/characters').get(authorize, (req, res, next) => {
    characterSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single character
router.route('/characters/:id').get(authorize, (req, res, next) => {
    characterSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Get All games of a character
router.route('/characters/:id/games').get(/* authorize, */(req, res, next) => {
    const characterId = req.params.id;

characterSchema.findById(characterId).populate("games")
        .then((character) => {
            gamesId = character.games;
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