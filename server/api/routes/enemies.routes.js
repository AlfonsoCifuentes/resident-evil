const express = require("express");
const router = express.Router();
const enemySchema = require("../models/enemies.model");
const authorize = require("../utils/middlewares/auth.middleware");
const gameSchema = require ("../models/games.model")
let gamesId;

// Get All enemies
router.route('/enemies').get(authorize, (req, res, next) => {
    enemySchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single enemy
router.route('/enemies/:id').get(authorize, (req, res, next) => {
    enemySchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Get All games of an enemy
router.route('/enemies/:id/games').get(/* authorize, */(req, res, next) => {
    const enemyId = req.params.id;

enemySchema.findById(enemyId).populate("games")
        .then((enemy) => {
            gamesId = enemy.games;
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