const express = require("express");
const router = express.Router();
const gameSchema = require("../models/games.model");
const authorize = require("../utils/middlewares/auth.middleware");
const characterSchema = require ("../models/character.model");


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
router.route('/games/:id/characters').get(/* authorize, */ (req, res, next) => {
    
    const gameId=req.params.id;
/* gameSchema.findById(gameId).populate("characters")
   .then((game) => {
        var respuesta = res.json(game.characters);

        return respuesta
   })

*/


/*  gameSchema.findById(gameId).populate("characters")
    .then((game) => {
            

            for (let personaje of game.characters){            
                characterSchema.findById(personaje)

                .then((personajes) => {
                    return res.json(personajes)
                })

            }

    })     */  

    gameSchema.findById(gameId)
    .then((game) => {
            

            for (let personaje of game.characters){            
                characterSchema.findById(personaje)

                .then((personajes) => {
                    var personajillos = []
                    personajillos.push(res.json(personajes))
                
                })
            
            }
            return res.json(personajillos)
    })    



.catch((error) => {
       const errorHappened = new Error();
       return next (errorHappened.message);

   })
});



module.exports = router;