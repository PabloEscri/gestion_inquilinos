import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getInmueblesApi } from "../../../api/inmueble";
import ListInmuebles from "../../../components/Admin/Users/Inmuebles/ListInmueble";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import "./Inmuebles.scss";

export default function Inquilinos() {
  const [usersActive, setUsersActive] = useState([]); //Todos los usuarios
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);

  const token = getAccessTokenApi();

  useEffect(() => {
    getInmueblesApi(token, true).then((response) => {
      console.log("getInmueblesApi", response);
      setUsersActive(response.Pisos);
    });
    getInmueblesApi(token, false).then((response) => {
      setUsersInactive(response.Pisos);
    });

    setReloadUsers(false);
  }, [token, reloadUsers]); //Solo se refresca si cambian estos

  return (
    <div className="users">
      <ListInmuebles
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}
