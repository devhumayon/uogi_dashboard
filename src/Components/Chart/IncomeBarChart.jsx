/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useIncomeByYearQuery } from "../../Redux/api/dashboardApi";
import { useEffect, useState } from "react";

const IncomeBarChart = ({ selectedYear }) => {
  // console.log(selectedYear);

  const { data: incomeData, refetch } = useIncomeByYearQuery(selectedYear);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (incomeData) {
      setChartData(incomeData?.data || []);
    }
  }, [incomeData]);

  useEffect(() => {
    refetch();
  }, [selectedYear, refetch]);

  return (
    <div className="w-full ">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar
            name="Income"
            dataKey="income"
            fill="#ff4f78"
            barSize={20}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeBarChart;
