import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersActiveApi, Keyrock } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Modal, List } from "antd";
import esES from "antd/lib/locale/es_ES";
import {
  abrirPuertaInquilinoApi,
  getInquilinosApi,
} from "../../../api/inquilino";
import { getNombreInmueble } from "../../../api/inmueble";
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
  let listData = [];
  days.map((element) => {
    // console.log("Dia", element[0]);
    // console.log("Dia", Dayjs.date());
    if (Dayjs.year() === element[2]) {
      if (Dayjs.month() === element[1]) {
        // console.log("Mes", element[1]);
        // console.log("Mes", Dayjs.month());
        if (Dayjs.date() === element[0]) {
          //console.log("Estoy dentro");
          let string = "Limpiar " + element[3];
          listData.push({ type: "warning", content: string });
        }
      }
    }
  });

  return listData || [];
};
const getListData2 = (Dayjs, days) => {
  //console.log("Eo2", days);
  let listData = [];
  days.map((element) => {
    if (Dayjs.year() === element[6]) {
      if (Dayjs.month() === element[5]) {
        // console.log("Mes", element[1]);
        // console.log("Mes", Dayjs.month());
        if (Dayjs.date() === element[4]) {
          console.log("Estoy dentro");
          let string = "Entrada " + element[3];
          listData.push({ type: "success", content: string });
        }
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
  const [reload, setReload] = useState(false); //Todos los usuarios

  useEffect(() => {
    const token = getAccessTokenApi();
    getInquilinosApi(token, true).then((response) => {
      console.log("calendario");
      let days = [];

      const promises = response.users.map((item) => {
        console.log(item.fecha_entrada);
        return getNombreInmueble(item.inmueble, token).then((response) => {
          return [
            moment(item.fecha_salida, "YYYY-MM-DD").date(),
            moment(item.fecha_salida, "YYYY-MM-DD").month(),
            moment(item.fecha_salida, "YYYY-MM-DD").year(),
            response.message,
            moment(item.fecha_entrada, "YYYY-MM-DD").date(),
            moment(item.fecha_entrada, "YYYY-MM-DD").month(),
            moment(item.fecha_entrada, "YYYY-MM-DD").year(),
          ];
        });
      });

      Promise.all(promises).then((values) => {
        days = values;
        setMisDays(days);
      });
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
    const listData = getListData(Dayjs, mis_days);
    const listData2 = getListData2(Dayjs, mis_days);

    const showModal = () => {
      Modal.info({
        title: "Eventos",
        content: (
          <>
            {listData.length === 0 ? (
              <></>
            ) : (
              <List
                size="small"
                bordered
                dataSource={listData}
                renderItem={(item) => (
                  <List.Item>
                    <Badge status={item.type} text={item.content} />
                  </List.Item>
                )}
              />
            )}
            {listData2.length === 0 ? (
              <></>
            ) : (
              <List
                size="small"
                bordered
                dataSource={listData2}
                renderItem={(item) => (
                  <List.Item>
                    <Badge status={item.type} text={item.content} />
                  </List.Item>
                )}
              />
            )}
          </>
        ),
      });
    };
    let numero_limpiezas = 0;
    console.log("listData2", listData2);
    console.log("listData", listData);
    return (
      <>
        <div onClick={showModal} style={{ width: "100%", height: "100%" }}>
          {listData.length <= 0 && listData.length > 0 ? (
            <div
              //className={`date-cell-container ${hasOverflow ? "has-overflow" : ""}`}
              className={`has-overflow2`}
            >
              <ul className="events">
                {listData.map((item, index) => {
                  return (
                    <li key={item.content}>
                      <Badge status={item.type} text={item.content} />
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : listData.length >= 1 ? (
            <div
              //className={`date-cell-container ${hasOverflow ? "has-overflow" : ""}`}
              className={`has-overflow`}
            >
              <span>{listData.length} limpiezas</span>
            </div>
          ) : (
            <div></div>
          )}
          {listData2.length <= 0 && listData2.length > 0 ? (
            <div
              //className={`date-cell-container ${hasOverflow ? "has-overflow" : ""}`}
              className={`date-cell-container has-overflow2`}
            >
              <ul className="events">
                {listData2.map((item, index) => {
                  return (
                    <li key={item.content}>
                      <Badge status={item.type} text={item.content} />
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : listData2.length >= 1 ? (
            <div
              //className={`date-cell-container ${hasOverflow ? "has-overflow" : ""}`}
              className={`has-overflow2`}
            >
              <span>{listData2.length} entradas</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </>
    );
  };
  const locale = {
    ...esES,
  };
  return (
    <Calendar
      locale={locale}
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
}
