/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useIncomeByDaysQuery } from "../../Redux/api/dashboardApi";

const Area_Chart = ({ selectedDays }) => {
  // console.log(selectedDays);
  const { data: incomeData, refetch } = useIncomeByDaysQuery(selectedDays);
  // console.log(incomeData);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (incomeData) {
      setChartData(incomeData?.data || []);
    }
  }, [incomeData]);

  // console.log(chartData);

  useEffect(() => {
    refetch();
  }, [selectedDays, refetch]);

  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tickFormatter={yAxisTickFormatter}
            tick={{ ...tickStyle }}
            tickMargin={16}
            axisLine={{
              stroke: "#E5E5E500", // Y-axis line color
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="25.38%" stopColor="#FE5C8E" stopOpacity={1} />
              <stop offset="100%" stopColor="#FE5C8E00" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Tooltip
            formatter={(value, name, props) => [`${value}K`, "Income"]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#FE5C8E"
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Area_Chart;
