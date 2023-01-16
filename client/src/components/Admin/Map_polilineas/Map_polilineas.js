import React, { useState, useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  Polyline,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { Checkbox, Col, Row } from "antd";

// --> https://blog.logrocket.com/react-leaflet-tutorial/ <---   Para hacer que funcione el mapa

//Trazar rutas con Leaflet: https://mappinggis.com/2016/08/calculo-de-rutas-en-un-mapa-web-de-leaflet/

import "./Map_polilineas.scss";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";



export default function Map_polilineas(props) {

  const [checked, setchecked] = useState([]);
  const { coordenadas, num_tour2,hubs } = props;
  var puntos = [];
  var puntos2 = [];
  var hubs1 = [];
  var hubs2 = [];
  var orden = "";
  //console.log(hubs);
  var tara=0;
  var color='white';
  var number=0;
  for (let i = 0; i < coordenadas.length; i++) {
    if (filtrarTour(coordenadas[i].tour_info.order_tour, checked)) 
    { 
      number=i-tara;
      puntos.push(coordenadas[i].punto);
      orden = orden + coordenadas[i].nombre + "-> ";
      /* console.log(i,'esto es i')
      console.log(number,'esto es numer')
      console.log(tara,'esto es tara') */
      if(coordenadas[i].order_mode==='delivery'){
        color='green';
      }else if(coordenadas[i].order_mode==='pickup'){
        color='red';
      }else{
        color='white';
      }
      puntos2.push(
       <Marker 
       icon={L.divIcon({
        html: `<div class="marker-capillar">
        <div class="${color}-circle" >
          </div>
          <div class="number" >
              ${coordenadas[i].tour_info.order_pos}
            </div>
        </div>`,
      })}
        position={coordenadas[i].punto}>
          <Popup>{coordenadas[i].nombre}</Popup>
        </Marker> 
      );
    }else{
      tara=i;
    }
  }

  for (let i = 0; i < hubs.length; i++) {
    
    if (checked.length>0) 
    { 
      console.log('he llegao')
      hubs1.push(hubs[i].punto);
      hubs2.push(
       <Marker 
       icon={L.divIcon({
        html: `
        <div class="blue-square" >
          </div>`,
      })}
        position={hubs[i].punto}>
          <Popup>{hubs[i].nombre}</Popup>
        </Marker> 
      );
    }
  }
  const onChange = (checkedValues) => {
    //console.log("checked = ", checkedValues);
    setchecked(checkedValues);
  };

  function filtrarTour(value, checkboxs) {
    var tour_elegido = false;
    for (let i = 0; i < checkboxs.length; i++) {
      if (value === checkboxs[i]) {
        tour_elegido = true;
        break;
      }
    }
    return tour_elegido;
  }
  var num_tours_v = [];
  for (let i = 0; i < 5; i++) {
    num_tours_v.push(<Checkbox value={i.toString()}>{i}</Checkbox>);
  }

  return (
    <>
      <p>{orden}</p>
      <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
        {num_tours_v}
      </Checkbox.Group>

      <div className="mapaRow">
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
          <Polyline positions={puntos} color="red" />
          {puntos2}{hubs2}
        </MapContainer>
        <div className="leyenda">
          <div className="colores">
            <div className="rojo">
            </div>
            <div className="verde">
            </div>
            <div className="azul">
            </div>

          </div>
          <div className="texto">
            <div className="pick-up">
            pick-up
            </div>
            <div className="delivery">
            delivery
            </div>
            <div className="hubs">
            hubs
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
