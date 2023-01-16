const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InquilinoSchame = Schema({
  name: String,
  lastname: String,
  email: String,
  code: {
    type: String,
    unique: true,
  },
  role: String,
  active: Boolean,
  avatar: String,
  fecha_entrada: String,
  fecha_salida: String,
});

module.exports = mongoose.model("Inquilino", InquilinoSchame);
