import React, { useState, useEffect } from "react";
import { Line, Pie, Column } from "@ant-design/charts";
import { Tabs, Progress, Card, Col, Row } from "antd";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import ReactDOM from "react-dom";
import { Heatmap } from "@ant-design/plots";
import "./Graph.scss";
import { getExcelFromID } from "../../../api/graphExcel";
import { getAccessTokenApi } from "../../../api/auth";
//Los ejemplos se encuentran aquí --->  https://charts.ant.design/en/examples/gallery

export default function DemoColumn(props) {
  // var data = [
  //   {
  //     name: "London",
  //     月份: "Jan.",
  //     月均降雨量: 18.9,
  //   },
  //   {
  //     name: "London",
  //     月份: "Feb.",
  //     月均降雨量: 28.8,
  //   },
  //   {
  //     name: "London",
  //     月份: "Mar.",
  //     月均降雨量: 39.3,
  //   },
  //   {
  //     name: "London",
  //     月份: "Apr.",
  //     月均降雨量: 81.4,
  //   },
  //   {
  //     name: "London",
  //     月份: "May",
  //     月均降雨量: 47,
  //   },
  //   {
  //     name: "London",
  //     月份: "Jun.",
  //     月均降雨量: 20.3,
  //   },
  //   {
  //     name: "London",
  //     月份: "Jul.",
  //     月均降雨量: 24,
  //   },
  //   {
  //     name: "London",
  //     月份: "Aug.",
  //     月均降雨量: 35.6,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Jan.",
  //     月均降雨量: 12.4,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Feb.",
  //     月均降雨量: 23.2,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Mar.",
  //     月均降雨量: 34.5,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Apr.",
  //     月均降雨量: 99.7,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "May",
  //     月均降雨量: 52.6,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Jun.",
  //     月均降雨量: 35.5,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Jul.",
  //     月均降雨量: 37.4,
  //   },
  //   {
  //     name: "Berlin",
  //     月份: "Aug.",
  //     月均降雨量: 42.4,
  //   },
  // ];

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let code = params.get("id");
  var id_excel = code.split(".")[0];
  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);
  const token = getAccessTokenApi(); //Authorization token
  useEffect(() => {
    getExcelFromID(token, id_excel).then((response) => {
      //console.log(response.DATA);
      setdata1(response.DATA.data1);
      setdata2(response.DATA.data2);
    });
  }, []); //Solo se refresca si cambian estos

  var config1 = {
    data: data1,
    isGroup: true,
    // xField: "月份",
    // yField: "月均降雨量",
    xField: "type",
    yField: "value",
    seriesField: "name", //Cada uno de los colores
    label: {
      position: "top",
      layout: [
        { type: "interval-adjust-position" },
        { type: "interval-hide-overlap" },
        { type: "adjust-color" },
      ],
    },
  };

  var config2 = {
    data: data2,
    isGroup: true,
    // xField: "月份",
    // yField: "月均降雨量",
    xField: "type",
    yField: "value",
    seriesField: "name", //Cada uno de los colores
    label: {
      position: "top",
      layout: [
        { type: "interval-adjust-position" },
        { type: "interval-hide-overlap" },
        { type: "adjust-color" },
      ],
    },
  };
  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={30}>
          <Col span={12}>
            <h1 className="titulos">TOURS</h1>
            <Card title="Info of tours: " bordered={false}>
              <Column {...config1} />
            </Card>
          </Col>
          <Col span={8}>
            <h1 className="titulos">VEHICLES</h1>
            <Card title="Info of vehicles: " bordered={false}>
              <Column {...config2} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Card title="Info of vehicles: " bordered={false}>
              <Progress
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={99.9}
              />
              <Progress
                strokeColor={{
                  from: "#108ee9",
                  to: "#87d068",
                }}
                percent={99.9}
                status="active"
              />
              <Progress
                type="circle"
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={90}
              />
              <Progress
                type="circle"
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                percent={100}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Tabs defaultActiveKey="1" onChange={() => {}}>
                <Tabs.TabPane tab="MobX" key="1">
                  <h1 className="titulos">TOURS</h1>
                  <Card title="Info of tours: " bordered={false}>
                    <Column {...config1} />
                  </Card>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 2" key="2">
                  Content of Tab Pane 2
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
