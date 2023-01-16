//import specific methods/classes

import * as dfd from "danfojs";

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};
export function datos_table_Hubs(data_hubs) {
  var col = [];
  var puntos_hubs = [];
  Object.keys(data_hubs).map(function (x) {
    col.push({ title: x, dataIndex: x, key: x });
  });
  return {};
}

export function pandas_ejemplo(data) {
  data = [
    {
      hub_id: "0",
      hub_name: "HUB CEBEO",
      hub_lat: "50.8674567",
      hub_lon: "4.3497761",
      hub_pc: "1000",
      hub_earlytime: "07:00",
      hub_latetime: "18:00",
    },
    {
      hub_id: "1",
      hub_name: "HUB VT",
      hub_lat: "50.8327742",
      hub_lon: "4.3306477",
      hub_pc: "1070",
      hub_earlytime: "06:00",
      hub_latetime: "22:00",
    },
    {
      hub_id: "2",
      hub_name: "HUB STIB",
      hub_lat: "50.8299319",
      hub_lon: "4.3316704",
      hub_pc: "1060",
      hub_earlytime: "06:00",
      hub_latetime: "22:00",
    },
  ];
  var df = new dfd.DataFrame(data);
  console.log("All columns:");
  console.log(df.columns);
  console.log("Column 0:");
  df[df.columns[0]].print();
  console.log("Types of each column:");
  df.ctypes.print();
  df = df.loc({ columns: ["hub_id", "hub_name"] });
  console.log("All table:");

  df.print();
  console.log("Sorting table: ");
  var df2 = new dfd.DataFrame(data);
  df2.sortValues("hub_id", { ascending: false, inplace: true });
  df2.print();

  console.log("Tabla filtrada por hub_earlytime: ");
  var df3 = new dfd.DataFrame(data);
  df3 = df3.iloc({
    rows: df3["hub_earlytime"].eq("06:00"),
  });
  df3.print();

  var df4 = new dfd.DataFrame(data);
  console.log("Agrupar y contar por: ");
  var df_grouped_by = df4.groupby(["hub_earlytime"]).count();
  df_grouped_by.print();

  console.log("Suma de columna: ");
  var df_sum = df3.sum({ axis: 0 });
  df_sum.print();
  console.log(df_sum.columns);
  console.log(df_sum.rows);

  console.log(df_sum.values);
  df_sum = df_sum.loc({ rows: ["hub_id"] });
  df_sum.print();
}

export function redondear_numero(numero, cifras) {
  var numero_redondeado = Number(numero.toFixed(cifras));
  return numero_redondeado;
}

