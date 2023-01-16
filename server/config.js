const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

const API_VERSION = "v1";

const PORT_DB = 27017;

const ORION_PORT = 1026;
const ORION_IP_SERVER = "localhost";
const ORION_API_VERSION = "v2";

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "production",
  HOST: process.env.HOST || "44.210.197.98",
  PORT: process.env.PORT || 3977,
  MONGODB: process.env.MONGODB || `mongodb://localhost:27017/`,
  API_VERSION,
  PORT_DB,
  ORION_PORT,
  ORION_IP_SERVER,
  ORION_API_VERSION,
  FTP_HOST: process.env.FTP_HOST || "ftp.ita.es",
  FTP_USER: process.env.FTP_USER || "capillar",
  FTP_PASSWORD: process.env.FTP_PASSWORD || "975cruAJA",
  ID_PERMITIDOS:
    process.env.ID_PERMITIDOS ||
    "639c67ac80170aef233bbce8,62cfe62a0032c0b81d3db22c",
  LENGTH: process.env.LENGTH || 2,
};
