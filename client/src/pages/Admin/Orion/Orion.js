import React, { useState, useEffect } from "react";
import "./Orion.scss";
import {useKeyRock} from "../../../hooks";

import { getBBDDORION } from "../../../api/full_stack";

import { getKeyrockTokenApi } from "../../../api/auth";

export default function Orion(props) {
  const { tokenKeyrock2/* , isLoading2  */} = useKeyRock();
  const [orion_get, setorion_get] = useState("");
  const [entidades, setentidades] = useState("");
  console.log("Policies");
  console.log(tokenKeyrock2);
  console.log("Policies");

  useEffect(() => {
    const token = getKeyrockTokenApi();
    getBBDDORION(token).then((response) => {
      setentidades(response.length);

      var bbdd = JSON.stringify(response, null, 2);
      bbdd = '{ "entidades" : ' + bbdd + "}";

      setorion_get(bbdd);
      //console.log(bbdd);
    });
  });

  return (
    <>
      <h1>La BBDD tiene {entidades} elementos y son: </h1>
      <div className="hola">
        <pre>{orion_get}</pre>
      </div>
    </>
  );
}
