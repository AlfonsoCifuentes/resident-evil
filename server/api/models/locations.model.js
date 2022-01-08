const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

//Definimos el equema de nuestra localización
let locationSchema = new Schema({
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
    collection: 'locations'
},{
    timestamps: true
})

//Le indicamos a través del campo unique en el Schema que nos lo valide gracias al plugin 
//instalado y su mensaje al matchearlo si existiera
locationSchema.plugin(uniqueValidator, { message: 'Location already exists' });
module.exports = mongoose.model('Location', locationSchema); //Exportamos el esquema