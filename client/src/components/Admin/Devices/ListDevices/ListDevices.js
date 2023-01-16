// import { device } from "./device.js";
import React, { useState } from "react";
import "./ListDevices.scss";
import { Table, Button, Tag } from "antd";
import Modal from "../../../Modal";
import AddDeviceForm from "../AddDeviceForm/AddDeviceForm";

const columns = [
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, { status }) => (
      <>
        {status.map((tag) => {
          // let color = tag.length > 5 ? "geekblue" : "green";
          var color;
          if (tag === "Offline") {
            color = "volcano";
          } else {
            color = "green";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },

  {
    title: "Device Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Device Owner",
    dataIndex: "owner",
    key: "owner",
  },
  {
    title: "Device Model",
    dataIndex: "model",
    key: "model",
  },
  {
    title: "Last Updated",
    dataIndex: "update",
    key: "update",
  },
];

function ListDevices(props) {
  const { device } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addDeviceModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creating a new device");
    setModalContent(<AddDeviceForm setIsVisibleModal={setIsVisibleModal} />);
  };

  return (
    <div>
      <div className="nbr-devices">{device.length} devices</div>
      <div className="addDevice">
        <Button type="primary" onClick={addDeviceModal}>
          New Device
        </Button>
      </div>
      <Table dataSource={device} columns={columns} />
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width={600}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default ListDevices;
