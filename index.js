'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port=3500;

mongoose.Promise = global.Promise;

//Connection to DB

mongoose.connect("mongodb://localhost:27017/piano-hobby")
    .then(res =>{
        console.log("la conexion a la base de datos exitosa");
        app.listen(port,() =>{
            console.log("El servicio se ha levantado correctamente en mi http://localhost:"+port);
        })
    })
    .catch(err =>{
        console.log(err);
    });