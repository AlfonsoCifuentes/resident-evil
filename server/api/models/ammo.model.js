const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

//Definimos el equema de nuestra localización
let ammoSchema = new Schema({
    id: {type: String},
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        
    },
    weapons: {
        type: String,

    },

}, {
    collection: 'ammo'
},{
    timestamps: true
})

//Le indicamos a través del campo unique en el Schema que nos lo valide gracias al plugin 
//instalado y su mensaje al matchearlo si existiera
ammoSchema.plugin(uniqueValidator, { message: 'Type of ammo already exists' });
module.exports = mongoose.model('Ammo', ammoSchema); //Exportamos el esquema