import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Spin,
  notification,
  Radio,
  RadioChangeEvent,
} from "antd";
import { abrirPuertaInquilinoApi } from "../../../api/inquilino";
import "./Garaje.scss";
import { BrowserRouter } from "react-router-dom";
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

  return (
    <>
      <p>Code {code}</p>
      {apertura ? (
        <Button
          className="red-round-button center "
          onClick={() => {
            setApertura(false);
            abrirPuertaInquilinoApi(code).then((response) => {
              console.log("Cerrando");
              console.log(response);
              setApertura(true);
            });
          }}
        >
          Entrar
        </Button>
      ) : (
        <Spin>Abriendo</Spin>
      )}
    </>
  );
}
