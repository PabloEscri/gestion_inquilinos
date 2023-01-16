const mongoose = require("mongoose");
const app = require("./app");

const https = require("https");
const fs = require("fs");

const { API_VERSION } = require("./config");
const config = require("./config.js");

console.log("dirname: ", __dirname);
console.log("=============================================");
console.log(`========= ${config.NODE_ENV}=========`);
console.log("=============================================");
console.log(`NODE_ENV       = ${config.NODE_ENV}`);
console.log(`HOST           = ${config.HOST}`);
console.log(`PORT           = ${config.PORT}`);
console.log(`MONGODB        = ${config.MONGODB}`);
console.log(`FTP_HOST       = ${config.FTP_HOST}`);
console.log(`FTP_USER       = ${config.FTP_USER}`);
console.log(`FTP_PASSWORD   = ${config.FTP_PASSWORD}`);
console.log(`API_VERSION    = ${config.API_VERSION}`);
console.log("=============================================");

const conexionDB = async () => {
  await mongoose.connect(
    //`mongodb://localhost:27017/`,
    //`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`,
    config.MONGODB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
      if (err) {
        console.log("ERROR CONEXION MONGO");
        throw err;
      } else {
        console.log("La conexion a la BBDD ha sido satisfactoria.");

        const optionsZeroSSL = {
          ca: fs.readFileSync("./certificates/ca_bundle.crt"),
          key: fs.readFileSync("./certificates/private.key"),
          cert: fs.readFileSync("./certificates/certificate.crt"),
        };
        // var server = https
        //   .createServer(optionsZeroSSL, app)
        //   .listen(config.PORT, function () {
        //     console.log("SERVIDOR VIVO");
        //     console.log(`Example app listening on port ${config.PORT}`);
        //     console.log("Estamos activos");
        //   });
        app.listen(config.PORT, function () {
          console.log("###########################");
          console.log("######## API REST #########");
          console.log("###########################");
          console.log(
            `http://${config.HOST}:${config.PORT}/api/${API_VERSION}`
          );
          //console.log(`http://${IP_SERVER}:${SERVER_PORT}/api/${API_VERSION}`);
        });
      }
    }
  );
};

conexionDB();
