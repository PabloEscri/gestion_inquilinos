import React, { useState } from "react";

import { createInquilino } from "../../../../../api/inquilino";
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
      !userData.lastname ||
      !userData.role ||
      !userData.email ||
      !userData.password ||
      !userData.fecha_entrada ||
      !userData.fecha_salida
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

  const { RangePicker } = DatePicker;
  return (
    <Form className="form-add" onFinish={addUser}>
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
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="user" />}
              placeholder="Nombre Inquilino"
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
              placeholder="Apellidos"
              value={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
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
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecióna un rol"
              onChange={(e) => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviwer">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
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
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
