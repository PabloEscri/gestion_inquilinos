import React, { useState, useEffect, useCallback } from "react";
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
import { useDropzone } from "react-dropzone";

import { updateInmuebleApi } from "../../../../../api/inmueble";

import moment from "moment";
import NoAvatar from "../../../../../assets/img/png/no-avatar.png";
import {
  updateUserApi,
  uploadAvatarApi,
  getAvatarApi,
} from "../../../../../api/user";
import { getAccessTokenApi } from "../../../../../api/auth";
import "./EditInmuebleForm.scss";

export default function EditInmuebleForm(props) {
  const { user, setIsVisibleModal, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});
  console.log("EditUserForm");
  console.log(user.fecha_entrada, user.fecha_salida);
  useEffect(() => {
    setUserData({
      name: user.name,
      telefono: user.telefono,
      owner: user.owner,
      shelly_abrir_puerta_ID: user.shelly_abrir_puerta_ID,
      shelly_temperatura_ID: user.shelly_temperatura_ID,
      shelly_potencia_ID: user.shelly_potencia_ID,
      fecha_entrada: user.fecha_entrada,
      fecha_salida: user.fecha_salida,
      wifi_ssid: user.wifi_ssid,
      wifi_pass: user.wifi_pass,
      router_user: user.router_user,
      router_pass: user.router_pass,
      description: user.description,
      limpiador_telefono: user.limpiador_telefono,
      limpiador_nombre: user.limpiador_nombre,
    });
  }, [user]);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = (e) => {
    console.log("updateUser");
    //e.preventDefault();
    const token = getAccessTokenApi();
    let userUpdate = userData;

    // if (userUpdate.password || userUpdate.repeatPassword) {
    //   if (userUpdate.password !== userUpdate.repeatPassword) {
    //     notification["error"]({
    //       message: "Las contraseñas tienen que ser iguales.",
    //     });
    //     return;
    //   } else {
    //     delete userUpdate.repeatPassword;
    //   }
    // }

    if (
      !userData.name ||
      !userData.owner ||
      !userData.shelly_abrir_puerta_ID ||
      !userData.shelly_temperatura_ID ||
      !userData.shelly_potencia_ID ||
      !userData.wifi_ssid ||
      !userData.wifi_pass ||
      !userData.router_user ||
      !userData.telefono ||
      !userData.description ||
      !userData.limpiador_telefono ||
      !userData.limpiador_nombre ||
      !userData.router_pass
    ) {
      notification["error"]({
        message: "El nombre, apellidos y email son obligatorios.",
      });
      return;
    }

    updateInmuebleApi(token, userUpdate, user._id).then((result) => {
      notification["success"]({
        message: result.message,
      });
      setIsVisibleModal(false);
      setReloadUsers(true);
    });
    // if (typeof userUpdate.avatar === "object") {
    //   console.log("updateUserApi3");
    //   uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
    //     console.log("updateUserApi2");
    //     userUpdate.avatar = response.avatarName;
    //     updateUserApi(token, userUpdate, user._id).then((result) => {
    //       notification["success"]({
    //         message: result.message,
    //       });
    //       setIsVisibleModal(false);
    //       setReloadUsers(true);
    //     });
    //   });
    // } else {
    //   console.log("updateUserApi");
    //   updateUserApi(token, userUpdate, user._id).then((result) => {
    //     notification["success"]({
    //       message: result.message,
    //     });
    //     setIsVisibleModal(false);
    //     setReloadUsers(true);
    //   });
    // }
    // };
    console.log("EditUserForm return");
  };
  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  console.log("FORMULARIO");
  console.log(userData);
  console.log(moment(userData.fecha_entrada, "MM/DD/YYYY"));
  const onChange = (dates) => {
    console.log("onChange");
    console.log(dates[0]);
    console.log(dates[1]);
    setUserData({
      ...userData,
      fecha_entrada: dates[0].format("MM/DD/YYYY"),

      fecha_salida: dates[1].format("MM/DD/YYYY"),
    });
  };
  const { TextArea } = Input;
  return (
    <Form className="form-edit" onFinish={updateUser}>
      <Divider>Datos del piso</Divider>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="Date Range">
            {moment(userData.fecha_entrada, "MM/DD/YYYY").isValid() ? (
              <RangePicker
                renderExtraFooter={() => "extra footer"}
                showTime
                onChange={onChange}
                defaultValue={[
                  moment(userData.fecha_entrada, "MM/DD/YYYY"),
                  moment(userData.fecha_salida, "MM/DD/YYYY"),
                ]}
              />
            ) : (
              <></>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Divider>Datos del piso</Divider>
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
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
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
              value={userData.telefono}
              onChange={(e) =>
                setUserData({ ...userData, telefono: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
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
              value={userData.owner}
              onChange={(e) =>
                setUserData({ ...userData, owner: e.target.value })
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
              value={userData.limpiador_nombre}
              onChange={(e) =>
                setUserData({ ...userData, limpiador_nombre: e.target.value })
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
              value={userData.limpiador_telefono}
              onChange={(e) =>
                setUserData({ ...userData, limpiador_telefono: e.target.value })
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
              value={userData.wifi_ssid}
              onChange={(e) =>
                setUserData({ ...userData, wifi_ssid: e.target.value })
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
              value={userData.wifi_pass}
              onChange={(e) =>
                setUserData({ ...userData, wifi_pass: e.target.value })
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
              value={userData.router_user}
              onChange={(e) =>
                setUserData({
                  ...userData,
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
              value={userData.router_pass}
              onChange={(e) =>
                setUserData({
                  ...userData,
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
              value={userData.shelly_abrir_puerta_ID}
              onChange={(e) =>
                setUserData({
                  ...userData,
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
              value={userData.shelly_temperatura_ID}
              onChange={(e) =>
                setUserData({
                  ...userData,
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
              value={userData.shelly_potencia_ID}
              onChange={(e) =>
                setUserData({
                  ...userData,
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
        value={userData.description}
        onChange={(e) =>
          setUserData({
            ...userData,
            description: e.target.value,
          })
        }
      />

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Inmueble
        </Button>
      </Form.Item>
    </Form>
  );
}
