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
} from "../../../../api/inmueble";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
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
        />
      )}
    />
  );
}

function UserActive(props) {
  const { user, editUser, setReloadUsers, seeCalendar } = props;
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

  const desactivateUser = () => {
    const accesToken = getAccessTokenApi();

    updateInquilinoApi(accesToken, user._id, false)
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
            "%0d%0a%0d%0aEste link será válido sólo desde el " +
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

  const { RangePicker } = DatePicker;
  return (
    <>
      <List.Item
        actions={[
          //<span>{user.code}</span>,

          <Button
            onClick={abrirEnlace}
            type="primary"
            label="Abrir enlace en nueva pestaña"
            style={{ backgroundColor: "green", borderColor: "green" }}
          >
            <CommentOutlined />
          </Button>,
          <Button
            type="primary"
            onClick={abrirEnlace}
            label="Desactivar Inquilino"
            style={{ backgroundColor: "red", borderColor: "red" }}
          >
            <CloseCircleOutlined />
          </Button>,
          <RangePicker
            renderExtraFooter={() => "extra footer"}
            showTime
            disabled
            defaultValue={[
              moment(user.fecha_entrada, "MM/DD/YYYY"),
              moment(user.fecha_salida, "MM/DD/YYYY"),

              // moment("2022-09-12 13:00"),
              // moment("2022-09-14 16:00"),
            ]}
          />,
          // <Button type="primary" onClick={() => seeCalendar(user)}>
          //   <CalendarOutlined />
          // </Button>,
          <Button type="primary" onClick={() => editUser(user)}>
            <EditOutlined />
          </Button>,
          // <Button type="danger" onClick={desactivateUser}>
          //   <StopOutlined />
          // </Button>,
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

    updateInquilinoApi(accesToken, user._id, true)
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
