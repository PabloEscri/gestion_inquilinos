import React, { useState } from "react";

import { createInmueble } from "../../../../../api/inmueble";
import { getAccessTokenApi } from "../../../../../api/auth";
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
  Divider,
} from "antd";

import {
  BorderBottomOutlined,
  BorderTopOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import "./AddInmuebleForm.scss";
import moment from "moment";

export default function EditInmuebleForm(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [InmuebleData, setInmuebleData] = useState({});
  const openNotification = () => {
    console.log("Abierto");
    notification.open({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const addUser = (event) => {
    console.log("creando");

    if (
      !InmuebleData.name ||
      !InmuebleData.owner ||
      !InmuebleData.shelly_abrir_puerta_ID ||
      !InmuebleData.shelly_temperatura_ID ||
      !InmuebleData.shelly_potencia_ID ||
      !InmuebleData.wifi_ssid ||
      !InmuebleData.wifi_pass ||
      !InmuebleData.router_user ||
      !InmuebleData.telefono ||
      !InmuebleData.router_pass
    ) {
      console.log("creando1");
      console.log(InmuebleData);
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else {
      console.log("creando3");
      const accesToken = getAccessTokenApi();
      console.log(InmuebleData);
      createInmueble(accesToken, InmuebleData)
        .then((response) => {
          console.log("Responde: ", response);
          setInmuebleData({});
          console.log("InmuebleData: ", InmuebleData);

          setIsVisibleModal(false);
          setReloadUsers(true);
          openNotification();
        })
        .catch((err) => {
          notification["error"]({
            message: err,
          });
        });
    }
  };

  return (
    <div className="add-user-form">
      <AddForm
        InmuebleData={InmuebleData}
        setInmuebleData={setInmuebleData}
        addUser={addUser}
      />
    </div>
  );
}

function AddForm(props) {
  const { InmuebleData, setInmuebleData, addUser } = props;
  const { Option } = Select;

  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
  return (
    <Form className="form-add" onFinish={addUser}>
      <Divider>Datos del piso</Divider>
      <Row gutter={24}>
        <Form.Item label="Incio gestion">
          <RangePicker
            renderExtraFooter={() => "extra footer"}
            showTime
            onChange={(dates) => {
              console.log("onChange");
              console.log(dates[0]);
              console.log(dates[1]);
              setInmuebleData({
                ...InmuebleData,
                fecha_inicio_gestion: dates[0].format("MM/DD/YYYY"),
                fecha_fin_gestion: dates[1].format("MM/DD/YYYY"),
              });
            }}
          />
        </Form.Item>
      </Row>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Nombre Inmueble
        </Col>

        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="Nombre Inmueble"
              value={InmuebleData.name}
              onChange={(e) =>
                setInmuebleData({ ...InmuebleData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Telefono
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="Telefono propietario"
              value={InmuebleData.telefono}
              onChange={(e) =>
                setInmuebleData({ ...InmuebleData, telefono: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Propietario Nombre
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="Dueño"
              value={InmuebleData.owner}
              onChange={(e) =>
                setInmuebleData({ ...InmuebleData, owner: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider>Limpiezas</Divider>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Nombre de limpiador@
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="Nombre del limpiador@"
              value={InmuebleData.limpiador_nombre}
              onChange={(e) =>
                setInmuebleData({
                  ...InmuebleData,
                  limpiador_nombre: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Telefono de limpiador
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="Telefono del limpiador"
              value={InmuebleData.limpiador_telefono}
              onChange={(e) =>
                setInmuebleData({
                  ...InmuebleData,
                  limpiador_telefono: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider>WIFI</Divider>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Wifi SSID
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="Wifi SSID"
              value={InmuebleData.wifi_ssid}
              onChange={(e) =>
                setInmuebleData({ ...InmuebleData, wifi_ssid: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Wifi Pass
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="Wifi Pass"
              value={InmuebleData.wifi_pass}
              onChange={(e) =>
                setInmuebleData({ ...InmuebleData, wifi_pass: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Router user
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="Router user"
              value={InmuebleData.router_user}
              onChange={(e) =>
                setInmuebleData({
                  ...InmuebleData,
                  router_user: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Router pass
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="Router pass"
              value={InmuebleData.router_pass}
              onChange={(e) =>
                setInmuebleData({
                  ...InmuebleData,
                  router_pass: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider>Electronica</Divider>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          ID portal
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="ID portal"
              value={InmuebleData.shelly_abrir_puerta_ID}
              onChange={(e) =>
                setInmuebleData({
                  ...InmuebleData,
                  shelly_abrir_puerta_ID: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          ID temperatura
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="ID  temperatura"
              value={InmuebleData.shelly_temperatura_ID}
              onChange={(e) =>
                setInmuebleData({
                  ...InmuebleData,
                  shelly_temperatura_ID: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          ID temperatura
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="ID potencia"
              value={InmuebleData.shelly_potencia_ID}
              onChange={(e) =>
                setInmuebleData({
                  ...InmuebleData,
                  shelly_potencia_ID: e.target.value,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider>Piso y sus alrededores</Divider>
      <TextArea
        rows={4}
        placeholder="Describe el piso y sus alrededores en 1000 caracteres"
        maxLength={1000}
        value={InmuebleData.description}
        onChange={(e) =>
          setInmuebleData({
            ...InmuebleData,
            description: e.target.value,
          })
        }
      />

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Inmueble
        </Button>
      </Form.Item>
    </Form>
  );
}
