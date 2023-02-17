import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutAdmin.scss";
import MenuSider from "../components/Admin/MenuSider";
import MenuTop from "../components/Admin/MenuTop";
import AdminSignIn from "../pages/Admin/SignIn/SignIn";
import { useAuth } from "../hooks"; //De aquí es de donde se interactua con el contexto y se extraen las variables que está compartiendo

// Admin Pages
import AdminHome from "../pages/Admin";
import AdminSingIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminMap from "../pages/Admin/Map";

import AdminDevices from "../pages/Admin/Devices";

import AdminOutputs from "../pages/Admin/Outputs";
import uploadFile from "../components/uploadFile";
import { useKeyRock } from "../hooks";

import Moment from "moment";
//A este LayoutAdmin se le pasan las props desde App la funcion RouteWithSubRoutes
export default function LayoutAdmin(props) {
  //console.log(props);
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const { Header, Content, Footer } = Layout;
  const { users, setUser } = useAuth(); //De aquí extraigo la variable de USER y ISLOADING del contexto y que es comun para todos los hijos
  const { tokenKeyrock2, isLoading2 } = useKeyRock();
  //Cuando no exista un registro de usuario entonces tendremos que devolver la pagina de logearse
  const { user, isLoading, email } = users;
  /* console.log("tokenKeyrock2");
  console.log(tokenKeyrock2);
  console.log("tokenKeyrock2"); */
  var tiempo_actual = 0;
  try {
    tiempo_actual = Number(tokenKeyrock2.exp);
  } catch {
    tiempo_actual = 0;
  }
  /* console.log("user");
  console.log(user);
  console.log("user"); 

  console.log("isLoading");
  console.log(isLoading);
  console.log("isLoading");  */
  if (!user && !isLoading) {
    //||  tiempo_actual< Moment().unix()
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }
  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} politicas={tokenKeyrock2} />
        <Layout
          className={menuCollapsed ? "layout-admins" : "layout-admin"}
          //style={{ marginLeft: menuCollapsed ? "0px" : "170px" }}
        >
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
              //usuario={tokenKeyrock2.email == null ? "" : tokenKeyrock2.email}
              usuario={email == null ? "" : email}
              //eori={tokenKeyrock2.iss == null ? "" : tokenKeyrock2.iss}
            />
            <link
              rel="stylesheet"
              href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
              integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
              crossOrigin=""
            />
          </Header>
          <Content className="layout-admin__content">
            <div>
              <LoadRoutes routes={routes} politicas={tokenKeyrock2} />
              {/* Aqui tenemos todos los componentes y solo se renderiza según el que toca */}
            </div>
          </Content>
          <Footer className="layout-admin__footer">ComoTuCasa.Es</Footer>
        </Layout>
      </Layout>
    );
  }

  return null;
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
