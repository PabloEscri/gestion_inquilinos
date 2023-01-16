import React from "react";
import {/*  Layout, */ Tabs } from "antd";
import { Redirect } from "react-router-dom";
import Logo from "../../../assets/img/png/logo512-blanco.png";
import Letras from "../../../assets/img/png/letras-white.png";
import RegisterForm from "../../../components/Admin/RegisterForm";
import LoginForm from "../../../components/Admin/LoginForm";
import { getAccessTokenApi } from "../../../api/auth";

import "./SignIn.scss";

export default function SignIn() {
  //const { Content } = Layout;
  const { TabPane } = Tabs;

  
  if (getAccessTokenApi()) {
    //Para que si está logeado nos lleve directamente a admin
    console.log("hola1");
    return <Redirect to="/admin" />;
  }
  return (
    <div className="sign-in">
      <div className="background">
        <div className="background-pictureAndLogo">
        <h1 className="background-pictureAndLogo-letras">
            <img src={Letras} alt="letras" />
          </h1>
          <a href='/' className="background-pictureAndLogo-logo">
            <img src={Logo} alt="logo" />
          </a>
        </div>
        <div className="background-content">
          <div className="background-content-tabs">
            <Tabs type="card">
              <TabPane tab={<span >Entrar</span>} key="1">
                <LoginForm />
              </TabPane>
              <TabPane tab={<span>Nuevo usuario</span>} key="2">
                <RegisterForm />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
