import React, { useState, useEffect } from "react";

import { getSimulations } from "../../../api/user";

import { getAccessTokenApi } from "../../../api/auth";
import ListOutputs from "../../../components/Admin/Users/ListOutputs";

import "./Outputs.scss";

export default function Outputs() {
  const [simulations, setSimulations] = useState([]); //Todos los usuarios

  const [reloadUsers, setReloadUsers] = useState(false);
  const token = getAccessTokenApi();

  useEffect(() => {
    getSimulations(token).then((response) => {
      console.log("Simulaciones");
      console.log(response.simulaciones_del_usuario);
      console.log("--------");
      setSimulations(response.simulaciones_del_usuario);
    });

    setReloadUsers(false);
  }, [token, reloadUsers]); //Solo se refresca si cambian estos

  return (
    <>
      <h1 className="titulos">SIMULATIONS</h1>
      <h2>These are all the simulations already launched: </h2>
      <div>
        <ListOutputs
          simulations={simulations}
          setReloadUsers={setReloadUsers}
        />
      </div>
    </>
  );
}
