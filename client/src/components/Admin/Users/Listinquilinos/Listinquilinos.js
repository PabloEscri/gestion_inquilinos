import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  Modal as ModalAntd,
  notification,
  Calendar,
  DatePicker,
  Space,
  Icon,
  Divider,
  Row,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import dayjs from "dayjs";
import {
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
  CalendarOutlined,
  CommentOutlined,
  CloseCircleOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";
import EditInquilinoForm from "../EditInquilinoForm";
import AddInquilinoForm from "../AddInquilinoForm";
import {
  getAvatarApi,
  updateInquilinoApi,
  deleteInquilinoApi,
} from "../../../../api/inquilino";
import { getAccessTokenApi } from "../../../../api/auth";

import "./Listinquilinos.scss";
import {
  createInmueble,
  getDescriptionInmueble,
  getNombreInmueble,
} from "../../../../api/inmueble";
import { Column } from "@antv/g2plot";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers, reloadUsers } = props;
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addUserModal = () => {
    setIsVisibleModal(true);

    setModalTitle("Creando nuevo usuario");
    setModalContent(
      <AddInquilinoForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewUsersActives(!viewUsersActives)}
          />
          <span>
            {viewUsersActives ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>
        <Button
          type="primary"
          onClick={() => {
            console.log("Hola");
            notification.open({
              message: "Nuevo inquilino creado",
              description: "",
              onClick: () => {
                console.log("Notification Clicked!");
              },
            });
          }}
        >
          Open the notification box
        </Button>
        <Button type="primary" onClick={addUserModal}>
          Nuevo usuario
        </Button>
      </div>
      {viewUsersActives ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
          reloadUsers={reloadUsers}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
        />
      )}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
    reloadUsers,
  } = props;

  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );
    setModalContent(
      <EditInquilinoForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };
  const seeCalendar = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );

    setModalContent();
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          seeCalendar={seeCalendar}
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
          reloadUsers={reloadUsers}
        />
      )}
    />
  );
}

function UserActive(props) {
  const { user, editUser, setReloadUsers, reloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [nombre_piso, setNombrePiso] = useState(null);

  const desactivateUser = () => {
    const accesToken = getAccessTokenApi();
    user.active = false;
    console.log("desactivateUser", user);
    updateInquilinoApi(accesToken, user, user._id)
      .then((response) => {
        notification["success"]({
          message: "Desactivado",
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: "Problema desactivando",
        });
        setReloadUsers(true);
      });
  };

  const showDeleteConfirm = () => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando usuario",
      content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteInquilinoApi(accesToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };
  function abrirEnlace() {
    getDescriptionInmueble(user.inmueble, "accesToken")
      .then((response) => {
        window.open(
          "https://api.whatsapp.com/send?phone=" +
            user.telefono +
            "&text=" +
            response.description +
            "http://comotucasaplatform.s3-website.eu-west-3.amazonaws.com/acceder/" +
            user.code +
            "%0d%0a%0d%0a📅Este link será válido sólo desde el " +
            user.fecha_entrada +
            " hasta el " +
            user.fecha_salida +
            ".",
          "_blank"
        );
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  }
  useEffect(() => {
    const token = getAccessTokenApi();
    getNombreInmueble(user.inmueble, token).then((response) => {
      setNombrePiso(response.message);
    });
  }, [reloadUsers, user.inmueble]);

  const { RangePicker } = DatePicker;

  const now = moment(); // obtiene la fecha actual
  let mystyle;
  let arrow = 0;
  if (moment(user.fecha_entrada, "YYYY-MM-DD").isSame(now, "day")) {
    mystyle = { color: "green" };
    arrow = 0;
  } else if (moment(user.fecha_salida, "YYYY-MM-DD").isSame(now, "day")) {
    mystyle = { color: "red" };

    arrow = 1;
  } else {
    mystyle = { color: "white" };
    arrow = 2;
  }

  // console.log(now.format('YYYY-MM-DD')); // muestra la fecha actual en formato YYYY-MM-DD
  return (
    <>
      <List.Item
        //style={mystyle}
        actions={[
          //<span>{user.code}</span>,
          <span>{nombre_piso}</span>,

          <Button
            onClick={abrirEnlace}
            type="primary"
            label="Abrir enlace en nueva pestaña"
            style={{ backgroundColor: "green", borderColor: "green" }}
          >
            <CommentOutlined />
          </Button>,

          <RangePicker
            renderExtraFooter={() => "extra footer"}
            showTime
            disabled
            value={[
              moment(user.fecha_entrada, "YYYY-MM-DD"),
              moment(user.fecha_salida, "YYYY-MM-DD"),
            ]}

            // defaultValue={[
            //   moment(user.fecha_entrada, "YYYY-MM-DD"),
            //   moment(user.fecha_salida, "YYYY-MM-DD"),

            //   // moment("2022-09-12 13:00"),
            //   // moment("2022-09-14 16:00"),
            // ]}
          />,

          // <Button type="primary" onClick={() => seeCalendar(user)}>
          //   <CalendarOutlined />
          // </Button>,
          <Button type="primary" onClick={() => editUser(user)}>
            <EditOutlined />
          </Button>,
          <Button type="danger" onClick={desactivateUser}>
            <CloseCircleOutlined />
          </Button>,

          // <Button type="danger" onClick={showDeleteConfirm}>
          //   <DeleteOutlined />
          // </Button>,
          // <Button
          //   type="primary"
          //   onClick={abrirEnlace}
          //   label="Desactivar Inquilino"
          //   style={{ backgroundColor: "red", borderColor: "red" }}
          // >
          //   <CloseCircleOutlined />
          // </Button>,
        ]}
      >
        <List.Item.Meta
          avatar={[
            arrow === 0 ? (
              <ArrowRightOutlined style={mystyle} />
            ) : arrow === 1 ? (
              <ArrowLeftOutlined style={mystyle} />
            ) : (
              ""
            ),
            <Divider type="vertical" />,
            <Avatar src={avatar ? avatar : NoAvatar} />,
          ]}
          title={`

                ${user.name ? user.name : "..."} 
                ${user.lastname ? user.lastname : "..."}
            `}
          description={[user.email]}
        />
      </List.Item>
    </>
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive user={user} setReloadUsers={setReloadUsers} />
      )}
    />
  );
}

function UserInactive(props) {
  const { user, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUser = () => {
    const accesToken = getAccessTokenApi();

    user.active = true;
    console.log("desactivateUser", user);
    updateInquilinoApi(accesToken, user, user._id)
      .then((response) => {
        notification["success"]({
          message: "Inquilino activado",
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: "Error activando inquilino",
        });
      });
  };

  const showDeleteConfirm = () => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando usuario",
      content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteInquilinoApi(accesToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={activateUser}>
          <CheckOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                    ${user.name ? user.name : "..."} 
                    ${user.lastname ? user.lastname : "..."}
                `}
        description={user.email}
      />
    </List.Item>
  );
}
