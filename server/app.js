const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { API_VERSION } = require("./config.js");
const config = require("./config.js");
const cors = require("cors");

app.use(cors());

// use this cors in middleware and done
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Load rutings
const userRoutes = require("./routers/user");
const inquilino = require("./routers/inquilino");
const authRoutes = require("./routers/auth");
app.set("view engine", "pug");

const fileUpload = require("express-fileupload");
app.use(fileUpload());

//Rutas a comprobar
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Bienvenido" });
  console.log("Bienvenido");
});
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, inquilino);

module.exports = app;
