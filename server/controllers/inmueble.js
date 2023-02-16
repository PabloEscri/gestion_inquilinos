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
          .json({ message: "No se ha encontrado ningun usuario." });
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
        //.json({ Temperatura: resp });
        .json({ Temperatura: resp.data.device_status.ext_temperature[0].tC });

      console.log(resp);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ ERROR: "Er1" });
  }
}
async function obtener_lista_inmuebles(req, res) {
  try {
    const inmuebles = await Inmueble.find({});

    // Itera sobre cada documento para obtener el "name" y "id" de cada inmueble
    // Crea un vector de objetos con el nombre y el ID de cada inmueble
    const inmueblesConNombreEId = inmuebles.map((inmueble) => {
      return {
        nombre: inmueble.name,
        id: inmueble._id,
      };
    });

    res.status(200).json({ Pisos: inmueblesConNombreEId });
  } catch (e) {
    console.log(e);
    res.status(500).json({ ERROR: "Er2" });
  }
}
async function obtener_potencia_inmueble(req, res) {
  try {
    const { id } = req.params;
    console.log("ID", id);
    console.log("obtener_potencia_inmueble");
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
            inmueble.shelly_potencia_ID +
            "&auth_key=MTAyNDYwdWlk80C4102EA451A05640576257F285AF3199AADB08373424A1E7C477B557F58431BCE41679CD7DAF6F",
        }
      ).then((response) => {
        return response.json();
      });

      res.status(200).json({ Potencia: resp.data });

      console.log(resp);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ ERROR: "Er1" });
  }
}

async function cambiar_estado_shelly(req, res) {
  try {
    const { id_inmueble, id_shelly, estado } = req.params;

    if (!id_inmueble) {
      res.status(400).send({ msg: "Error id_inmueble." });
      return;
    }
    if (!id_shelly) {
      res.status(400).send({ msg: "Error id_shelly." });
      return;
    }
    if (!estado) {
      res.status(400).send({ msg: "Error estado." });
      return;
    }
    console.log(id_inmueble);
    console.log(id_shelly);
    console.log(estado);

    let encontrado = 0;
    let inmueble = await Inmueble.find({ code: id_inmueble }).then(
      (Inmueble) => {
        Inmueble = Inmueble[0];
        if (!Inmueble) {
          res
            .status(404)
            .send({ message: "No se ha encontrado ningun usuario." });
          return null;
        } else {
          encontrado = 1;
          return Inmueble;
        }
      }
    );
    //TODO: COMPROBAR QUE EL ID DEL SHELLY PERTENECE AL DEL INMUEBLE
    if (encontrado == 1) {
      console.log(inmueble);
      var resp = await fetch(
        "https://shelly-38-eu.shelly.cloud/device/relay/control",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body:
            "turn=" +
            estado +
            "&channel=0&id=" +
            id_shelly +
            "&auth_key=MTAyNDYwdWlk80C4102EA451A05640576257F285AF3199AADB08373424A1E7C477B557F58431BCE41679CD7DAF6F",
        }
      ).then((response) => {
        console.log(response);
        return res.status(200).send(response);
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ ERROR: "Er1" });
  }
}

async function obtener_estado_shelly(req, res) {
  try {
    const { id_inmueble, id_shelly } = req.params;

    if (!id_inmueble) {
      res.status(400).send({ msg: "Error id_inmueble." });
      return;
    }
    if (!id_shelly) {
      res.status(400).send({ msg: "Error id_shelly." });
      return;
    }
    console.log(id_inmueble);
    console.log(id_shelly);

    let encontrado = 0;
    let inmueble = await Inmueble.find({ code: id_inmueble }).then(
      (Inmueble) => {
        Inmueble = Inmueble[0];
        if (!Inmueble) {
          res
            .status(404)
            .send({ message: "No se ha encontrado ningun usuario." });
          return null;
        } else {
          encontrado = 1;
          return Inmueble;
        }
      }
    );
    //COMPROBAR QUE EL ID DEL SHELLY PERTENECE AL DEL INMUEBLE
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
            inmueble.shelly_potencia_ID +
            "&auth_key=MTAyNDYwdWlk80C4102EA451A05640576257F285AF3199AADB08373424A1E7C477B557F58431BCE41679CD7DAF6F",
        }
      ).then((response) => {
        return response.json();
      });
      res.status(200).json({ STATUS: resp });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ ERROR: "Er1" });
  }
}
module.exports = {
  createInmueble,
  obtener_lista_inmuebles,
  getInmuebles,
  deleteInmueble,
  updateInmueble,
  obtener_temperatura_inmueble,
  obtener_potencia_inmueble,
  cambiar_estado_shelly,
  obtener_estado_shelly,
};
