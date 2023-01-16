import React /* { useState, useEffect } */ from "react";
//import { Line } from "@ant-design/charts";
import "./Policies.scss";
import {useKeyRock} from "../../../hooks";
import TablePlot from "../../../components/Admin/Graphs/Table";
import { Tag } from "antd";
import Moment from "moment";

const columns = [
  {
    title: "Status",
    key: "Status",
    dataIndex: "Status",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          // let color = tag.length > 5 ? "geekblue" : "green";
          var color;
          if (tag === "Expired") {
            color = "volcano";
          } else if (tag === "Deny") {
            color = "orange";
          } else if (tag === "Soon") {
            color = "yellow";
          } else {
            color = "green";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Policies",
    dataIndex: "Politicas",
    key: "Politicas",
  },
  {
    title: "Actions",
    dataIndex: "Metodos",
    key: "Metodos",
  },
  {
    title: "Licenses",
    dataIndex: "Licenses",
    key: "Licenses",
    render: (_, { Licenses }) => (
      <>
        <a
          href="https://ishareworks.atlassian.net/wiki/spaces/IS/pages/70221903/Licenses"
          target="_blank"
          rel="noreferrer"
        >
          {Licenses}
        </a>
      </>
    ),
  },
  {
    title: "Initial_Date",
    dataIndex: "Initial_Date",
    key: "Initial_Date",
  },
  {
    title: "Final_Date",
    dataIndex: "Final_Date",
    key: "Final_Date",
  },
  {
    title: "Attributes",
    dataIndex: "Attributes",
    key: "Attributes",
  },
  {
    title: "Identifiers",
    dataIndex: "Identifiers",
    key: "Identifiers",
  },
  {
    title: "Rules",
    dataIndex: "Rules",
    key: "Rules",
  },
];

export default function Policies(props) {
  const { tokenKeyrock2,/*  isLoading2, */ rawtokenKeyrock2 } = useKeyRock();
  try {
    console.log("Policies");
    //console.log(tokenKeyrock2);
    console.log();
    console.log("Policies");
    var token = JSON.stringify(tokenKeyrock2, null, 2);
    var dataSource = [];
    console.log("Tiempo: ");
    console.log(Number(tokenKeyrock2.delegationEvidence.notOnOrAfter));
    console.log(Date.now());
    tokenKeyrock2.delegationEvidence.policySets.map(function (x) {
      x.policies.map(function (y) {
        console.log(y);
        console.log(y);
        dataSource.push({
          Politicas: y.target.resource.type,
          Metodos: y.target.actions,
          Licenses: x.target.environment.licenses,
          Initial_Date: Moment.unix(
            Number(tokenKeyrock2.delegationEvidence.notBefore)
          )
            .utcOffset(2)
            .format("YYYY/MM/DD - hh:mm:ss"),

          Final_Date: Moment.unix(
            Number(tokenKeyrock2.delegationEvidence.notOnOrAfter)
          )
            .utcOffset(2)
            .format("YYYY/MM/DD - hh:mm:ss"),
          Attributes: y.target.resource.attributes,
          Identifiers: y.target.resource.identifiers,
          Rules: y.rules[0].effect,
          tags:
            Number(tokenKeyrock2.delegationEvidence.notOnOrAfter) * 1000 -
              Date.now() >
            0
              ? Number(tokenKeyrock2.delegationEvidence.notBefore) * 1000 -
                  Date.now() <
                0
                ? y.rules[0].effect === "Deny"
                  ? ["Deny"]
                  : ["Active"]
                : ["Soon"]
              : ["Expired"],
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
  return (
    <>
      <h2>Policies associated with this token: {tokenKeyrock2.email} are: </h2>
      <span>
        Info about Licenses can be found{" "}
        <a
          href="https://ishareworks.atlassian.net/wiki/spaces/IS/pages/70221903/Licenses"
          target="_blank"
          rel="noreferrer"
        >
          here.
        </a>
      </span>
      <TablePlot data={dataSource} columns={columns} />
      <h4>
        KeyRock Token expires in this date:{" "}
        {Moment.unix(Number(tokenKeyrock2.exp))
          .utcOffset(2)
          .format("YYYY/MM/DD - hh:mm:ss")}{" "}
      </h4>
      <br></br>
      <div className="hola">
        <p type="text">{rawtokenKeyrock2}</p>
        <br></br>
        <pre>{token}</pre>
      </div>
    </>
  );
}
