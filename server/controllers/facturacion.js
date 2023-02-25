const Inquilino = require("../models/inquilino");

const bcrypt = require("bcrypt-nodejs");
const uuid = require("uuid");
const moment = require("moment");
const fetch = require("node-fetch");
const { response } = require("express");
const Inmueble = require("../models/inmueble");

function getFacturacion(req, res) {
  try {
    console.log("getFacturacion");
    const { id } = req.params;
    Inquilino.find({ inmueble: id }).then((users) => {
      if (!users) {
        console.log("getInquilinos", "ERROR");
        res.status(404).send({ message: "No hay informacion de facturacion" });
      } else {
        console.log("GetFacturacion", "Hay informacion de facturacion");
        res.status(200).send({ users });
      }
    });
  } catch (e) {
    console.log("getInquilinos", e);
    console.log(e);
    res.status(500).json({ ERROR: "getInquilinos" });
  }
}

module.exports = {
  getFacturacion,
};
