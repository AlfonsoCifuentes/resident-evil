const express = require("express");
const router = express.Router();
const enemySchema = require("../models/enemies.model");
const authorize = require("../utils/middlewares/auth.middleware");


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

module.exports = router;