import React from "react";
import { Button } from "antd";
import AgusLogo from "../../../assets/img/png/logo-white.png";
import {
  MenuUnfoldOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./MenuTop.scss";
import { logout } from "../../../api/auth";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed, usuario, eori } = props;

  const logoutUser = () => {
    logout();
    window.location.reload();
  };
  //console.log(eori);
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={AgusLogo}
          alt="Agustin Navarro Galdon"
          onClick={()=>window.location.href = "/admin"}
        />
        <div className="menu-top__menu">
          <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
            {menuCollapsed ? <MenuUnfoldOutlined /> : <CloseOutlined />}
          </Button>
        </div>
      </div>
      <p className="menu-top__username">{usuario}</p>

      {/* <p className="menu-top__username">{menuCollapsed?'':eori}</p> */}
      <div className="menu-top__right">
        <Button type="link" onClick={logoutUser}>
          <LogoutOutlined />
        </Button>
      </div>
    </div>
  );
}
