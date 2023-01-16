import { useContext } from "react";
import { KeyRockContext } from "../providers/KeyRockProvider";
//console.log("Hola");
// eslint-disable-next-line import/no-anonymous-default-export
export const useKeyRock = () => useContext(KeyRockContext);
