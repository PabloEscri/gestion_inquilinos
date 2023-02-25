import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useAuth } from "../../../hooks";
import { checkUserLogin } from "../../../providers/AuthProvider";
// import {useAuth} from "../../../hooks/useAuth"
import {
  MenuUnfoldOutlined,
  LineChartOutlined,
  UserOutlined,
  MenuOutlined,
  ReadOutlined,
  EditOutlined,
  UploadOutlined,
  AimOutlined,
  MobileOutlined,
  SafetyOutlined,
  SearchOutlined,
  SendOutlined,
  IdcardOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import "./MenuSider.scss";

import Collapse from "react-bootstrap/Collapse";

function onClickMenu(setUser) {
  try {
    console.log("he entrado jeje");
    checkUserLogin(setUser);
  } catch (e) {
    console.log(e);
  }
}

function MenuSider(props) {
  const { setUser } = useAuth();

  const { menuCollapsed, location, politicas } = props;

  const { Sider } = Layout;

  /*   const users={label: 'Users', icon: <UserOutlined />, key: '/admin/users'};
  const policies={label: 'Policies' ,icon:<SafetyOutlined /> , key: '/admin/mypolicies'};
  const orion={label: 'Orion', icon: <SearchOutlined />, key: "/admin/orion"};
  const items =[users,resource,policies,orion]; */
  return (
    <Sider className="admin-sider" /* collapsed={menuCollapsed} */>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        //defaultSelectedKeys={["/admin/users"]}
        //items={items}
        //onClick={ window.location.href(key)}
      >
        <Menu.Item key="/admin/users">
          <Link to="/admin/users" onClick={() => onClickMenu(setUser)}>
            <UserOutlined />
            <span className="nac-text">Users</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/calendario">
          <Link to="/admin/calendario" onClick={() => onClickMenu(setUser)}>
            <UserOutlined />
            <span className="nac-text">Calendario</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/inquilinos">
          <Link to="/admin/inquilinos" onClick={() => onClickMenu(setUser)}>
            <IdcardOutlined />
            <span className="nac-text">inquilinos</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/inmuebles">
          <Link to="/admin/inmuebles" onClick={() => onClickMenu(setUser)}>
            <ShopOutlined />
            <span className="nac-text">Inmuebles</span>
          </Link>
        </Menu.Item>{" "}
        <Menu.Item key="/admin/graph">
          <Link to="/admin/graph" onClick={() => onClickMenu(setUser)}>
            <LineChartOutlined />
            <span className="nac-text">Analiticas</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);
