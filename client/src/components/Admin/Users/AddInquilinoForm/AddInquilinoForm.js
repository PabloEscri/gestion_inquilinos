import React, { useState, useEffect } from "react";

import { createInquilino } from "../../../../api/inquilino";

import { obtenerListaInmuebles } from "../../../../api/inmueble";
import { getAccessTokenApi } from "../../../../api/auth";
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

import {
  BorderBottomOutlined,
  BorderTopOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import "./AddInquilinoForm.scss";
import moment from "moment";

export default function EditInquilinoForm(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [userData, setUserData] = useState({});
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
      !userData.name ||
      !userData.inmueble ||
      !userData.email ||
      !userData.fecha_entrada ||
      !userData.telefono ||
      !userData.fecha_salida ||
      !userData.tipo_inquilino
    ) {
      console.log("creando1");
      console.log(userData);
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else if (userData.password !== userData.repeatPassword) {
      console.log("creando2");
      notification["error"]({
        message: "Las contraseñas tienen que ser iguale.",
      });
    } else {
      console.log("creando3");
      const accesToken = getAccessTokenApi();
      console.log(userData);
      createInquilino(accesToken, userData)
        .then((response) => {
          console.log("Responde: ", response);
          setUserData({});
          console.log("userdata: ", userData);

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
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    </div>
  );
}

function AddForm(props) {
  const { userData, setUserData, addUser } = props;
  const { Option } = Select;
  const [num_tours_v, set_num_tours_v] = useState([]);
  console.log("OOLLLOOOPPPSPAPAOSPAOS");
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
  const { RangePicker } = DatePicker;
  const [value, setValue] = useState(1);

  return (
    <Form className="form-add" onFinish={addUser}>
      <Divider>Fecha de entrada</Divider>
      <Row gutter={24}>
        <Form.Item label="Date Range">
          <RangePicker
            renderExtraFooter={() => "extra footer"}
            showTime
            onChange={(dates) => {
              console.log("onChange");
              console.log(dates[0]);
              console.log(dates[1]);
              setUserData({
                ...userData,
                fecha_entrada: dates[0].format("MM/DD/YYYY"),
                fecha_salida: dates[1].format("MM/DD/YYYY"),
              });
            }}
          />
        </Form.Item>
        <Divider>Sobre el inquilino</Divider>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="user" />}
              placeholder="Nombre y apellidos Inquilino"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="user" />}
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="Telefono"
              value={userData.telefono}
              onChange={(e) =>
                setUserData({ ...userData, telefono: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Seleciona un inmueble"
              onChange={(e) => setUserData({ ...userData, inmueble: e })}
              value={userData.inmueble}
            >
              {num_tours_v}
              {/* <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviwer">Revisor</Option> */}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="lock" />}
              type="password"
              placeholder="Contraseña"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="lock" />}
              type="password"
              placeholder="Repetir contraseña"
              value={userData.repeatPassword}
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row> */}
      <Divider>Tipo de cliente</Divider>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Radio.Group
              onChange={(e) => {
                setUserData({ ...userData, tipo_inquilino: e.target.value });
                setValue(e.target.value);
              }}
              value={value}
            >
              <Space direction="horizontal">
                <Radio value={"Turista"}>Turista</Radio>
                <Radio value={"Trabajador"}>Trabajador</Radio>
                <Radio value={""}>
                  Otro More...
                  {value === "" ? (
                    <Input
                      value={userData.tipo_inquilino}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          tipo_inquilino: e.target.value,
                        })
                      }
                      style={{ width: 100, marginLeft: 10 }}
                    />
                  ) : null}
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Divider></Divider>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Inquilino
        </Button>
      </Form.Item>
    </Form>
  );
}
