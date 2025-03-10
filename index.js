"use strict";

const express = require("express");
const bodyParse = require("body-parser");
const config = require("./config");
const app = express();
const cors = require("cors");

app.use(bodyParse.json());

app.use(cors({
  origin: "http://localhost:4200"
}));

app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow_Origin', '*');
    res.setHeader('Access-Control-Allow_Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.listen(config.PORT, () => {
  console.log(`Api Rest corriendo en http://${config.AMBIENT}:${config.PORT}`);
});

//Servicios API
require('./src/routers/eventoRouter')(app);
require('./src/routers/eventoUbiRouter')(app);