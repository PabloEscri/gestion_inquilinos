import React from "react";
import cookies from "js-cookie";
export default function Error404() {
  // console.log("..");
  // console.log(cookies.get("Cookies"));
  // console.log("0-");
  // console.log(sessionStorage.length);
  // console.log("1-");
  // for (let i = 0; i < localStorage.length; i++) {
  //   let key = localStorage.key(i);
  //   alert(`${key}: ${localStorage.getItem(key)}`);
  //   console.log(`${key}: ${localStorage.getItem(key)}`);
  // }
  // console.log("2-");
  // for (let i = 0; i < sessionStorage.length; i++) {
  //   let key = sessionStorage.key(i);
  //   alert(`${key}: ${sessionStorage.getItem(key)}`);
  //   console.log(`${key}: ${sessionStorage.getItem(key)}`);
  // }
  // console.log("..");
  return (
    <div>
      <h2>Error 404...</h2>
    </div>
  );
}
