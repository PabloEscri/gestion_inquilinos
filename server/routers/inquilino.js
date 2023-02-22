const express = require("express");
const InquilinoController = require("../controllers/inquilino");
const multiparty = require("connect-multiparty");

const md_auth = require("../middleware/authenticated");
const inquilino = require("../models/inquilino");
const md_upload = multiparty({ uploadDir: "./uploads/avatar" });

const api = express.Router();
//Creamos todas las rutas asociadas al usuario
// Tengo que poder:

// 1- Crear un inquilino con todos sus campos
// 2- Eliminar un inquilino
// 3- Actualizar un inquilino
// 4- Crear un codigo de entrada aleatorio para un inquilino

//#########################################################
// 1- Crear un inquilino con todos sus campos
api.post("/inquilino", InquilinoController.createInquilino);

// // 2- Eliminar un inquilino
api.delete(
  "/inquilino/:id",
  [md_auth.ensureAuth],
  InquilinoController.deleteInquilino
);

// // 3- Actualizar un inquilino
api.patch(
  "/inquilino/:id",
  [md_auth.ensureAuth],
  InquilinoController.updateInquilino
);

// // 4- Crear un codigo de entrada aleatorio para un inquilino
// api.get(
//   "/inquilino/:id/create-code",
//   [md_auth.ensureAuth, md_upload],
//   InquilinoController.createCodeInquilino
// );

// // 5- Obtener todos los inquilinos
api.get(
  "/inquilinos",
  //TODO [md_auth.ensureAuth],
  InquilinoController.getInquilinos
);

// // 6- Abrir puerta Inquilino
api.post("/inquilino-abrir", InquilinoController.abrirPuertaInquilino);

// api.get("/inquilino", [md_auth.ensureAuth], InquilinoController.getUsers);
// api.get(
//   "/inquilino-active",
//   [md_auth.ensureAuth],
//   InquilinoController.getUsersActive
// );

module.exports = api;
