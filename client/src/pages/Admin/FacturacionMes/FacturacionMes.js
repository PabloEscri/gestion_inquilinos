import React, { useState, useEffect } from "react";

import { obtenerListaInmuebles } from "../../../api/inmueble";
import TablePlot from "../../../components/Admin/Graphs/Table";
import "antd/dist/antd.css";
import {
  Avatar,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification,
  DatePicker,
  Radio,
  Space,
  Divider,
} from "antd";
import { getFacturacion } from "../../../api/facturacion";

const { Option } = Select;

function onChange(date, dateString) {
  console.log(date, dateString);
}

export default function FacturacionMes() {
  const [num_tours_v, set_num_tours_v] = useState([]);
  const [inmuebleSelected, setInmuebleSelected] = useState("");
  const [datosFacturacion, setDatosFacturacion] = useState([]);

  const [columnasFacturacion, setColumnasFacturacion] = useState([]);
  useEffect(() => {
    let token_KEYROCK = "";
    console.log("OOLLLOOOPPPSPAPAOSPAOS");
    obtenerListaInmuebles(token_KEYROCK).then((response) => {
      console.log(response.Pisos[0].id);
      var num_tours_v2 = [];
      console.log("1");
      console.log("LONGITUD", response.Pisos.length);
      for (let i = 0; i < response.Pisos.length; i++) {
        console.log("1.1");
        console.log(response.Pisos[i]);
        num_tours_v2.push(
          <Option value={response.Pisos[i].id}>
            {response.Pisos[i].nombre}
          </Option>
        );
      }
      set_num_tours_v(num_tours_v2);
    });
  }, []);
  return (
    <div style={{ padding: "50px" }}>
      <Row gutter={24}>
        <Col span={8}>
          <Select
            onChange={(e) => {
              setInmuebleSelected(e);
              console.log(inmuebleSelected);
            }}
            placeholder={"Selecciona un inmueble"}
          >
            {num_tours_v}
          </Select>
        </Col>
        <Col span={8}>
          <DatePicker onChange={onChange} picker="month" />
        </Col>
        <Col span={8}>
          <Button
            onClick={() => {
              getFacturacion("", inmuebleSelected).then((response) => {
                console.log("getFacturacion", response);

                setDatosFacturacion(response.users);
                let col = [];

                Object.keys(response.users[response.users.length - 1]).map(
                  function (x) {
                    col.push({ title: x, dataIndex: x, key: x });
                  }
                );
                setColumnasFacturacion(col);
              });
            }}
          >
            {" "}
            Buscar
          </Button>
        </Col>
      </Row>
      <Row gutter={24}>
        {datosFacturacion !== [] ? (
          <TablePlot
            data={datosFacturacion}
            columns={columnasFacturacion}
          ></TablePlot>
        ) : (
          <></>
        )}
      </Row>
    </div>
  );
}
