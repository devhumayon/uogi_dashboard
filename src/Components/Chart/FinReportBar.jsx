import React from "react";
import { BarChart, Bar, XAxis, YAxis, ReferenceLine } from "recharts";

const data = [
  { name: "Jan", uv: 100 },
  { name: "Feb", uv: 70 },
  { name: "Mar", uv: 50 },
  { name: "Apr", uv: 90 },
  { name: "May", uv: 30 },
  { name: "Jun", uv: 20 },
  { name: "Jul", uv: 85 },
  { name: "Aug", uv: 66 },
  { name: "Sep", uv: 53 },
  { name: "Oct", uv: 96 },
  { name: "Nov", uv: 78 },
  { name: "Dec", uv: 36 },
];

const FinReportBar = () => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}K`;

  // Custom tick style
  const tickStyle = { fill: "white" };

  return (
    <div>
      <BarChart
        width={950}
        height={350}
        data={data}
        margin={{
          top: 10,
        }}
        barCategoryGap={30} // Adjust the gap between bars if necessary
      >
        <XAxis dataKey="name" tick={{ ...tickStyle }} tickMargin={6} />
        <YAxis
          tickFormatter={yAxisTickFormatter}
          tick={{ ...tickStyle }}
          axisLine={{
            stroke: "#DD1122", // Y-axis line color
            strokeWidth: 2,
            strokeDasharray: "7 7",
          }}
          tickMargin={16}
        />
        {/* Add several horizontal black lines using ReferenceLine */}
        <ReferenceLine y={20} stroke="black" strokeWidth={1} />
        <ReferenceLine y={40} stroke="black" strokeWidth={1} />
        <ReferenceLine y={60} stroke="black" strokeWidth={1} />
        <ReferenceLine y={80} stroke="black" strokeWidth={1} />
        <ReferenceLine y={100} stroke="black" strokeWidth={1} />
        <Bar
          dataKey="uv"
          fill="#DD1122" // Bar color
          radius={[10, 10, 0, 0]} // Rounded top corners
          barSize={12} // Width of each bar
        />
      </BarChart>
    </div>
  );
};

export default FinReportBar;
