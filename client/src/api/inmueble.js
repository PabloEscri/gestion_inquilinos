import { basePath, apiVersion } from "./config";
// 1- Crear un inmueble nuevo
// 2- Leer todos los inmuebles
// 3- Eliminar un inmueble
// 4- Actualizar un inmueble
// 5- Dada una casa leer la temperatura de la casa
// 6- Dada una casa leer la potencia de la casa
// 7- Dada una casa Activar shelly 1,2 o 3 de la casa
// 8- Obtener los status del shelly 1,2 o 3 de la casa

export async function createInmueble(accessToken, data) {
  try {
    console.log("formData");
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    console.log(formData);
    const url = `${basePath}/${apiVersion}/Inmueble`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 201) throw result;

    return result;
  } catch (error) {
    console.log(error);
  }
}
//El token es necesario para poder atacar al backend
export function getUsersApi(token) {
  const url = `${basePath}/${apiVersion}/users`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export function getInmueblesActiveApi(token, status) {
  const url = `${basePath}/${apiVersion}/Inmuebles-active?active=${status}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export function getInmueblesApi(token, status) {
  const url = `${basePath}/${apiVersion}/Inmuebles`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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
export function uploadAvatarApi(token, avatar, userId) {
  const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;

  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token,
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

export function getAvatarApi(avatarName) {
  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}

export function updateInmuebleApi(token, user, userId) {
  const url = `${basePath}/${apiVersion}/Inmueble/${userId}`;

  const params = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(user),
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

export function activateInmuebleApi(token, userId, status) {
  const url = `${basePath}/${apiVersion}/activate-Inmueble/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      active: status,
    }),
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

export function deleteUserApi(token, userId) {
  const url = `${basePath}/${apiVersion}/user/${userId}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export function signUpAdminApi(token, data) {
  const url = `${basePath}/${apiVersion}/sign-up-admin`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
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

export function deleteInmuebleApi(token, userId) {
  const url = `${basePath}/${apiVersion}/Inmueble/${userId}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export function abrirPuertaInmuebleApi(code) {
  const url = `${basePath}/${apiVersion}/Inmueble-abrir`;
  console.log("abrirPuertaInmuebleApi", code);

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: code,
    }),
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

export function getInmuebleTemperatura(code_casa, accessToken) {
  const url = `${basePath}/${apiVersion}/inmueble/${code_casa}/temperature`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    // body: JSON.stringify({
    //   code: code,
    // }),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err.message;
    });
}
export function getInmueblePotencia(code_casa, accessToken) {
  const url = `${basePath}/${apiVersion}/inmueble/${code_casa}/potencia`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    // body: JSON.stringify({
    //   code: code,
    // }),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err.message;
    });
}
export function conmutarInmuebleRele(
  code_casa,
  code_sensor,
  estado,
  accessToken
) {
  const url = `${basePath}/${apiVersion}/inmueble/${code_casa}/cambiar-estado/${code_sensor}/${estado}`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    // body: JSON.stringify({
    //   code: code,
    // }),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err.message;
    });
}
