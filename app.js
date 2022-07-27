"use strict";

//IMPORTS
const express = require("express");
const bodyParse = require("body-parser");
const mysql = require('mysql');
const express_myconnection = require('express-myconnection');
const app = express();
require('dotenv').config();

const db = {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
};

//MIDDLEWARES
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

//CONNECTION TO DATABASE
app.use(express_myconnection(mysql, db, 'single'))

//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//ROUTES
const routes = require("./routes/routes");
app.use(routes);

//EXPORTATION
module.exports = app;
