const express = require("express");
const router = express.Router();
const gameSchema = require("../models/games.model");
const authorize = require("../utils/middlewares/auth.middleware");
const characterSchema = require ("../models/character.model");
let charactersId;


// Get All Games
router.route('/games').get(authorize, (req, res, next) => {
    gameSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single Game
router.route('/games/:id').get(authorize, (req, res, next) => {
    gameSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Get All characters of a game
router.route('/games/:id/characters').get(/* authorize, */(req, res, next) => {
    const gameId = req.params.id;

    gameSchema.findById(gameId).populate("characters")
        .then((game) => {
            charactersId = game.characters;
        })
        
        .then(async () => {
            const characters = await characterSchema.find({ _id: charactersId.map(i => i) })
            return res.json(characters);
        })
        
        .catch((error) => {
            const errorHappened = new Error();
            return next(errorHappened.message);
        })
})

module.exports = router;