import React, { useState, useEffect } from "react";
import {/*  Line, Pie, */ Column } from "@ant-design/charts";
import { Tabs, /* Progress, */ Card, Col, Row,/*  Space  */} from "antd";
// import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
// import * as dfd from "danfojs";

import { datos_table_Hubs,/*  pandas, */ redondear_numero } from "./analisis_data";
// import ReactDOM from "react-dom";
// import { Heatmap } from "@ant-design/plots";
import "./Graph.scss";
import { getExcelFromID, getExcelFromIDProcessed, getExcelQuentin } from "../../../api/graphExcel";
import { getAccessTokenApi } from "../../../api/auth";
import TablePlot from "../../../components/Admin/Graphs/Table";
import Map_puntos from "../../../components/Admin/Map_puntos";
import Map_polilineas from "../../../components/Admin/Map_polilineas";
import ProgressBar from "../../../components/Admin/Graphs/Progress";
//Los ejemplos se encuentran aquí --->  https://charts.ant.design/en/examples/gallery
import { Table } from "antd";

export default function Graph(props) {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let code = params.get("id");
  var id_excel = code.split(".")[0];
  const [OUT3_Tours, setOUT3_Tours] = useState([]);
  const [OUT4_Transp2, setOUT4_Transp2] = useState([]);

  //Col and data for IN_HUB
  const [data3, setdata3] = useState([]);
  const [col3, setcol3] = useState([]);
  const [puntosHUBS, setpuntosHUBS] = useState([]);
  //Col and data for IN_ORDERS
  const [data4, setdata4] = useState([]);
  const [col4, setcol4] = useState([]);
  //Col and data for IN_ORDERS
  const [data_IN3_TRANSPTYPES, setdata_IN3_TRANSPTYPES] = useState([]);
  const [col_IN3_TRANSPTYPES, setcol_IN3_TRANSPTYPES] = useState([]);

  const [data_OPT1_TOURS, setdata_OPT1_TOURS] = useState([]);
  const [col_OPT1_TOURS, setcol_OPT1_TOURS] = useState([]);

  const [data_OUT1_TOTAL, setdata_OUT1_TOTAL] = useState([]);
  const [col_OUT1_TOTAL, setcol_OUT1_TOTAL] = useState([]);
  const [puntos, setpuntos] = useState([]);

  const [data_MAX_FLEET_INFO, setdata_MAX_FLEET_INFO] = useState({});
  const [ data_OUT4_Transp,  setdata_OUT4_Transp] = useState([]);

  const [ num_tours,  setnum_tours] = useState([]);
  const token = getAccessTokenApi(); //Authorization token

  const [csv,  setcsv ] = useState([]);

  const [ quentin, setquentin] = useState({});
  const [quentincontenedores, setquentincontenedores] = useState([]);
  const [quentinvehiculos, setquentinvehiculos] = useState([]);

  const [quentindemand, setquentinquentindemand] = useState([]);
  const [hub_capacity_JSON, sethub_capacity_JSON] = useState([]);

  const [tours_capacity_JSON, settours_capacity_JSON] = useState([]);

  const [avarage_fill_rate, setavarage_fill_rate] = useState(['0.0']);
  const [capacity_total_used, setcapacity_total_used] = useState(['0.0']);
  const [percentage_of_use, setpercentage_of_use] = useState(['0.0']);
  //UNIQUE
  // app.js

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };


  /* function quentin_variable(array) {
    var contenedores = [];
    return contenedores;
  } */

  useEffect( () =>  {
    const token = getAccessTokenApi();
    var DATA ;
    getExcelFromID(token, id_excel).then((response) => {
       DATA = response.DATA;
       getExcelQuentin(DATA,token).then((response) => {
        console.log(response);
        setquentin(response);
  
        var contenedores = [];
        contenedores.push(
          <h1 className="titulos3">{response.summary.vehiculos.title}</h1>
        );
        response.summary.vehiculos.variable_veh.forEach((element) => {
          console.log(element.nombre);
          if (element.variable) {
            contenedores.push(
              <Card title={element.nombre}>
                <p>{response.summary.vehiculos.interpretacion}</p>
              </Card>
            );
          } else {
            contenedores.push(
              <Card title={element.nombre}>
                <p>{"Everything is okey!"}</p>
              </Card>
            );
          }
        });
        setquentinvehiculos(contenedores);
  
        contenedores = [];
        contenedores.push(
          <h1 className="titulos3">{response.summary.demandaoferta.title}</h1>
        );
        if (response.summary.demandaoferta.variable) {
          contenedores.push(
            <Card title={response.summary.demandaoferta.title}>
              <p>{response.summary.demandaoferta.interpretacion}</p>
            </Card>
          );
        } else {
          contenedores.push(
            <Card title={response.summary.demandaoferta.title}>
              <p>{"Everything is okey!"}</p>
            </Card>
          );
        }
        setquentinquentindemand(contenedores);
  
        contenedores = [];
        contenedores.push(
          <h1 className="titulos3">{response.summary.hub.title}</h1>
        );
        response.summary.hub.variable_hub.forEach((element) => {
          if (element.variable) {
            contenedores.push(
              <Card title={element.nombre}>
                <p>{response.summary.hub.interpretacion}</p>
              </Card>
            );
          } else {
            contenedores.push(
              <Card title={element.nombre}>
                <p>{"Everything is okey!"}</p>
              </Card>
            );
          }
        });
        setquentincontenedores(contenedores);
  
        //TABLAS HUBS QUENTIN
        sethub_capacity_JSON(response.hubs);
        //TABLAS HUBS QUENTIN
        settours_capacity_JSON(response.tours);

        console.log(response,'llegue')
        setavarage_fill_rate(response.percentages.avg_fill);
        setcapacity_total_used(response.percentages.total_capacity_used);
        setpercentage_of_use(response.percentages.vol_horario_veh);

      });

      getExcelFromIDProcessed(token, id_excel).then((response) => {
        setOUT3_Tours(response.DATA.OUT3_Tours);
        setOUT4_Transp2(response.DATA.OUT4_Transp2);
  
        //HUBS
        var col = [];
        var puntos_hubs = [];
        // var datos_col = datos_table_Hubs(response.DATA.IN_HUB);
        setdata3(response.DATA.IN_HUB);
        Object.keys(response.DATA.IN_HUB[0]).map(function (x) {
          col.push({ title: x, dataIndex: x, key: x });
        });
        setcol3(col);
        col = [];
        response.DATA.IN_HUB.map(function (x) {
          puntos_hubs.push({
            punto: [x.hub_lat, x.hub_lon],
            nombre: x.hub_name,
          });
        });
        /* 
        POR SI QUIERES PINTAR PUNTOS
        var CENTROIDE = [
          [50.8345907433414, 4.36285154826473, 2021.0],
          [50.83666954552665, 4.357410802506346, 2021.0],
          [50.83477129978337, 4.360785781786369, 2021.0],
        ]; */
       /*  CENTROIDE.map(function (x) {
          puntos_hubs.push({
            punto: [x[0], x[1]],
            nombre: "Centroide" + x[0],
            color: "rojo",
          });
        }); */
  
        //ORDERS
        var puntos2 = [];
        var tours = [];
        setdata4(response.DATA.IN_ORDERS);
  
        response.DATA.IN_ORDERS.map(function (x) {
          puntos2.push({
            punto: [x.order_lat, x.order_lon],
            nombre: x.order_id,
            tour_info: x.order_tour_info,
            color: "yellow",
            order_mode:x.order_mode
          });
          tours.push(x.order_tour_info.order_tour);
        });
        
        setnum_tours(tours);
        //puntos_hubs = puntos_hubs.concat(puntos2);
        setpuntosHUBS(puntos_hubs);
  
        //const tours = [26, 27, 26, 26, 28, 28, 29, 29, 30];
        // const uniqueTours = tours.filter(unique);
  
        puntos2.sort(function (a, b) {
          if (a.tour_info.order_tour > b.tour_info.order_tour) {
            return 1;
          } else if (a.tour_info.order_tour < b.tour_info.order_tour) {
            return -1;
          } else {
            if (a.tour_info.order_pos < b.tour_info.order_pos) {
              return -1;
            } else if (a.tour_info.order_tour > b.tour_info.order_tour) {
              return 1;
            } else {
              return 0;
            }
          }
        });
        setpuntos(puntos2);
  
        Object.keys(response.DATA.IN_ORDERS[0]).map(function (x) {
          col.push({ title: x, dataIndex: x, key: x });
        });
        setcol4(col);
        col = [];
        //TRANSP_TYPES
        setdata_IN3_TRANSPTYPES(response.DATA.IN3_TRANSPTYPES);
        Object.keys(response.DATA.IN3_TRANSPTYPES[0]).map(function (x) {
          col.push({ title: x, dataIndex: x, key: x });
        });
        setcol_IN3_TRANSPTYPES(col);
        col = [];
        //MAX_FLEET_INFO
        setdata_MAX_FLEET_INFO(response.DATA.MAX_FLEET_INFO);
  
        //TRANSP_TYPES
        setdata_OPT1_TOURS(response.DATA.OPT1_TOURS);
        Object.keys(response.DATA.OPT1_TOURS[0]).map(function (x) {
          col.push({ title: x, dataIndex: x, key: x });
        });
        setcol_OPT1_TOURS(col);
        col = [];
  
        //OUT4_Transp
        setdata_OUT4_Transp(response.DATA.OUT4_Transp);
  
        //OUT1_TOTAL
        setdata_OUT1_TOTAL(response.DATA.OUT1_TOTAL);
        Object.keys(response.DATA.OUT1_TOTAL[0]).map(function (x) {
          col.push({ title: x, dataIndex: x, key: x });
        });
        setcol_OUT1_TOTAL(col);
        col = [];
        
        
      });
    });
    
  }, []); //Solo se refresca si cambian estos

  var config1 = {
    data: OUT3_Tours,
    isGroup: true,
    // xField: "月份",
    // yField: "月均降雨量",
    xField: "type",
    yField: "value",
    seriesField: "name", //Cada uno de los colores
    label: {
      position: "top",
      layout: [
        { type: "interval-adjust-position" },
        { type: "interval-hide-overlap" },
        { type: "adjust-color" },
      ],
    },
  };

  var config2 = {
    data: OUT4_Transp2,
    isGroup: true,
    // xField: "月份",
    // yField: "月均降雨量",
    xField: "type",
    yField: "value",
    seriesField: "name", //Cada uno de los colores
    label: {
      position: "top",
      layout: [
        { type: "interval-adjust-position" },
        { type: "interval-hide-overlap" },
        { type: "adjust-color" },
      ],
    },
  };

  return (
    <>
      <div className="site-card-wrapper">
        <span>{csv}</span>

        <Tabs defaultActiveKey="1" onChange={() => {}}>
          <Tabs.TabPane tab="Performance" key="Performance">
            <h1 className="titulos3">OPERATIONAL PERFORMANCE OF THE FLEET</h1>
            <Card title="Info of vehicles: " bordered={false}>
              <Row justify="center" gutter={16}>
                <Col span={4}>
                  <div>
                    <p>
                      Fleet_max_weight: {data_MAX_FLEET_INFO.fleet_max_weight}{" "}
                      kg
                    </p>
                    <p>
                      Fleet_used_weight: {data_MAX_FLEET_INFO.fleet_used_weight}{" "}
                      kg
                    </p>
                  </div>
                </Col>
                <Col span={4}>
                  <ProgressBar
                    percentage={data_MAX_FLEET_INFO.fleet_performance}
                  />
                </Col>
                <Col span={4}>
                  <div>
                    <p>
                      Fleet_max_weight: {data_MAX_FLEET_INFO.fleet_max_weight}{" "}
                      kg
                    </p>
                    <p>
                      Fleet_max_capacity:{" "}
                      {data_MAX_FLEET_INFO.fleet_max_capacity} kg
                    </p>
                  </div>
                </Col>

                <Col span={4}>
                  <ProgressBar
                    percentage={redondear_numero(
                      (data_MAX_FLEET_INFO.fleet_max_capacity * 100) /
                        data_MAX_FLEET_INFO.fleet_max_weight,
                      1
                    )}
                  />
                </Col>

                <Col span={4}>
                  <div>
                    <p>
                      Fleet_used_weight: {data_MAX_FLEET_INFO.fleet_used_weight}{" "}
                      kg
                    </p>
                    <p>
                      Fleet_max_capacity:{" "}
                      {data_MAX_FLEET_INFO.fleet_max_capacity} kg
                    </p>
                  </div>
                </Col>

                <Col span={4}>
                  <ProgressBar
                    percentage={redondear_numero(
                      (data_MAX_FLEET_INFO.fleet_used_weight * 100) /
                        data_MAX_FLEET_INFO.fleet_max_capacity,
                      1
                    )}
                  />
                </Col>
                <Col span={8}></Col>
              </Row>
              <br></br>
              <Row justify="center" gutter={16}>
                <Col span={4}>
                  <div>Average fill rate of the used vehicles</div>
                </Col>
                <Col span={4}>
                  <ProgressBar percentage={avarage_fill_rate} />
                </Col>
                <Col span={4}>
                  <div>Capacity total used</div>
                </Col>
                <Col span={4}>
                  <ProgressBar percentage={capacity_total_used} />
                </Col>
                <Col span={4}>
                  <div>Percentage oof use of the vehicles (in time)</div>
                </Col>
                <Col span={4}>
                  <ProgressBar percentage={percentage_of_use} />
                </Col>
              </Row>
            </Card>
            <br></br>

            <Row>
              <Col span={24}>
                <h1 className="titulos3">
                  ENVIROMENTAL AND FINANCIAL PERFORMANCE OF THE FLEET
                </h1>
                <Card title="Performance: " bordered={false}>
                  <TablePlot data={data_OUT1_TOTAL} columns={col_OUT1_TOTAL} />
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Orders" key="Orders">
            <Col span={24}>
              <h1 className="titulos">ORDERS INPUT DATA</h1>
              <TablePlot data={data4} columns={col4} />
            </Col>
            <Row>
              <Col span={24}>
                <h1 className="titulos">ORDERS INPUT LOCATION</h1>
                <Map_puntos coordenadas={puntos} />
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Hubs" key="Hubs">
            <Row justify="center" gutter={16}>
              <Col span={12}>
                <h1 className="titulos">HUBS INPUT DATA</h1>
                <TablePlot data={data3} columns={col3} />
              </Col>
              <Col span={12}>
                <h1 className="titulos">HUBS VEHICLES DISTRIBUTION</h1>
                <Table
                  dataSource={hub_capacity_JSON.data_hub}
                  columns={hub_capacity_JSON.columns_hub}
                />
              </Col>
            </Row>
            <Row justify="center" gutter={16}>
              <Col span={24}>
                <h1 className="titulos">HUBS LOCATION</h1>
                <Card title="Hubs locations: " bordered={false}>
                  <Map_puntos coordenadas={puntosHUBS} />
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tours" key="Tours">
            <Row justify="center" gutter={16}>
              <Col span={16}>
                <h1 className="titulos2">TOURS PERFORMANCE</h1>
                <Card title="Info of tours: " bordered={false}>
                  <Column {...config1} />
                </Card>
              </Col>
              <Col span={8}>
                <h1 className="titulos2">TOURS GENERATED</h1>
                <TablePlot data={data_OPT1_TOURS} columns={col_OPT1_TOURS} />
              </Col>
            </Row>
            <br></br>
            <Row justify="center" gutter={16}>
              <Col span={24}>
                <h1 className="titulos2">TOURS_OUTPUT</h1>
                <TablePlot
                  data={tours_capacity_JSON.data_tours}
                  columns={tours_capacity_JSON.columns_tours}
                />
              </Col>
            </Row>
            <Row justify="center" gutter={16}>
              <Col justify="center" span={24}>
                <h1 className="titulos2">TOURS_PLOTED</h1>
                <Card title="Tours: " bordered={false}>
                  <Map_polilineas coordenadas={puntos} num_tours2={5} hubs={puntosHUBS}/>
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Vehicles" key="Vehicles">
            <Row justify="center" gutter={16}>
              <Col span={24}>
                <h1 className="titulos">INPUT DATA OF THE VEHICLES</h1>
                <TablePlot
                  data={data_IN3_TRANSPTYPES}
                  columns={col_IN3_TRANSPTYPES}
                />
              </Col>
            </Row>
            <Row justify="center" gutter={16}>
              <Col span={24}>
                <h1 className="titulos2">PERFORMANCE OF THE VEHICLES</h1>
                <Card title="Info of vehicles: " bordered={false}>
                  <Column {...config2} />
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Summary" key="Summary">
            <Row justify="center" gutter={16}>
              <Col span={8}>{quentincontenedores}</Col>
              <Col span={8}>{quentinvehiculos}</Col>
              <Col span={8}>{quentindemand}</Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
}
