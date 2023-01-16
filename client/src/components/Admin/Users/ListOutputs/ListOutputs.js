import React, { useState, useEffect } from "react";
import {
  getOutputSimulationFile,
  getInputSimulationFile,
} from "../../../../api/user";
import { basePath, apiVersion } from "../../../../api/config";
import {
  Switch,
  List,
  Avatar,
  Button,
  Modal as ModalAntd,
  notification,
} from "antd";
import {
  CloudDownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { Upload } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";

import "./ListOutputs.scss";

const { confirm } = ModalAntd;
export default function ListOutputs(props) {
  const { simulations, setReloadUsers } = props;
  //console.log("+++");
  //console.log(props);
  const token = getAccessTokenApi();

  function deleteSimulationFile(token, id_simulation) {
    const url = `${basePath}/${apiVersion}/user-simulacion/${id_simulation}`;
    //console.log(url);
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    return fetch(url, params)
      .then((response) => {
        notification["success"]({
          message: response.json(),
        });
        setReloadUsers(true);
        //console.log(response);
        return response.json();
      })
      .then((result) => {
        //console.log(result);
        return result;
      })
      .catch((err) => {
        return err.message;
      });
  }

  return (
    <div className="list-users">
      <List
        //header={<div>Resultados de las simulaciones</div>}
        //footer={<div>No hay más simulaciones</div>}
        bordered
        dataSource={simulations}
        renderItem={(item) => (
          <List.Item
            style={{ backgroundColor: "white", justifyContent: "space-around" }}
          >
            <div style={{ backgroundColor: "white" }}>
              <div
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {item.horaInput}
              </div>
              <div
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Button
                  type="primary"
                  onClick={() => {
                    getInputSimulationFile(token, item.nombreInput);
                    //console.log("Dentro");
                  }}
                >
                  <CloudDownloadOutlined />
                  Input_{item.nombreInput}
                </Button>
              </div>
            </div>
            <div>
              <div
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {" "}
                {item.horaOutput == "" ? "..." : item.horaOutput}
              </div>

              {item.nombreOutput == "" ? (
                <Button
                  disabled={true}
                  style={{ borderColor: "#737373", backgroundColor: "#737373" }}
                  type="primary"
                  onClick={() => {
                    getOutputSimulationFile(token, item.nombreOutput);
                    //console.log("Dentro");
                  }}
                >
                  <CloudDownloadOutlined />
                  Output_{item.nombreInput}
                </Button>
              ) : (
                <Button
                  style={{ borderColor: "green", backgroundColor: "green" }}
                  type="primary"
                  onClick={() => {
                    getOutputSimulationFile(token, item.nombreOutput);
                    //console.log("Dentro");
                  }}
                >
                  <CloudDownloadOutlined />
                  Output_{item.nombreInput}
                </Button>
              )}
            </div>

            <div>
              {item.nombreOutput == "" ? (
                <Button
                  disabled={true}
                  style={{ borderColor: "#737373", backgroundColor: "#737373" }}
                  type="primary"
                  /*  onClick={async () => {
                    window.location.href = `/admin/graph?id=${item.nombreInput}`;
                  }} */
                >
                  <SearchOutlined />
                </Button>
              ) : (
                <Button
                  //style={{ borderColor: "green", backgroundColor: "green" }}
                  type="primary"
                  onClick={async () => {
                    window.location.href = `/admin/graph?id=${item.nombreInput}`;
                  }}
                >
                  <SearchOutlined />
                </Button>
              )}
              <p></p>
              <Button
                type="danger"
                onClick={async () => {
                  await deleteSimulationFile(token, item.nombreInput);
                }}
              >
                <DeleteOutlined />
              </Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
