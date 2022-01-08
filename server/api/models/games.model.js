const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

//Definimos el equema de nuestro juego
let gameSchema = new Schema({
    id: {type: String},
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
        
    },
    info: {
        type: String,
        required: true,
    },
    plot: {
        type: String,
        required: true,
    },
    characters: {
        type: Array
    },
    enemies: {
        type: Array
    },
    weapons: {
        type: Array
    },
    locations: {
        type: Array
    }
}, {
    collection: 'games'
},{
    timestamps: true
})

//Le indicamos a través del campo unique en el Schema que nos lo valide gracias al plugin 
//instalado y su mensaje al matchearlo si existiera
gameSchema.plugin(uniqueValidator, { message: 'Game already exists' });
//Guardando el modelo de Game
const Game = mongoose.model('Game', gameSchema);
 //Exportamos el esquema/ modelo de Game
module.exports = Game;