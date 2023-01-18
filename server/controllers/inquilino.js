const Inquilino = require("../models/inquilino");

const bcrypt = require("bcrypt-nodejs");
const uuid = require("uuid");
const moment = require("moment");
const fetch = require("node-fetch");
const { response } = require("express");
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
  try {
    const user = new Inquilino({ ...req.body, active: false });

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
    Inquilino.find().then((users) => {
      if (!users) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningun usuario." });
      } else {
        res.status(200).send({ users });
      }
    });
  } catch (e) {
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
    console.log("updateInquilino");
    const { id } = req.params;
    const userData = req.body;
    console.log(userData);

    Inquilino.findByIdAndUpdate({ _id: id }, userData, (error) => {
      if (error) {
        res.status(400).send({ msg: "Error al actualizar el usuario" });
      } else {
        res.status(200).send({ msg: "Actualizacion correcta" });
      }
    });
  } catch (e) {
    res.status(500).json({ ERROR: "Er1" });
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
    let code = userData.code;
    let encontrado = 0;
    await Inquilino.find({ code: code }).then((inquilino) => {
      inquilino = inquilino[0];
      if (!inquilino) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningun usuario." });
      } else {
        //Se ha encontrado un usuario
        //Hay que comparar si la fecha de entrada y la de salida le permiten abrir la puerta

        if (!moment(inquilino.fecha_entrada, "MM/DD/YYYY").isValid()) {
          console.log("Error");
        }
        if (!moment(inquilino.fecha_salida, "MM/DD/YYYY").isValid()) {
          console.log("Error");
        }
        var unixTimestamp = moment().unix();

        console.log("Fecha entrada", inquilino.fecha_entrada);
        console.log("HOY", moment.unix(unixTimestamp).format("MM/DD/YYYY"));
        console.log("Fecha salida", inquilino.fecha_salida);
        if (
          moment().unix() >=
            moment(inquilino.fecha_entrada, "MM/DD/YYYY").unix() &&
          moment().unix() <= moment(inquilino.fecha_salida, "MM/DD/YYYY").unix()
        ) {
          console.log("Está entre las fechas");
          encontrado = 1;
          res
            .status(200)
            .json({ "Abriendo puerta": "inquilino", Usuario: inquilino });
        } else {
          console.log("No está entre las fechas");
          res.status(400).json({ "Error ": "no autorizado" });
        }
      }
    });
    if (encontrado == 1) {
      var resp = await fetch(
        "https://shelly-38-eu.shelly.cloud/device/relay/control",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "turn=on&channel=0&id=e89f6d860023&auth_key=MTAyNDYwdWlk80C4102EA451A05640576257F285AF3199AADB08373424A1E7C477B557F58431BCE41679CD7DAF6F",
        }
      ).then((response) => {
        return response.json();
      });
      setTimeout(
        () => {
          fetch("https://shelly-38-eu.shelly.cloud/device/relay/control", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "turn=off&channel=0&id=e89f6d860023&auth_key=MTAyNDYwdWlk80C4102EA451A05640576257F285AF3199AADB08373424A1E7C477B557F58431BCE41679CD7DAF6F",
          }).then((response) => {
            return response.json();
          });
        },
        1500,
        "funky"
      );
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
