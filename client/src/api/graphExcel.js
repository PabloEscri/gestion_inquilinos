import { basePath, apiVersion,basePathCantant } from "./config";

export function getExcelFromID(token, id) {
  const url = `${basePath}/${apiVersion}/getExcelRaw/${id}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      console.log('ok')
      return response.json();
    })
    .catch((err) => {
      console.log('no')
      return err.message;
    });
}

export function getExcelFromIDProcessed(token, id) {
  const url = `${basePath}/${apiVersion}/getExcelProcess/${id}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      console.log('ok')
      return response.json();
    })
    .catch((err) => {
      console.log('no')
      return err.message;
    });
}

export function getExcelQuentin(data,token) {
  //TODO:Harcoded
  // const url =basePathCantant+idExcel;
  // console.log('esto es el id excel',idExcel)
  const url =basePathCantant;
  console.log(url)
  
  console.log('estaos son los datos',data)
  const params = {
    method: "POST",
    body: JSON.stringify({
      DATA: data,
    }),
    headers: {
      "Content-Type": "application/json",
      //Authorization: token,
    },
  };


  return fetch(url, params)
    .then((response) => {
       console.log("Quentin");
      console.log(response); 
      return response.json();
    })
    .catch((err) => {
      console.log("Quentin2");
      
      console.log("Quentin2", err.message);
      return err.message;
    });
}
