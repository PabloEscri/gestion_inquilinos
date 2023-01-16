import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
//console.log("Hola");
// eslint-disable-next-line import/no-anonymous-default-export
export  const useAuth = () => useContext(AuthContext);