export function pandas(response) {
  console.log(response);

  var IN1_Orders = new dfd.DataFrame(response.IN1_Orders);
  var IN2_Hubs = new dfd.DataFrame(response.IN2_Hubs);
  var IN3_TranspTypes = new dfd.DataFrame(response.IN3_TranspTypes);
  var IN4_Transp = new dfd.DataFrame(response.IN4_Transp);
  var OPT1_Tours = new dfd.DataFrame(response.OPT1_Tours);
  var OPT2_Orders = new dfd.DataFrame(response.OPT2_Orders);
  var OUT1_Total = new dfd.DataFrame(response.OUT1_Total);
  var OUT2_Orders = new dfd.DataFrame(response.OUT2_Orders);
  var OUT3_Tours = new dfd.DataFrame(response.OUT3_Tours);
  var OUT4_Transp = new dfd.DataFrame(response.OUT4_Transp);

  downloadCSV(IN1_Orders, "IN1_Orders");
  downloadCSV(IN2_Hubs, "IN2_Hubs");
  downloadCSV(IN3_TranspTypes, "IN3_TranspTypes");
  downloadCSV(OPT1_Tours, "OPT1_Tours");
  downloadCSV(IN4_Transp, "IN4_Transp");
  downloadCSV(OPT2_Orders, "OPT2_Orders");
  downloadCSV(OUT1_Total, "OUT1_Total");
  downloadCSV(OUT2_Orders, "OUT2_Orders");
  downloadCSV(OUT3_Tours, "OUT3_Tours");
  downloadCSV(OUT4_Transp, "OUT4_Transp");
  //Creo una tabla Fusionando todas la informacion de Inputs de las Ordenes y la parte de las rutas
  //##############################################################################################
  let FUSION_IN1_ORDERS_OTP2_ORDERS = dfd.merge({
    left: OPT2_Orders,
    right: IN1_Orders,
    on: ["order_id"],
    how: "right",
  });
  // FUSION_IN1_ORDERS_OTP2_ORDERS.print();
  FUSION_IN1_ORDERS_OTP2_ORDERS.asType("order_position", "int32", {
    inplace: true,
  });
  FUSION_IN1_ORDERS_OTP2_ORDERS.asType("order_idtour", "int32", {
    inplace: true,
  });
  FUSION_IN1_ORDERS_OTP2_ORDERS.sortValues("order_position", {
    ascending: true,
    inplace: true,
  });
  FUSION_IN1_ORDERS_OTP2_ORDERS.sortValues("order_idtour", {
    ascending: true,
    inplace: true,
  });
  FUSION_IN1_ORDERS_OTP2_ORDERS.resetIndex({ inplace: true });
  // FUSION_IN1_ORDERS_OTP2_ORDERS.print();

  // Elimino de los transportes aquellos que están a 0 km recorridos
  //###############################################################################################
  // Fusiono las tablas relacionadas con los vehículos:
  var FUSION_IN4_TRANSP_OUT4_TRANSP = dfd.merge({
    left: OUT4_Transp,
    right: IN3_TranspTypes,
    on: ["transptype_id"],
    how: "left",
  });
  FUSION_IN4_TRANSP_OUT4_TRANSP.print();
  FUSION_IN4_TRANSP_OUT4_TRANSP = FUSION_IN4_TRANSP_OUT4_TRANSP.query(
    FUSION_IN4_TRANSP_OUT4_TRANSP["transp_distance_km"].gt(0)
  );

  FUSION_IN4_TRANSP_OUT4_TRANSP.tail(10).print();

  FUSION_IN4_TRANSP_OUT4_TRANSP.print();
  var df_new = FUSION_IN4_TRANSP_OUT4_TRANSP[
    "transp_avgfillrate_percentage"
  ].mul(FUSION_IN4_TRANSP_OUT4_TRANSP["transptype_capacityweight"]);

  var VECTORES_CAPACIDAD_UTILIZADOS = df_new.mul(0.01);
  VECTORES_CAPACIDAD_UTILIZADOS.print();

  var TOTAL_CAPACIDAD_UTILIZADA = df_new.mul(0.01).sum({ axis: 1 });
  // VECTORES_CAPACIDAD_UTILIZADOS.div(TOTAL_CAPACIDAD_UTILIZADA, {
  //   inplace: true,
  // });

  console.log(
    "TOTAL_CAPACIDAD_UTILIZADA: " +
      redondear_numero(TOTAL_CAPACIDAD_UTILIZADA, 3)
  );

  VECTORES_CAPACIDAD_UTILIZADOS.mul(100, {
    inplace: true,
  });
  VECTORES_CAPACIDAD_UTILIZADOS.div(
    FUSION_IN4_TRANSP_OUT4_TRANSP["transptype_capacityweight"],
    {
      inplace: true,
    }
  );

  console.log(
    "VECTORES_CAPACIDAD_UTILIZADOS: " + VECTORES_CAPACIDAD_UTILIZADOS
  );

  return "";
}

export function downloadCSV(
  DataFrame_to_download,
  nombre_csv_file_to_be_downloaded
) {
  return dfd.toJSON(DataFrame_to_download, {
    fileName: nombre_csv_file_to_be_downloaded,
    download: true,
  }); //downloads the file in browser version
}
