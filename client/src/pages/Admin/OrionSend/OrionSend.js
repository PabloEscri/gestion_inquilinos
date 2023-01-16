import React, { useState, useEffect } from "react";
import "./OrionSend.scss";
import useKeyRock from "../../../hooks/useKeyRock";

import { getKeyrockTokenApi } from "../../../api/auth";

import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Button } from "antd";
import { basePath, apiVersion } from "../../../api/config";

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: false,
  action: `${basePath}/${apiVersion}/subir-file-ngsi-ld`,
  //action: "http://localhost:3977/api/v1/subir-file",

  headers: { Authorization: getKeyrockTokenApi() },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
  beforeUpload: (file) => {
    return true;
  },
};

export default function OrionSend() {
  return (
    <div>
      <h1>Arrastra hasta aquí un fichero en formato NGSI-LD</h1>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <div className="divClass">
        {/* <Button type="primary" htmlType="submit" className="btn-submit">
          Enviar
        </Button> */}
      </div>
    </div>
  );
}
