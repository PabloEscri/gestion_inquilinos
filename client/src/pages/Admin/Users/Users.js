import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersActiveApi, Keyrock } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import "./Users.scss";

export default function Users() {
  const [usersActive, setUsersActive] = useState([]); //Todos los usuarios
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);

  const token = getAccessTokenApi();

  useEffect(() => {
    getUsersActiveApi(token, true).then((response) => {
      console.log(response);
      setUsersActive(response.users);
    });
    getUsersActiveApi(token, false).then((response) => {
      setUsersInactive(response.users);
    });

    setReloadUsers(false);
  }, [token, reloadUsers]); //Solo se refresca si cambian estos

  return (
    <div className="users">
      <ListUsers
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
        reloadUsers={reloadUsers}
      />
    </div>
  );
}
