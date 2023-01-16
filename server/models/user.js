const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const UserSchame = Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
  active: Boolean,
  avatar: String,
  fecha_entrada: String,
  fecha_salida: String,
});

//UserSchame.plugin(mongoosePaginate);

module.exports = mongoose.model("User", UserSchame);
