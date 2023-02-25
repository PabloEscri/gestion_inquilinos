const express = require("express");
const InquilinoController = require("../controllers/inquilino");
const FacturacionController = require("../controllers/facturacion");
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
//#############################################################
// // 3- Actualizar un inquilino

//TODO: Middleware de token
api.get("/facturacion/:id", FacturacionController.getFacturacion);

module.exports = api;
