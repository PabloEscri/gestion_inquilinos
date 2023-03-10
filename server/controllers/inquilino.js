const Inquilino = require("../models/inquilino");

const bcrypt = require("bcrypt-nodejs");
const uuid = require("uuid");
const moment = require("moment");
const fetch = require("node-fetch");
const { response } = require("express");
const Inmueble = require("../models/inmueble");
function getInquilinosActive(req, res) {
  const query = req.query;

  Inquilino.find({ active: query.active }).then((users) => {
    if (!users) {
      res.status(404).send({ message: "No se ha encontrado ningun usuario." });
    } else {
      res.status(200).send({ users });
    }
  });
}

async function createInquilino(req, res) {
  const user = new Inquilino();
  try {
    const {
      name,
      email,
      inmueble,
      telefono,
      fecha_entrada,
      fecha_salida,
      tipo_inquilino,
      plataforma,
      pago,
      comision,
      forma_pago,
      pago_limpieza,
    } = req.body;
    console.log(req.body);
    user.name = name.toLowerCase();
    user.email = email.toLowerCase();
    user.inmueble = inmueble;
    user.telefono = telefono.toLowerCase();
    user.active = true;
    user.fecha_salida = fecha_salida;
    user.fecha_entrada = fecha_entrada;
    user.tipo_inquilino = tipo_inquilino;
    user.plataforma = plataforma;
    user.pago = pago;
    user.comision = comision;
    user.forma_pago = forma_pago;
    user.pago_limpieza = pago_limpieza;
    const code = uuid.v4().toString();
    user.code = code;

    // if (req.files.avatar) {
    //   const imagePath = image.getFilePath(req.files.avatar);
    //   user.avatar = imagePath;
    // }

    user.save((error, userStored) => {
      if (error) {
        console.log(error);
        res.status(400).send({ msg: "Error al crear el usuario" });
      } else {
        console.log("Guardado nuevo inquilino");
        res.status(201).send(userStored);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ Error: "Interno" });
  }
}

function getInquilinos(req, res) {
  try {
    const query = req.query;
    Inquilino.find({ active: query.active })
      .sort({ fecha_salida: 1 })
      .then((users) => {
        if (!users) {
          console.log("getInquilinos", "ERROR");
          res
            .status(404)
            .send({ message: "No se ha encontrado ningun usuario." });
        } else {
          const sortedUsers = users.sort(
            (a, b) =>
              moment(a.fecha_salida, "YYYY-MM-DD") -
              moment(b.fecha_salida, "YYYY-MM-DD")
          );
          res.status(200).send({ users: sortedUsers });
        }
      });
  } catch (e) {
    console.log("getInquilinos", e);
    console.log(e);
    res.status(500).json({ ERROR: "getInquilinos" });
  }
}

async function deleteInquilino(req, res) {
  try {
    const { id } = req.params;

    Inquilino.findByIdAndDelete(id, (error) => {
      if (error) {
        res.status(400).send({ msg: "Error al eliminar el usuario" });
      } else {
        res.status(200).send({ msg: "Inquilino eliminado" });
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function updateInquilino(req, res) {
  try {
    //TODO filtrar campos
    console.log("updateInquilino");
    const { id } = req.params;
    const userData = req.body;
    console.log(userData);

    Inquilino.findByIdAndUpdate({ _id: id }, userData, (error) => {
      if (error) {
        res.status(400).json({ message: "Error al actualizar el usuario" });
      } else {
        res.status(200).json({ message: "Actualizacion correcta" });
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Er1" });
  }
}
async function abrirgaraje() {}
async function abrirPuertaInquilino(req, res) {
  try {
    const userData = req.body;
    console.log("User Data", userData);
    if (!userData.code) {
      res.status(400).send({ msg: "Error falta el codigo de acceso." });
      return;
    }
    console.log("abrirPuertaInquilino", 1);
    let code = userData.code;
    let encontrado = 0;
    let my_inquilino = await Inquilino.find({ code: code }).then(
      (inquilino) => {
        console.log("abrirPuertaInquilino", 2);
        inquilino = inquilino[0];
        if (!inquilino) {
          console.log("abrirPuertaInquilino", 3);
          res
            .status(404)
            .send({ message: "No se ha encontrado ningun usuario." });
        } else {
          //Se ha encontrado un usuario
          //Hay que comparar si la fecha de entrada y la de salida le permiten abrir la puerta

          if (!moment(inquilino.fecha_entrada, "YYYY-MM-DD").isValid()) {
            console.log("Error");
            console.log("abrirPuertaInquilino", 4);
          }
          if (!moment(inquilino.fecha_salida, "YYYY-MM-DD").isValid()) {
            console.log("Error");
            console.log("abrirPuertaInquilino", 5);
          }
          var unixTimestamp = moment().unix();
          console.log("abrirPuertaInquilino", 5);
          console.log("Fecha entrada", inquilino.fecha_entrada);
          console.log("HOY", moment.unix(unixTimestamp).format("YYYY-MM-DD"));
          console.log("Fecha salida", inquilino.fecha_salida);
          if (
            moment().unix() >=
              moment(inquilino.fecha_entrada, "YYYY-MM-DD").unix() &&
            moment().unix() <=
              moment(inquilino.fecha_salida, "YYYY-MM-DD").unix()
          ) {
            console.log("Est?? entre las fechas");
            encontrado = 1;
            return inquilino;
            // res
            //   .status(200)
            //   .json({ "Abriendo puerta": "inquilino", Usuario: inquilino });
          } else {
            console.log("No est?? entre las fechas");
            res.status(400).json({ message: "Link caducado" });
            return null;
          }
        }
      }
    );
    //TODO rescatarel id del shelly del piso en el que est?? el inquilino

    if (encontrado == 1) {
      var inmueble = my_inquilino.inmueble;
      console.log("El inquilino est?? en la vivienda: ", inmueble);
      let shelly_id = await Inmueble.find({ _id: inmueble }).then(
        (inmueble) => {
          console.log("Encontrado ", inmueble);
          console.log(
            "turn=on&channel=0&id=" +
              inmueble[0].shelly_abrir_puerta_ID +
              "&auth_key=MTAyNDYwdWlk80C4102EA451A05640576257F285AF3199AADB08373424A1E7C477B557F58431BCE41679CD7DAF6F"
          );
          return inmueble[0].shelly_abrir_puerta_ID;
        }
      );
      var resp = await fetch(
        "https://shelly-38-eu.shelly.cloud/device/relay/control",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body:
            "turn=on&channel=0&id=" +
            shelly_id +
            "&auth_key=MTAyNDYwdWlk80C4102EA451A05640576257F285AF3199AADB08373424A1E7C477B557F58431BCE41679CD7DAF6F",
        }
      ).then((response) => {
        return response.json();
      });
      await setTimeout(
        () => {
          fetch("https://shelly-38-eu.shelly.cloud/device/relay/control", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
              "turn=off&channel=0&id=" +
              shelly_id +
              "&auth_key=MTAyNDYwdWlk80C4102EA451A05640576257F285AF3199AADB08373424A1E7C477B557F58431BCE41679CD7DAF6F",
          }).then((response) => {
            return response.json();
          });
        },
        5000,
        "funky"
      );
      res.status(200).json({ message: "Abriendo" });
      console.log(resp);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ ERROR: "Er1" });
  }
}
module.exports = {
  createInquilino,
  getInquilinos,
  deleteInquilino,
  updateInquilino,
  abrirPuertaInquilino,
};
