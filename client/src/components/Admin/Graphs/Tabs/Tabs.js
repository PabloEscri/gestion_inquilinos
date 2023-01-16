import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  KEYROCK_TOKEN,
} from "../../../utils/constants";
import { signInApi, Keyrock } from "../../../api/user";

import "./LoginForm.scss";

export default function LoginForm() {
  //Creamos unos hooks para guardar el estado del formulario
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //Cuando haya cambios debe actualizar el estado
  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    const result = await signInApi(inputs);
    //console.log("AT8 " + result);
    //El backend devuelve message si ha habido algún error por eso este primer if
    if (result.message) {
      notification["error"]({
        message: result.message,
      });
    } else {
      const { accessToken, refreshToken } = result;
      //console.log("Guardando");
      //Almacenamos en local la informacion del access token y del refresh token
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      notification["success"]({
        message: "Login correcto.",
      });
      //Redirigimos al admin
      //window.location.href = "/admin";
      Keyrock().then((res) => {
        //console.log("+++++++++++++++++");
        //console.log(res);
        localStorage.setItem(KEYROCK_TOKEN, res);
        window.location.href = res;
      });
    }

    //console.log(result);
  };

  return (
    <Form className="login-form" onChange={changeForm} onFinish={login}>
      <Form.Item>
        <Input
          //prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="login-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Input
          //prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form__button">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
