import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/routes"; //No tiene {} en plan {routes} ya que la exportación es default
import AuthProvider from "./providers/AuthProvider";
import KeyRockProvider from "./providers/KeyRockProvider";

import "./App.scss";

function App() {
  
  return (
    <>
      <KeyRockProvider>
        <AuthProvider>
          {/* Aquí creo un contexto en el cual funcionan unas variables */}
          {/* Con esto siempre sabremos si tenemos usuario logeado o no */}
          <Router>
            <Switch>
              {/* Cuando encuentre una ruta exacta deja de renderizar */}
              {routes.map((route, index) => (
                <RouteWithSubRoutes key={index} {...route} />
              ))}
            </Switch>
          </Router>
        </AuthProvider>
      </KeyRockProvider>
    </>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
