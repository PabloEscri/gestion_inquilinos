import React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import "./LayoutBasic.scss";

function LayoutDefault(props) {
  console.log(props);
  const { routes } = props;
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      <Layout>
        <Header> Header </Header>
        <h1>CAPILLAR IT</h1>
        <Content>
          <LoadRouters routes={routes} />
        </Content>
        <Footer>Capillar IT</Footer>
      </Layout>
    </Layout>
  );
}

function LoadRouters({ routes }) {
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

export default LayoutDefault;
