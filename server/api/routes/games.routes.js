const express = require("express");
const router = express.Router();
const gameSchema = require("../models/games.model");
const authorize = require("../utils/middlewares/auth.middleware");
const characterSchema = require ("../models/character.model");
const enemySchema = require ("../models/enemies.model")
const locationSchema =  require ("../models/locations.model")
const weaponSchema = require ("../models/weapon.model")
let charactersId;
let enemiesId;
let weaponsId;
let locationsId;


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

// Get All enemies of a game
router.route('/games/:id/enemies').get(/* authorize, */(req, res, next) => {
    const gameId = req.params.id;

    gameSchema.findById(gameId).populate("enemies")
        .then((game) => {
            enemiesId = game.enemies;
        })
        
        .then(async () => {
            const enemies = await enemySchema.find({ _id: enemiesId.map(i => i) })
            return res.json(enemies);
        })
        
        .catch((error) => {
            const errorHappened = new Error();
            return next(errorHappened.message);
        })
})


// Get All locations of a game
router.route('/games/:id/locations').get(/* authorize, */(req, res, next) => {
    const gameId = req.params.id;

    gameSchema.findById(gameId).populate("locations")
        .then((game) => {
            locationsId = game.locations;
        })
        
        .then(async () => {
            const locations = await locationSchema.find({ _id: locationsId.map(i => i) })
            return res.json(locations);
        })
        
        .catch((error) => {
            const errorHappened = new Error();
            return next(errorHappened.message);
        })
})


// Get All weapons of a game
router.route('/games/:id/weapons').get(/* authorize, */(req, res, next) => {
    const gameId = req.params.id;

    gameSchema.findById(gameId).populate("weapons")
        .then((game) => {
            weaponsId = game.weapons;
        })
        
        .then(async () => {
            const weapons = await weaponSchema.find({ _id:weaponsId.map(i => i) })
            return res.json(weapons);
        })
        
        .catch((error) => {
            const errorHappened = new Error();
            return next(errorHappened.message);
        })
})



module.exports = router;