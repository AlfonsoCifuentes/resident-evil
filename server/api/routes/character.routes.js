const express = require("express");
const router = express.Router();
const characterSchema = require("../models/character.model");
const gamesModel = require("../models/games.model");
const authorize = require("../utils/middlewares/auth.middleware");


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


module.exports = router;