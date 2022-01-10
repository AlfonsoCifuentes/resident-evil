const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

//Definimos el equema de nuestra localización
let weaponSchema = new Schema({
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
    ammo: {
        type: String
    },
    games: {
        type: Array
    }
}, {
    collection: 'weapons'
},{
    timestamps: true
})

//Le indicamos a través del campo unique en el Schema que nos lo valide gracias al plugin 
//instalado y su mensaje al matchearlo si existiera
weaponSchema.plugin(uniqueValidator, { message: 'Weapon already exists' });
module.exports = mongoose.model('Weapon', weaponSchema); //Exportamos el esquema