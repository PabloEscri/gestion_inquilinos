const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");
const config = require("../config");
// const FileBasePath = require("./FileBasePath");

// const filePath = `${FileBasePath}/${id}`; // or any file format
async function getIdFromToken(token) {
  try {
    const { id } = jwt.decodedToken(token);
    if (id == null) {
      return "";
    } else {
      return id;
    }
  } catch (err) {
    console.log(err);
    return "";
  }
}
function signUp(req, res) {
  const user = new User();
  try {
    const { name, lastname, email, password, repeatPassword } = req.body;
    user.name = name;
    user.lastname = lastname;
    user.email = email.toLowerCase();
    user.role = "admin";
    user.active = false;

    if (!password || !repeatPassword) {
      res.status(404).send({ message: "Las contraseñas son obligatorias." });
    } else {
      if (password !== repeatPassword) {
        res.status(404).send({ message: "Las contraseñas no son iguales." });
      } else {
        //Encriptamos la contraseña del usuario:
        bcrypt.hash(password, null, null, function (err, hash) {
          if (err) {
            res
              .status(500)
              .send({ message: "Error al encriptar la contraseña." });
          } else {
            user.password = hash;

            user.save((err, userStored) => {
              if (err) {
                res.status(500).send({ message: "El usuario ya existe." });
              } else {
                if (!userStored) {
                  res
                    .status(404)
                    .send({ message: "Error al crear el usuario." });
                } else {
                  res.status(200).send({ user: userStored });
                }
              }
            });
          }
        });
      }
    }
  } catch (err) {
    res.status(500).send({ message: "Faltan campos por enviar en el body" });
  }
}
function signIn(req, res) {
  try {
    const params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;
    const idp = params.idp;
    console.log(idp);
    console.log("SignIn");
    User.findOne({ email }, (err, userStored) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!userStored) {
          res.status(404).send({
            message: "User o contraseña no existen o son incorrectos.",
          });
        } else {
          //Desencriptamos la contraseña del usuario:
          bcrypt.compare(password, userStored.password, (err, check) => {
            if (err) {
              res.status(500).send({ message: "Error del servidor." });
            } else if (!check) {
              //Contraseña incorrecta
              res.status(404).send({
                message: "User o contraseña no existen o son incorrectos.",
              });
            } else {
              if (!userStored.active) {
                res.status(200).send({
                  code: 200,
                  message: "El usuario no se ha activado.",
                });
              } else {
                res.status(200).send({
                  accessToken: jwt.createAccessToken(userStored, idp),
                  refreshToken: jwt.createRefreshToken(userStored),
                });
              }
            }
          });
        }
      }
    });
  } catch (err) {
    res.status(500).send({ message: "Faltan campos por enviar en el body" });
  }
}
function updateUser(req, res) {
  console.log("updateUser");
  const { id } = req.params;
  const userData = req.body;
  console.log(userData);
  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }

  // if (req.files.avatar) {
  //   const imagePath = image.getFilePath(req.files.avatar);
  //   userData.avatar = imagePath;
  // }

  User.findByIdAndUpdate({ _id: id }, userData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar el usuario" });
    } else {
      res.status(200).send({ msg: "Actualizacion correcta" });
    }
  });
}
async function deleteUser(req, res) {
  const { id } = req.params;

  User.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el usuario" });
    } else {
      res.status(200).send({ msg: "Usuario eliminado" });
    }
  });
}
async function createUser(req, res) {
  const { password } = req.body;
  const user = new User({ ...req.body, active: false });

  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password, salt);
  user.password = hasPassword;

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    user.avatar = imagePath;
  }

  user.save((error, userStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear el usuario" });
    } else {
      res.status(201).send(userStored);
    }
  });
}
async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(response);
  }
}
function getUsers(req, res) {
  ///users?page=2&limit=3
  /* const {page=1,limit=10}=req.query;
  const options = {
    page:parseInt(page),
    limit:parseInt(limit),
  }
  //push

  User.paginate({},options,(error,users)=> {
    if (error) {
      res.status(404).send({ message: "No se ha encontrado ningun usuario." });
    } else {
      res.status(200).send({ users });
    }
  }); */

  User.find().then((users) => {
    if (!users) {
      res.status(404).send({ message: "No se ha encontrado ningun usuario." });
    } else {
      res.status(200).send({ users });
    }
  });
}
function getUsersActive(req, res) {
  const query = req.query;

  User.find({ active: query.active }).then((users) => {
    if (!users) {
      res.status(404).send({ message: "No se ha encontrado ningun usuario." });
    } else {
      res.status(200).send({ users });
    }
  });
}

function uploadAvatar(req, res) {
  const params = req.params;

  User.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userData) {
        res.status(404).send({ message: "Nose ha encontrado ningun usuario." });
      } else {
        let user = userData;

        if (req.files) {
          let filePath = req.files.avatar.path;
          let fileSplit = filePath.split("/");
          let fileName = fileSplit[2];

          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];

          if (fileExt !== "png" && fileExt !== "jpg") {
            res.status(400).send({
              message:
                "La extension de la imagen no es valida. (Extensiones permitidas: .png y .jpg)",
            });
          } else {
            user.avatar = fileName;
            User.findByIdAndUpdate(
              { _id: params.id },
              user,
              (err, userResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del servidor." });
                } else {
                  if (!userResult) {
                    res
                      .status(404)
                      .send({ message: "No se ha encontrado ningun usuario." });
                  } else {
                    res.status(200).send({ avatarName: fileName });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
}
function getAvatar(req, res) {
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/avatar/" + avatarName;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.status(404).send({ message: "El avatar que buscas no existe." });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}

async function getUsers(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

function activateUser(req, res) {
  const { id } = req.params;
  const { active } = req.body;

  User.findByIdAndUpdate(id, { active }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "No se ha encontrado el usuario." });
      } else {
        if (active === true) {
          res.status(200).send({ message: "Usuario activado correctamente." });
        } else {
          res
            .status(200)
            .send({ message: "Usuario desactivado correctamente." });
        }
      }
    }
  });
}

function signUpAdmin(req, res) {
  const user = new User();

  const { name, lastname, email, role, password } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user.role = role;
  user.active = true;

  if (!password) {
    res.status(500).send({ message: "La contraseña es obligatoria. " });
  } else {
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "Error al encriptar la contraseña." });
      } else {
        user.password = hash;

        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: "El usuario ya existe." });
          } else {
            if (!userStored) {
              res
                .status(500)
                .send({ message: "Error al crear el nuevo usuario." });
            } else {
              // res.status(200).send({ user: userStored });
              res
                .status(200)
                .send({ message: "Usuario creado correctamente." });
            }
          }
        });
      }
    });
  }
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUsersActive,
  uploadAvatar,
  getAvatar,
  updateUser,
  createUser,
  getMe,
  activateUser,
  deleteUser,
  signUpAdmin,
};
