import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Spin,
  notification,
  Radio,
  RadioChangeEvent,
} from "antd";
import {
  abrirPuertaInquilinoApi,
  getInquilinosApi,
} from "../../../api/inquilino";
import "./Garaje.scss";
import { BrowserRouter } from "react-router-dom";
import { getAccessTokenApi } from "../../../api/auth";
export default function Garaje({ match }) {
  //Para mas info de esto venir aqui: https://stackblitz.com/edit/react-router-como-pasar-id-a-pagina?file=index.js
  let code = match.params.id;
  console.log("El codigo es:", code);
  //Creamos unos hooks para guardar el estado del formulario
  const [inputs, setInputs] = useState({
    /* email: "741435@unizar.es",
    password: "123456",
    idp: "EU.EORI.ESCAPILLAR", */
    email: "",
    password: "",
    idp: "",
  });
  const [apertura, setApertura] = useState(true);
  //Cuando haya cambios debe actualizar el estado
  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    /* setInputs({
      email: "741435@unizar.es",
      password: "123456",
      idp: e.target.value,
    }); */
  };

  useEffect(() => {
    const token = getAccessTokenApi();
    getInquilinosApi(token, true).then((response) => {
      console.log(response);
    });
  }, []); //Solo se refresca si cambian estos

  return (
    <div class="welcome-section">
      <h1>Bienvenido a Centric el palomar</h1>
      {/* <p>Code {code}</p> */}
      {apertura ? (
        <Button
          class="enter-btn"
          onClick={() => {
            setApertura(false);
            abrirPuertaInquilinoApi(code).then((response) => {
              console.log("Cerrando");
              console.log(response);
              if (response.message !== "Abriendo") {
                notification["error"]({
                  message: response.message,
                });
              } else {
                notification["success"]({
                  message: response.message,
                });
              }

              setApertura(true);
            });
          }}
        >
          Entrar
        </Button>
      ) : (
        <Spin>Abriendo</Spin>
      )}
    </div>
  );
}
