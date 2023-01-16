import Moment from "moment";
export const device = [
  {
    name: "VAN 1",
    owner: "-",
    status: ["Offline"],
    model: "-",
    update: "-",
  },
  {
    name: "Bici1",
    owner: "Juan",
    status: ["Online"],
    model: "Bici de carga",
    update: Moment.unix(Date.now() / 1000)
      .utcOffset(0)
      .format("YYYY/MM/DD - hh:mm:ss"),
  },
];
