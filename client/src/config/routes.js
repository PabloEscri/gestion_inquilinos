// Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

// Admin Pages
import AdminHome from "../pages/Admin"; //Al ser exportacion default puedo llamarlo AdminHome o como quiera, si en este archivo hubiera una exportacion default y otra no default sería poner AdminHome, {funciones no defaul}
import AdminSingIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import Calendario from "../pages/Admin/Calendario";
import AdminMap from "../pages/Admin/Map";

import AdminDevices from "../pages/Admin/Devices";

import inquilinos from "../pages/Admin/inquilinos";
import AdminOutputs from "../pages/Admin/Outputs";
import uploadFile from "../components/uploadFile";
import Policies from "../pages/Admin/Policies";

import Orion from "../pages/Admin/Orion";
import Graph from "../pages/Admin/Graph";
import OrionSend from "../pages/Admin/OrionSend";

import Inmuebles from "../pages/Admin/Inmuebles";

// Pages
import Home from "../pages/Home";
import Garaje from "../pages/Users/Garaje";

// Other
import Error404 from "../pages/Error404";

//Las routes se llaman desde App
const routes = [
  {
    path: "/admin", //Siempre que pongan /admin se les cargara Layaout Admin y una de las rutas siguientes
    // /admin/contact cargaría el componente LayoutAdmin
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: uploadFile,
        exact: true,
      },
      {
        path: "/admin/inquilinos",
        component: inquilinos,
        exact: true,
      },
      {
        path: "/admin/calendario",
        component: Calendario,
        exact: true,
      },
      {
        path: "/admin/login",
        component: AdminSingIn,
        exact: true,
      },
      {
        path: "/admin/users",
        component: AdminUsers,
        exact: true,
      },
      {
        path: "/admin/map",
        component: AdminMap,
        exact: true,
      },
      {
        path: "/admin/output",
        component: AdminOutputs,
        exact: true,
      },
      {
        path: "/admin/devices",
        component: AdminDevices,
        exact: true,
      },
      {
        path: "/admin/addservice",
        component: AdminDevices,
        exact: true,
      },
      {
        path: "/admin/mypolicies",
        component: Policies,
        exact: true,
      },
      {
        path: "/admin/orion",
        component: Orion,
        exact: true,
      },
      {
        path: "/admin/orion_send",
        component: OrionSend,
        exact: true,
      },
      {
        path: "/admin/graph",
        component: Graph,
        exact: true,
      },
      {
        path: "/admin/inmuebles",
        component: Inmuebles,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    /* component: LayoutBasic,*/
    component: Home,
    exact: true,
  },
  {
    path: "/home",
    component: Home,
    exact: true,
  },
  {
    path: "/acceder/:id",
    component: Garaje,
    exact: false,
  },
  // {
  //   path: "/acceder",
  //   component: Garaje,
  //   exact: true,
  // },
];

export default routes;
