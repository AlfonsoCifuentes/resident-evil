//Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

//Importamos la conexion a la db
const { connect } = require("./api/utils/database/connect");

// Express APIs
const user = require('./api/routes/user.routes');
const games = require ("./api/routes/games.routes");
const ammo = require ("./api/routes/ammo.routes.js");
const characters = require ("./api/routes/character.routes.js");
const enemies = require ("./api/routes/enemies.routes.js");
const locations = require ("./api/routes/locations.routes.js");
const weapons = require ("./api/routes/weapon.routes.js");
//Ejecutamos la funcion que conecta con la db
connect();

// Configuración de express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// Aquí indicamos las rutas a usar
app.use('/public', express.static('public'));

app.use('/api', user)
app.use('/api', games)
app.use('/api', ammo)
app.use('/api', characters)
app.use('/api', enemies)
app.use('/api', locations)
app.use('/api', weapons)


// Definimos el puerto desde el dotenv y si no lo hubiera el 4000
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Manejamos los errores
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});