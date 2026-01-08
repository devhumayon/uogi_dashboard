import React, { useState } from "react";
import { Bar, BarChart, Cell, Legend, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Jan", uv: 4000, pv: 2400 },
  { name: "Feb", uv: 3000, pv: 1398 },
  { name: "Mar", uv: 2000, pv: 9800 },
  { name: "Apr", uv: 2780, pv: 3908 },
  { name: "May", uv: 1890, pv: 4800 },
  { name: "Jun", uv: 2390, pv: 3800 },
  { name: "Jul", uv: 3490, pv: 4300 },
  { name: "Aug", uv: 4000, pv: 2400 },
  { name: "Sep", uv: 3000, pv: 1398 },
  { name: "Oct", uv: 2000, pv: 9800 },
  { name: "Nov", uv: 2780, pv: 3908 },
  { name: "Dec", uv: 1890, pv: 4800 },
];

export default function EarningsBarChart() {
  const [focusBar, setFocusBar] = useState(null);

  return (
    <div>
      <BarChart
        width={850}
        height={255}
        data={data}
        onMouseMove={(state) => {
          if (state.isTooltipActive) {
            setFocusBar(state.activeTooltipIndex);
          } else {
            setFocusBar(null);
          }
        }}
      >
        <XAxis dataKey="name" />
        <YAxis tick={false} />
        <Tooltip cursor={{ fill: "transparent" }} />

        <Bar dataKey="pv" barSize={20} radius={[16, 16, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={focusBar === index ? "#29606c" : "#e1e1e1"}
            />
          ))}
        </Bar>
        <Bar dataKey="uv" barSize={20} radius={[16, 16, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={focusBar === index ? "rgba(41, 96, 108, 0.4)" : "#4a4a4a"}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
