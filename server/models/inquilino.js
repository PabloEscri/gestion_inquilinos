const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InquilinoSchame = Schema({
  name: String,
  telefono: String,
  email: String,
  code: {
    type: String,
    unique: true,
  },
  inmueble: String,
  active: Boolean,
  avatar: String,
  fecha_entrada: String,
  fecha_salida: String,
  tipo_inquilino: String,
  pago_limpieza: String,
  forma_pago: String,
  comision: String,
  pago: String,
  plataforma: String,
});

module.exports = mongoose.model("Inquilino", InquilinoSchame);
