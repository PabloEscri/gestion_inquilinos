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
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      fecha_entrada: user.fecha_entrada,
      fecha_salida: user.fecha_salida,
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

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales.",
        });
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }

    if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
      notification["error"]({
        message: "El nombre, apellidos y email son obligatorios.",
      });
      return;
    }

    if (typeof userUpdate.avatar === "object") {
      console.log("updateUserApi3");
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        console.log("updateUserApi2");
        userUpdate.avatar = response.avatarName;
        updateInquilinoApi(token, userUpdate, user._id).then((result) => {
          notification["success"]({
            message: result.message,
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
        });
      });
    } else {
      console.log("updateUserApi");
      updateInquilinoApi(token, userUpdate, user._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setIsVisibleModal(false);
        setReloadUsers(true);
      });
    }
  };
  console.log("EditUserForm return");

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

  const onChange = (dates) => {
    setUserData({
      ...userData,
      fecha_entrada: dates[0].format("MM/DD/YYYY"),

      fecha_salida: dates[1].format("MM/DD/YYYY"),
    });
  };
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
  return (
    <Form className="form-edit" onFinish={updateUser}>
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

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Inquilino
        </Button>
      </Form.Item>
    </Form>
  );
}
