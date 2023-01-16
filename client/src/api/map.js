import { basePath, apiVersion } from "./config";

export function getCurrentLocation(token) {
  const url = `${basePath}/${apiVersion}/get-current-location`;
  //console.log(url);
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((result) => {
      // console.log(result);
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}
export function getCurrentLocationI4trust(token) {
  const url = `${basePath}/${apiVersion}/get-current-location-i4trust`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      userAccessToken: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((result) => {
      // console.log(result);
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}
