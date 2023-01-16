import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN,EMAIL, KEYROCK_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";
import { Result } from "antd";

//Me devuelve null si ha expirado el token
export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  //console.log("El AT es " + accessToken);
  if (!accessToken || accessToken === "undefined") {
    return null;
  }

  return willExpireToken(accessToken) ? null : accessToken;
}


export function getEmail() {
  const email = localStorage.getItem(EMAIL);
  //console.log("El AT es " + accessToken);
  if (!email || email === "undefined") {
    return null;
  }

  return email;
}

export function getIdp() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  /* console.log("IDP");
  console.log(jwtDecode(accessToken));
  console.log("IDP"); */
  if (!accessToken || accessToken === "undefined") {
    return null;
  }

  return jwtDecode(accessToken).idp;
}

export function getKeyrockTokenApi() {
  const accessToken = localStorage.getItem(KEYROCK_TOKEN);
  if (!accessToken || accessToken === "undefined") {
    return null;
  }
  return accessToken;
}
//Me devuelve null si ha expirado el token
export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken || refreshToken === "undefined") {
    return null;
  }

  return willExpireToken(refreshToken) ? null : refreshToken;
}

export async function refreshAccessTokenApi(refreshToken) {
  try {
    //Accedo al endpoint con su url
    const url = `${basePath}/${apiVersion}/refresh-access-token`;
    const bodyObj = {
      refreshToken: refreshToken,
    };
    const params = {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);
    const result =  await response.json();

    if (response.status !== 200) throw result;
    return result; 

    /* fetch(url, params)
      .then((response) => {
        if (response.status !== 200) {
          //El backend ha devuelto un error
          return null;
        }
        console.log('okey');
        console.log(response);
        return response.json(); //Ha habido exito y actualizo los tokens
      })
       .then((result) => {
        
        console.log(result);
        if (!result) {
          logout();
        } else {
          console.log('okey2')
          const { accessToken, refreshToken } = result;
          console.log(accessToken)
          localStorage.setItem(ACCESS_TOKEN, accessToken);
          localStorage.setItem(REFRESH_TOKEN, refreshToken);
        }
      }); */
  } catch (e) {
    console.log("Error gordo");
    return "";
  }
}

//Desloguea
export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(EMAIL);
  localStorage.removeItem(KEYROCK_TOKEN);
}

function willExpireToken(token) {
  //para saber si en el proximo minuto caduca
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  return now > exp;
}
