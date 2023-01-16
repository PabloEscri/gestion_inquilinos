import React, { useState } from "react";
import { Table } from "antd";

export default function TablePlot(props) {
  const { data, columns } = props;

  //return <Table dataSource={data} columns={columns} rowSelection={1} />;
  return (
    <Table
      dataSource={data}
      columns={columns}
      scroll={{ y: 280, x: 200 }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["2", "5", "10", "20", "30"],
      }}
    />
  );
}

// var dataSource = [
//   {
//     name: "Furgoneta1",
//     owner: "Miguel",
//     status: "Offline",
//     model: "Furgoneta",
//     update: false,
//   },
//   {
//     name: "Bici1",
//     owner: "Juan",
//     status: "Online",
//     model: "Bici de carga",
//     update: false,
//   },
// ];

// const columns = [
//   {
//     title: "Device Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Device Owner",
//     dataIndex: "owner",
//     key: "owner",
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//     key: "status",
//   },
//   {
//     title: "Device Model",
//     dataIndex: "model",
//     key: "model",
//   },
//   {
//     title: "Last Updated",
//     dataIndex: "update",
//     key: "update",
//   },
// ];
