const express = require("express");
const router = express.Router();
const weaponSchema = require("../models/weapon.model");
const authorize = require("../utils/middlewares/auth.middleware");


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

module.exports = router;