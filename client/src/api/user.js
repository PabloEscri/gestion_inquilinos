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

export async function createUser(accessToken, data) {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (data.fileAvatar) {
      formData.append("avatar", data.fileAvatar);
    }

    const url = `${basePath}/${apiVersion}/user`;
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
    throw error;
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

export function getUsersActiveApi(token, status) {
  const url = `${basePath}/${apiVersion}/users-active?active=${status}`;

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

export function updateUserApi(token, user, userId) {
  const url = `${basePath}/${apiVersion}/user/${userId}`;

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

export function activateUserApi(token, userId, status) {
  const url = `${basePath}/${apiVersion}/activate-user/${userId}`;

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

export async function Keyrock(idp) {
  /* console.log("Keyrock");
  console.log(idp); */
  const url = `${basePath}/${apiVersion}/i4trust/userInfo2`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      idp: idp,
    },
    body: JSON.stringify({}),
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

export function sendFile(data) {
  const url = `${basePath}/${apiVersion}/subir-file`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      headers: "",
    },
  };
  // console.log(data);

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

export function getSimulations(token) {
  const url = `${basePath}/${apiVersion}/get-simulaciones`;
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
      //console.log(response);
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

export function getOutputSimulationFile(token, id_simulation) {
  const url = `${basePath}/${apiVersion}/get-output-simulacion/${id_simulation}`;
  //console.log(url);
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => response.blob())
    .then((blobby) => {
      let anchor = document.createElement("a");
      document.body.appendChild(anchor);
      let objectUrl = window.URL.createObjectURL(blobby);

      anchor.href = objectUrl;
      anchor.download = `${id_simulation}`;
      anchor.click();

      window.URL.revokeObjectURL(objectUrl);
    })
    .catch((err) => {
      return err.message;
    });
}

export function getInputSimulationFile(token, id_simulation) {
  const url = `${basePath}/${apiVersion}/get-input-simulacion/${id_simulation}`;
  //console.log(url);
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => response.blob())
    .then((blobby) => {
      let anchor = document.createElement("a");
      document.body.appendChild(anchor);
      let objectUrl = window.URL.createObjectURL(blobby);

      anchor.href = objectUrl;
      anchor.download = `${id_simulation}`;
      anchor.click();

      window.URL.revokeObjectURL(objectUrl);
    })
    .catch((err) => {
      return err.message;
    });
}

// export function deleteSimulationFile(token, id_simulation) {
//   const url = `${basePath}/${apiVersion}/user-simulacion/${id_simulation}`;
//   console.log(url);
//   const params = {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//   };

//   return fetch(url, params)
//     .then((response) => {

//       setReloadUsers(true);
//       console.log(response);
//       return response.json();
//     })
//     .then((result) => {
//       console.log(result);
//       return result;
//     })
//     .catch((err) => {
//       return err.message;
//     });
// }
