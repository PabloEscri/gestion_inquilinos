const jwt = require("../services/jwt");
const moment = require("moment");
const User = require("../models/user");

function willExpireToken(token) {
  const { exp } = jwt.decodedToken(token);
  const currentDate = moment().unix();

  if (currentDate > exp) {
    return true;
  }
  return false;
}


//Refresca el token
function refreshAccessToken(req, res) {
  try {
    const { refreshToken } = req.body;
    const isTokenExpired = willExpireToken(refreshToken);

    if (isTokenExpired) {
      res.status(404).send({ message: "El refreshToken ha expirado" });
    } else {
      // Extraigo del jwt el id para poder buscar en la BBDD:
      const { id } = jwt.decodedToken(refreshToken);

      User.findOne({ _id: id }, (err, userStored) => {
        if (err) {
          res.status(500).send({ message: "Error del servidor." });
        } else {
          if (!userStored) {
            //diria que es redundante
            res.status(404).send({ message: "Usuario no encontrado." });
          } else {
            res.status(200).send({
              accessToken: jwt.createAccessToken(userStored), //solo se refresca este
              refreshToken: refreshToken, //esto sirve para que sólo puedas estar n días conectado
            });
          }
        }
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Faltan campos por enviar en el body" });
  }
}

module.exports = {
  refreshAccessToken,
};
