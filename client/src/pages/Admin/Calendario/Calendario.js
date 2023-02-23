import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersActiveApi, Keyrock } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import {
  abrirPuertaInquilinoApi,
  getInquilinosApi,
} from "../../../api/inquilino";
import "./Calendario.scss";
import moment from "moment";
import { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import { Dayjs } from "dayjs";

// const getListData = (Dayjs) => {
//   let listData;
//   switch (Dayjs.date()) {
//     case 8:
//       listData = [
//         { type: "warning", content: "This is warning event." },
//         { type: "success", content: "This is usual event." },
//       ];
//       break;
//     case 10:
//       listData = [
//         { type: "warning", content: "This is warning event." },
//         { type: "success", content: "This is usual event." },
//         { type: "error", content: "This is error event." },
//       ];
//       break;
//     case 15:
//       listData = [
//         { type: "warning", content: "This is warning event" },
//         { type: "success", content: "This is very long usual event。。...." },
//         { type: "error", content: "This is error event 1." },
//         { type: "error", content: "This is error event 2." },
//         { type: "error", content: "This is error event 3." },
//         { type: "error", content: "This is error event 4." },
//       ];
//       break;
//     default:
//   }
//   return listData || [];
// };
const getListData = (Dayjs, days) => {
  //console.log("Eo2", days);
  let listData;
  days.map((element) => {
    console.log("Dia", element[0]);
    console.log("Dia", Dayjs.date());
    if (Dayjs.date() === element[0]) {
      console.log("Mes", element[1]);
      console.log("Mes", Dayjs.month());
      if (Dayjs.month() === element[1]) {
        console.log("Estoy dentro");
        listData = [{ type: "warning", content: "Limpieza" }];
      }
    }
  });

  return listData || [];
};

const getMonthData = (Dayjs) => {
  if (Dayjs.month() === 8) {
    return 1394;
  }
};

export default function Calendario() {
  const [mis_days, setMisDays] = useState([]); //Todos los usuarios

  useEffect(() => {
    const token = getAccessTokenApi();
    getInquilinosApi(token, true).then((response) => {
      console.log("calendario"); //"
      let days = [];
      response.users.map((item) => {
        console.log(item.fecha_entrada);

        days.push([
          moment(item.fecha_entrada, "MM/DD/YYYY").date(),
          moment(item.fecha_entrada, "MM/DD/YYYY").month(),
        ]);
      });
      setMisDays(days);
      console.log("Eo1", mis_days);
    });
  }, []);
  const monthCellRender = (Dayjs) => {
    const num = getMonthData(Dayjs);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (Dayjs) => {
    //console.log("dateCellRender", mis_days);
    const listData = getListData(Dayjs, mis_days);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
}
