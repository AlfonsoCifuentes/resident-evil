const express = require("express");
const router = express.Router();
const weaponSchema = require("../models/weapon.model");
const authorize = require("../utils/middlewares/auth.middleware");
const gameSchema = require ("../models/games.model")
let gamesId;

// Get All weapons
router.route('/weapons').get(authorize, (req, res, next) => {
    weaponSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single weapon
router.route('/weapons/:id').get(authorize, (req, res, next) => {
    weaponSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Get All games of a weapon
router.route('/weapons/:id/games').get(/* authorize, */(req, res, next) => {
    const weaponId = req.params.id;

weaponSchema.findById(weaponId).populate("games")
        .then((weapon) => {
            gamesId = weapon.games;
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