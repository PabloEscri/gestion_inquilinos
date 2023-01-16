import React from "react";
import ReactDOM from "react-dom";
import {createRoot} from 'react-dom/client';
import "antd/dist/antd.css";
import "./index.scss";
import App from "./App";
import './i18n'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from "./reportWebVitals";

//deprecated Si se descomenta lo de abajo se añade la 
//nueva config... pero entonces habrá que retocafr las rutas del menu 
 //ReactDOM.render(<App />, document.getElementById("root"));
 const rootElement = document.getElementById('root');
 const root = createRoot(rootElement);
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
); 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.register();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();