const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InmuebleSchema = Schema({
  code: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    unique: true,
  },
  owner: String,
  shelly_abrir_puerta_ID: String,
  shelly_temperatura_ID: String,
  shelly_potencia_ID: String,
});

//UserSchame.plugin(mongoosePaginate);

module.exports = mongoose.model("Inmueble", InmuebleSchema);
