import React, { useState, useEffect } from "react";
import { Tabs, Card, Radio, Col, Row } from "antd";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// --> https://blog.logrocket.com/react-leaflet-tutorial/ <---   Para hacer que funcione el mapa
import "./Map.scss";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import { getAccessTokenApi, getKeyrockTokenApi } from "../../../api/auth";
import {
  getCurrentLocation,
  getCurrentLocationI4trust,
} from "../../../api/map";

//Establecemos el ICONO para los puntos en movimiento
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
  const token = getAccessTokenApi();
  const token_keyrock = getKeyrockTokenApi();
  const [reloadUsers, setReloadUsers] = useState(true);
  var [pos, setpos] = useState([41.796066, -0.812397]);
  const [intervalo, setIntervalo] = useState(5000);
  useEffect(() => {
    setTimeout(() => {
      setReloadUsers(!reloadUsers);
    }, intervalo);

    console.log("Pulsado");

    // getCurrentLocation(token).then((response) => {
    //   if (response !== null) {
    //     console.log(response.posicion_actual);
    //     setpos([
    //       parseFloat(response.posicion_actual.latitud),
    //       parseFloat(response.posicion_actual.longitud),
    //     ]);
    //   }
    // });

    getCurrentLocationI4trust(token_keyrock).then((response) => {
      if (response !== null) {
        console.log("MAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        console.log(response.location.value.coordinates[0]);
        console.log(response.location.value.coordinates[1]);
        console.log("MAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        setpos([
          parseFloat(response.location.value.coordinates[0]),
          parseFloat(response.location.value.coordinates[1]),
        ]);
      }
    });
  }, [reloadUsers]); //Solo se refresca si cambian estos

  return (
    <>
      <div>
        <span>Periodo de refresco: </span>
        <select id="tiempos">
          <option value="1000">1s</option>
          <option value="5000">5s</option>
          <option value="10000">10s</option>
          <option value="30000">30s</option>
          <option value="40000">40s</option>
          <option value="60000">1min</option>
        </select>

        <button
          onClick={() => {
            //setIntervalo(document.getElementById("intervalo").value);
            var select = document.getElementById("tiempos");
            //console.log(select.selectedIndex);
            var value = select.options[select.selectedIndex].value;
            console.log(value); //
            setReloadUsers(!reloadUsers);
            setIntervalo(value);
          }}
        >
          Modificar
        </button>
      </div>
      <br></br>
      <button
        onClick={() => {
          setReloadUsers(!reloadUsers);
          console.log(".");
        }}
      >
        {reloadUsers
          ? "Refrescado a las " + Date().toLocaleString()
          : "Refrescado a las " + Date().toLocaleString()}
      </button>
      <Row>
        <Col span={8}>
          <Card>
            DEVICES:
            <br></br>
            <Radio checked>urn:ngsi-ld:GPSDEVICE:EU.EORI.ESCAPILLAR_02</Radio>;
          </Card>
        </Col>
        <Col span={24}>
          <MapContainer
            className="leaflet-container"
            center={pos}
            zoom={2}
            dragging={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            attributionControl={true}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={pos}>
              <Popup>{pos}</Popup>
            </Marker>
          </MapContainer>
        </Col>
      </Row>
    </>
  );
}
