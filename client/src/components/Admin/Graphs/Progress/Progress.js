import React, { useState } from "react";
import { Progress } from "antd";

export default function ProgressBar(props) {
  const { percentage } = props;
  var color = "";

  const black = {
    color_name: "black",
    color_string: "#000000",
    percentage: 10,
  };
  const red1 = {
    color_name: "red1",
    color_string: "#CA2515",
    percentage: 20,
  };
  const red2 = {
    color_name: "red2",
    color_string: "#FA1B05",
    percentage: 30,
  };
  const orange1 = {
    color_name: "orange1",
    color_string: "#F95C03",
    percentage: 40,
  };
  const orange2 = {
    color_name: "orange2",
    color_string: "#F99103",
    percentage: 50,
  };
  const yellow1 = {
    color_name: "yellow1",
    color_string: "#F9BD03",
    percentage: 60,
  };
  const yellow2 = {
    color_name: "yellow2",
    color_string: "#E0E305",
    percentage: 70,
  };
  const green1 = {
    color_name: "green1",
    color_string: "#A6E305",
    percentage: 80,
  };
  const green2 = {
    color_name: "green2",
    color_string: "#60E305",
    percentage: 90,
  };
  const green3 = {
    color_name: "green3",
    color_string: "#11C90B",
    percentage: 100,
  };
  let list_colors = [
    black,
    red1,
    red2,
    orange1,
    orange2,
    yellow1,
    yellow2,
    green1,
    green2,
    green3,
  ];

  for (var i = 0; i < list_colors.length; i++) {
    if (percentage < list_colors[i].percentage) {
      color = list_colors[i].color_string;
      break;
    }
  }

  return (
    <Progress
      type="circle"
      strokeColor={{
        "0%": color,
        "100%": color,
      }}
      percent={percentage}
    />
  );
}
