'use strict'

//importaciones
var express = require('express');
var bodyParse = require('body-parser');

//lanzar el servicio
var app = express();

//middlewares
app.use(bodyParse.urlencoded({extended : false}));
app.use(bodyParse.json());

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas

var routes = require('./routes/routes');
app.use(routes);

//exportarlo
module.exports = app;