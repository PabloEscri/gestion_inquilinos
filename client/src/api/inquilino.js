import { basePath, apiVersion } from "./config";

export function signUpApi(data) {
  const url = `${basePath}/${apiVersion}/sign-up`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  //console.log(data);

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.user) {
        return { ok: true, message: "Usuario creado correctamente" };
      }
      return { ok: false, message: result.message };
    })
    .catch((err) => {
      return { ok: false, message: err.message };
    });
}

//Logeo del usuario en la web
export function signInApi(data) {
  console.log(basePath);
  if (data.idp == "EU.EORI.BELURBIKE22") {
    /* data.email = "pruebasIta@ita.es";
    data.password = "123456"; */
    //console.log('EU.EORI.BELURBIKE22')
  } else {
    //console.log('EU.EORI.capillarit')
  }

  const url = `${basePath}/${apiVersion}/sign-in`;

  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      //console.log(result);
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}
export async function getMe(accessToken) {
  try {
    const url = `${basePath}/${apiVersion}/user/me`;
    const params = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    if (response.status !== 200) throw result;

    return result;
  } catch (error) {
    throw error;
  }
}

export async function createInquilino(accessToken, data) {
  try {
    console.log("formData");
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    console.log(formData);
    const url = `${basePath}/${apiVersion}/inquilino`;
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

export function getInquilinosActiveApi(token, status) {
  const url = `${basePath}/${apiVersion}/inquilinos-active?active=${status}`;

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

export function getInquilinosApi(token, status) {
  const url = `${basePath}/${apiVersion}/inquilinos?active=${status}`;

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

export function updateInquilinoApi(token, user, userId) {
  const url = `${basePath}/${apiVersion}/inquilino/${userId}`;

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

export function activateInquilinoApi(token, userId, status) {
  const url = `${basePath}/${apiVersion}/activate-inquilino/${userId}`;

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

export function deleteInquilinoApi(token, userId) {
  const url = `${basePath}/${apiVersion}/inquilino/${userId}`;

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

export function abrirPuertaInquilinoApi(code) {
  const url = `${basePath}/${apiVersion}/inquilino-abrir`;
  console.log("abrirPuertaInquilinoApi", code);

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
      console.log("abrirPuertaInquilinoApi", response);
      return response.json();
    })
    .catch((err) => {
      return err.message;
    });
}
