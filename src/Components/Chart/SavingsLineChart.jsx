import React from "react";
import { ConfigProvider, Tooltip } from "antd";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "M",
    pv: 42,
  },
  {
    name: "T",
    pv: 73,
  },
  {
    name: "W",
    pv: 88,
  },
  {
    name: "T",
    pv: 54,
  },
  {
    name: "F",
    pv: 38,
  },
  {
    name: "S",
    pv: 98,
  },
  {
    name: "S",
    pv: 43,
  },
];

const SavingsLineChart = () => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}K`;
  // Custom tick style
  const tickStyle = { fill: "white" };

  return (
    <div className="rounded-lg">
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "rgb(74, 74, 74)",
              colorIcon: "#e1e1e1",
              borderRadiusLG: 0,
            },
          },
        }}
      ></ConfigProvider>
      <div className="mx-auto py-3 bg-[#1D1D1D] rounded-lg">
        <div className="flex justify-between items-center mr-5">
          <h1 className="text-2xl p-2 font-bold text-[#29606C]">Savings</h1>
        </div>
        <div className="mx-auto bg-[#1D1D1D] rounded-lg">
          <LineChart
            width={730}
            height={339}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="rgba(221, 17, 34, 1)"
                  stopOpacity="1"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(150, 150, 150, 0.13)"
                  stopOpacity="0.9"
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickMargin={6}
              tick={{ ...tickStyle }}
              axisLine={{
                stroke: "#DD1122",
                strokeWidth: 2,
              }}
            />
            <YAxis
              axisLine={{
                stroke: "#DD1122",
                strokeWidth: 2,
                strokeDasharray: "7 7",
              }}
              tick={{ ...tickStyle }}
              tickFormatter={yAxisTickFormatter}
              tickMargin={16}
            />
            <ReferenceLine y={25} stroke="black" strokeWidth={1} />
            <ReferenceLine y={50} stroke="black" strokeWidth={1} />
            <ReferenceLine y={75} stroke="black" strokeWidth={1} />
            <ReferenceLine y={100} stroke="black" strokeWidth={1} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="url(#colorPv)"
              dot={false}
              strokeWidth={3}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default SavingsLineChart;
