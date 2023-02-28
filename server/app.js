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
  "/.well-known/pki-validation/929D364FCFBC8B0E74CC372A44CF7AC5.txt",
  (req, res) => {
    fs.readFile(filePath, "utf8", function (err, data) {
      if (err) {
        res.status(500).send("Error al leer el archivo");
      } else {
        res.status(200).send(data);
      }
    });
    console.log("Enviando");
    //  res.status(200).sendFile(filePath, function(err) {
    //    if (err) {
    //console.log("error");
    //res.status(500).send('Error al leer el archivo');
    //    }
    //    });
  }
);
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);

app.use(`/api/${API_VERSION}`, inmueble);
app.use(`/api/${API_VERSION}`, inquilino);
app.use(`/api/${API_VERSION}`, facturacion);

module.exports = app;
