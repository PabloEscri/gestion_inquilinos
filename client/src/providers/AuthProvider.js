import React, { useState, useEffect, createContext } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN,EMAIL} from "../utils/constants";
import jwtDecode from "jwt-decode";
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout,
  getEmail,
} from "../api/auth";

export const AuthContext = createContext();

//Checkeamos si el usuario está registrado
export async function checkUserLogin(setUser) {
  //console.log("checkUserLogin");
  //Obtengo el access token
  const accessToken_ = getAccessTokenApi();
 
  //si es null o false se refresca
  if (!accessToken_) {
    //console.log("AT 2");
    //console.log(accessToken_);
    const refreshToken_ = getRefreshTokenApi();
    
    //console.log("AT 3");
    //console.log(accessToken_);
    //Si no hay token deslogeamos
    if (!refreshToken_) {
      //console.log("AT 3");
      setUser({
        user: null,
        isLoading: false,
        email: null
      });

      logout();
    } else {
      //console.log("AT 4");

     const result= await refreshAccessTokenApi(refreshToken_)
     const email = getEmail();
       const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken); 
      localStorage.setItem(EMAIL, email); 
      //const accessToken = getAccessTokenApi();
      console.log("AT---4.1");
       setUser({
        isLoading: false,
        user: jwtDecode(accessToken),
        email: email
      });  
    }
  } else {
    //console.log("AT 5");
    const email = getEmail();
    setUser({
      isLoading: false,
      user: jwtDecode(accessToken_),
      email: email
    });
  }
}


export default function AuthProvider(props) {
  //Las props del AuthProvider es el hijo (lo que envuelves con él, en App.js vemos que sería el Router)

  //console.log("function AuthProvider");
  const { children } = props;
  const [users, setUser] = useState({
    user: null,
    isLoading: true,
    email:null,
  });
  //console.log("useEffect");
  //Siempre se va a ejecutar si está registrado
  useEffect(() => {
   // console.log('ha entrado')
    try {
      checkUserLogin(setUser);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const data ={
    users,
    setUser
  }

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
  // Aqui lo que estamos haciendo es envolver todo el Router de App.js que es lo que es el children y le estamos pasando el valor de user a toda la web Ej ver LayoutAdmin como consume del contexto el user
}
