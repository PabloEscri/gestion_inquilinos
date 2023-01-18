const Inmueble = require("../models/Inmueble");

const uuid = require("uuid");
const moment = require("moment");
const fetch = require("node-fetch");

async function createInmueble(req, res) {
  try {
    const inmueble = new Inmueble({ ...req.body, active: false });

    const code = uuid.v4().toString();
    inmueble.code = code;

    // if (req.files.avatar) {
    //   const imagePath = image.getFilePath(req.files.avatar);
    //   user.avatar = imagePath;
    // }

    inmueble.save((error, userStored) => {
      if (error) {
        console.log(error);
        res.status(400).send({ msg: "Error al crear el usuario" });
      } else {
        console.log("Guardado nuevo Inmueble");
        res.status(201).send(userStored);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ Error: "Interno" });
  }
}

function getInmuebles(req, res) {
  try {
    Inmueble.find().then((users) => {
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
    res.status(500).json({ ERROR: "getInmuebles" });
  }
}

async function deleteInmueble(req, res) {
  try {
    const { id } = req.params;

    Inmueble.findByIdAndDelete(id, (error) => {
      if (error) {
        res.status(400).send({ msg: "Error al eliminar el usuario" });
      } else {
        res.status(200).send({ msg: "Inmueble eliminado" });
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function updateInmueble(req, res) {
  try {
    console.log("updateInmueble");
    const { id } = req.params;
    const userData = req.body;
    console.log(userData);

    Inmueble.findByIdAndUpdate({ _id: id }, userData, (error) => {
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

async function obtener_temperatura_inmueble(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ msg: "Error falta el codigo de acceso." });
      return;
    }
    let encontrado = 0;
    let inmueble = await Inmueble.find({ code: id }).then((Inmueble) => {
      Inmueble = Inmueble[0];
      if (!Inmueble) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningun usuario." });
        return null;
      } else {
        //Se ha encontrado un inmueble

        encontrado = 1;
        return Inmueble;
      }
    });

    if (encontrado == 1) {
      console.log(inmueble);
      var resp = await fetch(
        "https://shelly-38-eu.shelly.cloud/device/status",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body:
            "id=" +
            inmueble.shelly_temperatura_ID +
            "&auth_key=MTAyNDYwdWlk80C4102EA451A05640576257F285AF3199AADB08373424A1E7C477B557F58431BCE41679CD7DAF6F",
        }
      ).then((response) => {
        return response.json();
      });
      res
        .status(200)
        .json({ Temperatura: resp.data.device_status.ext_temperature[0].tC });

      console.log(resp);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ ERROR: "Er1" });
  }
}
module.exports = {
  createInmueble,
  getInmuebles,
  deleteInmueble,
  updateInmueble,
  obtener_temperatura_inmueble,
};
