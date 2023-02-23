import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getInquilinosApi, Keyrock } from "../../../api/inquilino";
import ListInquilinos from "../../../components/Admin/Users/Listinquilinos";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import "./inquilinos.scss";

export default function Inquilinos() {
  const [usersActive, setUsersActive] = useState([]); //Todos los usuarios
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);

  const token = getAccessTokenApi();

  useEffect(() => {
    getInquilinosApi(token, true).then((response) => {
      console.log(response);
      setUsersActive(response.users);
    });
    getInquilinosApi(token, false).then((response) => {
      setUsersInactive(response.users);
    });
    setReloadUsers(false);
    console.log("entrando por reloadUsers");
  }, [token, reloadUsers]); //Solo se refresca si cambian estos

  return (
    <div className="users">
      <ListInquilinos
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}
