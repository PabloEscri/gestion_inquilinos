import React, { useState, useEffect, useCallback } from "react";

import { obtenerListaInmuebles } from "../../../../api/inmueble";

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
  Radio,
  Space,
} from "antd";
import { useDropzone } from "react-dropzone";
import moment from "moment";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {
  updateInquilinoApi,
  uploadAvatarApi,
  getAvatarApi,
} from "../../../../api/inquilino";
import { getAccessTokenApi } from "../../../../api/auth";
import "./EditInquilinoForm.scss";

export default function EditInquilinoForm(props) {
  const { user, setIsVisibleModal, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});
  console.log("EditUserForm");
  console.log(user.fecha_entrada, user.fecha_salida);
  useEffect(() => {
    setUserData({
      name: user.name,
      telefono: user.telefono,
      email: user.email,
      inmueble: user.inmueble,
      role: user.role,
      avatar: user.avatar,
      fecha_entrada: user.fecha_entrada,
      fecha_salida: user.fecha_salida,
      tipo_inquilino: user.tipo_inquilino,
      pago: user.pago,
      plataforma: user.plataforma,
      forma_pago: user.forma_pago,
      comision: user.comision,
      pago_limpieza: user.pago_limpieza,
    });
  }, [user]);

  // useEffect(() => {
  //   if (user.avatar) {
  //     getAvatarApi(user.avatar).then((response) => {
  //       setAvatar(response);
  //     });
  //   } else {
  //     setAvatar(null);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (avatar) {
  //     setUserData({ ...userData, avatar: avatar.file });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [avatar]);

  const updateUser = (e) => {
    console.log("updateUser");

    const token = getAccessTokenApi();
    let userUpdate = userData;

    if (
      !userUpdate.name ||
      !userUpdate.telefono ||
      !userUpdate.email ||
      !userUpdate.inmueble ||
      !userUpdate.fecha_entrada ||
      !userUpdate.fecha_salida
    ) {
      notification["error"]({
        message: "El nombre, apellidos y email son obligatorios.",
      });
      //setReloadUsers(true);
      return;
    }

    console.log("updateUserApi");
    updateInquilinoApi(token, userUpdate, user._id).then((response) => {
      notification["success"]({
        message: "Actualizado",
      });
      console.log("setReloadUsers return");
      setIsVisibleModal(false);
      setReloadUsers(true);
    });
    // }
  };

  return (
    <div className="edit-user-form">
      {/* <UploadAvatar avatar={avatar} setAvatar={setAvatar} /> */}
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser, setReloadUsers } = props;
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [value, setValue] = useState(1);
  const onChange = (dates) => {
    setUserData({
      ...userData,
      fecha_entrada: dates[0].format("YYYY-MM-DD"),

      fecha_salida: dates[1].format("YYYY-MM-DD"),
    });
    setReloadUsers(true);
  };
  const [num_tours_v, set_num_tours_v] = useState([]);
  useEffect(() => {
    let token_KEYROCK = "";
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
    <Form className="form-edit" onFinish={updateUser}>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="Date Range">
            {moment(userData.fecha_entrada, "YYYY-MM-DD").isValid() ? (
              <RangePicker
                renderExtraFooter={() => "extra footer"}
                showTime
                onChange={onChange}
                value={[
                  moment(userData.fecha_entrada, "YYYY-MM-DD"),
                  moment(userData.fecha_salida, "YYYY-MM-DD"),
                ]}
              />
            ) : (
              <></>
            )}
          </Form.Item>
        </Col>
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
              //  prefix={<Icon type="lock" />}
              type="password"
              placeholder="Contraseña"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //  prefix={<Icon type="lock" />}
              type="password"
              placeholder="Repetir contraseña"
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row> */}
      <Divider>Reserva</Divider>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Plataforma"
              onChange={(e) => setUserData({ ...userData, plataforma: e })}
              value={userData.plataforma}
            >
              <Option value="Airbnb">Airbnb</Option>
              <Option value="Booking">Booking</Option>
              <Option value="Vrbo">Vrbo</Option>
              <Option value="Web">Web</Option>
              <Option value="Referido">Referido</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="pago"
              value={userData.pago}
              onChange={(e) =>
                setUserData({ ...userData, pago: e.target.value })
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
              placeholder="comision"
              value={userData.comision}
              onChange={(e) =>
                setUserData({ ...userData, comision: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              //prefix={<Icon type="mail" />}
              placeholder="Pago limpieza"
              value={userData.pago_limpieza}
              onChange={(e) =>
                setUserData({ ...userData, pago_limpieza: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Select
              placeholder="Forma pago"
              onChange={(e) => setUserData({ ...userData, forma_pago: e })}
              value={userData.forma_pago}
            >
              <Option value="Plataforma">Plataforma</Option>
              <Option value="Transferencia">Transferencia</Option>
              <Option value="Mano">Pago en mano</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Divider>Tipo de cliente</Divider>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Radio.Group
              onChange={(e) => {
                setUserData({ ...userData, tipo_inquilino: e.target.value });
                setValue(e.target.value);
              }}
              value={userData.tipo_inquilino}
            >
              <Space direction="horizontal">
                <Radio value={"Turista"}>Turista</Radio>
                <Radio value={"Trabajador"}>Trabajador</Radio>
                <Radio value={"Propietario"}>Propietario</Radio>
                <Radio value={"Limpiador"}>Limpiador</Radio>
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
          Actualizar Inquilino
        </Button>
      </Form.Item>
    </Form>
  );
}
