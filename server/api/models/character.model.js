const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const Game = require('./games.model');

//Definimos el equema de nuestra localización
let characterSchema = new Schema({
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
    games: {
        type: Array
    }
}, {
    collection: 'characters'
},{
    timestamps: true
})

//Le indicamos a través del campo unique en el Schema que nos lo valide gracias al plugin 
//instalado y su mensaje al matchearlo si existiera
characterSchema.plugin(uniqueValidator, { message: 'Character already exists' });
const Character = mongoose.model('Character', characterSchema);
module.exports = Character //Exportamos el esquema