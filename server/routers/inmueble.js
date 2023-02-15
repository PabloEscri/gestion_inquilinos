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
// 7- Dada una casa Activar shelly 1,2 o 3 de la casa
// 8- Obtener los status del shelly 1,2 o 3 de la casa

//#########################################################
// // 1- Crear un inmueble nuevo
api.post("/inmueble", InmuebleController.createInmueble);

// // 2- Obtener todos los inmuebles
api.get("/inmuebles", InmuebleController.getInmuebles);

// // 3- Eliminar un inmuebles
api.delete("/inmueble/:id", InmuebleController.deleteInmueble);

// // 4- Actualizar un inmuebles
api.patch("/inmueble/:id", InmuebleController.updateInmueble);

// 5- Dada una casa leer la temperatura de la casa
api.get(
  "/inmueble/:id/temperature",
  InmuebleController.obtener_temperatura_inmueble
);

// 6- Dada una casa leer la potencia de la casa
api.get("/inmueble/:id/potencia", InmuebleController.obtener_potencia_inmueble);

// 7- Dada una casa Activar shelly 1,2 o 3 de la casa
api.post(
  "/inmueble/:id_inmueble/cambiar-estado/:id_shelly/:estado",

  InmuebleController.cambiar_estado_shelly
);
// 8- Obtener los status del shelly 1,2 o 3 de la casa
api.get(
  "/inmueble/:id_inmueble/cambiar-estado/:id_shelly",

  InmuebleController.obtener_estado_shelly
);
module.exports = api;
