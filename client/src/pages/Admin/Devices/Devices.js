import React, { useState, useEffect } from "react";
import ListDevices from "../../../components/Admin/Devices/ListDevices/ListDevices";
import { getKeyrockTokenApi } from "../../../api/auth";
import { basePath, apiVersion } from "../../../api/config";

export default function Devices() {
  const [devices, setdevices] = useState([]);
  const token_KEYROCK = getKeyrockTokenApi();
  function getInfoOfGPS(token, id) {
    const url = `${basePath}/${apiVersion}/get-devices-i4trust`;

    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/ld+json",
        useraccesstoken: "Bearer " + token,
      },
    };
    return fetch(url, params)
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .catch((err) => {
        return err.message;
      });
  }
  var contenedores = [];
  useEffect(() => {
    getInfoOfGPS(token_KEYROCK).then((response) => {
      console.log(response);
      response.forEach((element) => {
        console.log(element);
        contenedores.push({
          name: String(element.id),
          owner: String(element.id),
          status: ["ONLINE"],
          model: element["vehicle"] != null ? element.vehicle.value : "",
          update: "-",
        });
      });
      setdevices(contenedores);
    });
  }, []);
  return (
    <>
      <ListDevices device={devices} />
    </>
  );
}
