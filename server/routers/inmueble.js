const express = require("express");
const InmuebleController = require("../controllers/inmueble");
const md_auth = require("../middleware/authenticated");
const api = express.Router();
//Creamos todas las rutas asociadas al usuario
// Tengo que poder:

// 1- Crear un inmueble nuevo
// 2- Leer todos los inmuebles
// 3- Eliminar un inmueble
// 4- Actualizar un inmueble
// 5- Dada una casa leer la temperatura de la casa
// 6- Dada una casa leer la potencia de la casa
// 7- Dada una casa leer la potencia de la casa
// 8- Dada una casa Activar shelly 1,2 o 3 de la casa

//#########################################################
// // 1- Crear un inmueble nuevo
api.post("/inmueble", InmuebleController.createInmueble);

// // 2- Obtener todos los inmuebles
api.get("/inmuebles", [md_auth.ensureAuth], InmuebleController.getInmuebles);

// // 3- Eliminar un inmuebles
api.delete(
  "/inmueble/:id",
  [md_auth.ensureAuth],
  InmuebleController.deleteInmueble
);

// // 4- Actualizar un inquilino
api.patch(
  "/inmueble/:id",
  [md_auth.ensureAuth],
  InmuebleController.updateInmueble
);

// 5- Dada una casa leer la temperatura de la casa
api.get(
  "/inmueble/:id/temperature",
  [md_auth.ensureAuth],
  InmuebleController.obtener_temperatura_inmueble
);

// 6- Dada una casa leer la potencia de la casa
// 7- Dada una casa leer la potencia de la casa
// 8- Dada una casa Activar shelly 1,2 o 3 de la casa

// // // 6- Abrir puerta Inquilino
// api.post("/inquilino-abrir", InmuebleController.abrirPuertaInquilino);

// // api.get("/inquilino", [md_auth.ensureAuth], InmuebleController.getUsers);
// // api.get(
// //   "/inquilino-active",
// //   [md_auth.ensureAuth],
// //   InmuebleController.getUsersActive
// // );

module.exports = api;
