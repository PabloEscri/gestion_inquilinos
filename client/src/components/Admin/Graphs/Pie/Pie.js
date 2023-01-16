import { Pie } from "@ant-design/charts";
export default function DemoPie(props) {
  var data = [
    {
      type: "Salud",
      value: 27,
    },
    {
      type: "Tecnología",
      value: 25,
    },
    {
      type: "Moda",
      value: 18,
    },
    {
      type: "Alimentación",
      value: 15,
    },
    {
      type: "Industrial",
      value: 10,
    },
    {
      type: "Papelería",
      value: 5,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,

    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Distribucion",
      },
    },
  };
  return <Pie {...config} />;
}
