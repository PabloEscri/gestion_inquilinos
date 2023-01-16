import { basePath, apiVersion } from "./config";
export function getCookieIShare(code, idp) {
  //console.log(idp);
  //Accedo al endpoint con su url

  const url =
    `${basePath}/${apiVersion}/i4trust/idpAccessAuthorised/userInfo?code=` +
    code;
  //console.log("Entramos");
  const params = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      idp: idp,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}

//El token es necesario para poder atacar al backend
export function getBBDDORION(token) {
  const url = `${basePath}/${apiVersion}/i4trust/ngsi-ld-view`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}
