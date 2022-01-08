const express = require("express");
const router = express.Router();
const locationSchema = require("../models/locations.model");
const authorize = require("../utils/middlewares/auth.middleware");


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

module.exports = router;