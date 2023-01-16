import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  notification,
  Radio,
  RadioChangeEvent,
} from "antd";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EMAIL,
  KEYROCK_TOKEN,
} from "../../../utils/constants";
import { signInApi, Keyrock } from "../../../api/user";
 
import { basePath, apiVersion } from "../../../api/config";

import "./LoginForm.scss";

export default function LoginForm() {
  //Creamos unos hooks para guardar el estado del formulario
  const [inputs, setInputs] = useState({
    /* email: "741435@unizar.es",
    password: "123456",
    idp: "EU.EORI.ESCAPILLAR", */
    email: "",
    password: "",
    idp: "",
  });
  const [value, setValue] = useState(1);
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

  const login = async (e) => {
    const result = await signInApi(inputs);
    console.log(result.message,'hola')
    
    console.log(result,'hola')
    //El backend devuelve message si ha habido algún error por eso este primer if
    if (result.message) {
      notification["error"]({
        message: result.message,
      });
    } else {
      const { accessToken, refreshToken } = result;
      //Almacenamos en local la informacion del access token y del refresh token
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      localStorage.setItem(EMAIL, inputs.email);

      notification["success"]({
        message: "Login correcto.",
      });
      //Redirigimos al admin
      //console.log(basePath)
      window.location.href = "/admin";
     /*  Keyrock(inputs.idp).then((res) => {
        localStorage.setItem(KEYROCK_TOKEN, res);
        window.location.href = res;
      }); */
    }
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
      {/* <Form.Item>
        <Radio.Group name="idp" type="idp" label="idp" className="login-form__form" >
          <Radio value={"EU.EORI.ESCAPILLAR"}>CapillarIT IDP</Radio>
          <Radio value={"EU.EORI.BELURBIKE22"}>URBIKE IDP</Radio>
        </Radio.Group>
      </Form.Item>
      <br></br> */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form__button">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
