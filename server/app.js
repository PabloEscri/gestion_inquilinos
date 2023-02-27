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

//Cargamos las tareas periodicas
const inquilinosTask = require("./periodic/usuarios_pasados.js");

//Load rutings
const userRoutes = require("./routers/user");
const inmueble = require("./routers/inmueble");
const inquilino = require("./routers/inquilino");
const authRoutes = require("./routers/auth");
const facturacion = require("./routers/facturacion");
app.set("view engine", "pug");

const fileUpload = require("express-fileupload");
app.use(fileUpload());

//Rutas a comprobar
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Bienvenido" });
  console.log("Bienvenido");
});
app.get(
  "/.well-known/pki-validation/7D533A539376E92C3169FF95095144FD.txt",
  (req, res) => {
    fs.readFile("./7D533A539376E92C3169FF95095144FD.txt", (err, data) => {
      if (err) {
        // Si hay un error al leer el archivo, respondemos con un error 500
        res.statusCode = 500;
        res.end("Error interno del servidor");
        console.error(err);
      } else {
        // Si se pudo leer el archivo, lo enviamos como respuesta
        res.setHeader("Content-Type", "text/plain");
        res.end(data);
      }
    });
  }
);
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);

app.use(`/api/${API_VERSION}`, inmueble);
app.use(`/api/${API_VERSION}`, inquilino);
app.use(`/api/${API_VERSION}`, facturacion);

module.exports = app;
