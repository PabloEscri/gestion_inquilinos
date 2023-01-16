import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// --> https://blog.logrocket.com/react-leaflet-tutorial/ <---   Para hacer que funcione el mapa
import "./Map_puntos.scss";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import { getAccessTokenApi } from "../../../api/auth";
import { getCurrentLocation } from "../../../api/map";

//Establecemos el ICONO para los puntos en movimiento
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
});
L.Marker.prototype.options.icon = DefaultIcon;
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
export default function Map(props) {
  const { coordenadas } = props;
  var puntos = [];

  for (let i = 0; i < coordenadas.length; i++) {
    let color = "blue";
    try {
      if (coordenadas[i].color == null) {
        color = "blue";
      } else {
        color = coordenadas[i].color;
      }
    } catch (e) {
      console.log(e);
    }
    //console.log("color");
    //console.log(color);
    if (color === "rojo") {
      puntos.push(
        <Marker icon={redIcon} position={coordenadas[i].punto}>
          <Popup>{coordenadas[i].nombre}</Popup>
        </Marker>
      );
    } else if (color === "yellow") {
      puntos.push(
        <Marker icon={yellowIcon} position={coordenadas[i].punto}>
          <Popup>{coordenadas[i].nombre}</Popup>
        </Marker>
      );
    } else {
      puntos.push(
        <Marker icon={DefaultIcon} position={coordenadas[i].punto}>
          <Popup>{coordenadas[i].nombre}</Popup>
        </Marker>
      );
    }
  }
  return (
    <>
      <MapContainer
        className="leaflet-container"
        center={coordenadas[0].punto}
        zoom={12}
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
        {puntos}
      </MapContainer>
    </>
  );
}
