const express = require("express");
const UserController = require("../controllers/user");
const multiparty = require("connect-multiparty");

const md_auth = require("../middleware/authenticated");
const md_upload = multiparty({ uploadDir: "./uploads/avatar" });

const api = express.Router();
//Creamos todas las rutas asociadas al usuario
api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
//##################################################
api.patch(
  "/user/:id",
  [md_auth.ensureAuth, md_upload],
  UserController.updateUser
);
api.delete("/user/:id", [md_auth.ensureAuth], UserController.deleteUser);
api.post("/user", [md_auth.ensureAuth, md_upload], UserController.createUser);
api.get("/user/me", [md_auth.ensureAuth], UserController.getMe);

//##################################################

api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);

module.exports = api;
