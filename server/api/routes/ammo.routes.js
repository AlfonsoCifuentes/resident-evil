const express = require("express");
const router = express.Router();
const ammoSchema = require("../models/ammo.model");
const authorize = require("../utils/middlewares/auth.middleware");


// Get All ammo
router.route('/ammo').get(authorize, (req, res, next) => {
    ammoSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single ammo
router.route('/ammo/:id').get(authorize, (req, res, next) => {
    ammoSchema.findById(req.params.id, (error, data) => {
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