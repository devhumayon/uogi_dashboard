import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Legend,
  Line,
} from "recharts";

const data = [
  {
    name: "Patient",
    total: 35,
  },
  {
    name: "Patient",
    total: 10,
  },
  {
    name: "Patient",
    total: 58,
  },
  {
    name: "Patient",
    total: 10,
  },
  {
    name: "Patient",
    total: 30,
  },
  {
    name: "Patient",
    total: 90,
  },
  {
    name: "Patient",
    total: 19,
  },
  {
    name: "Patient",
    total: 95,
  },
  {
    name: "Patient",
    total: 45,
  },
  {
    name: "Patient",
    total: 80,
  },
];

const Line_Chart = () => {
  return (
    <div className="w-full h-96 p-5 rounded">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#00000040" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#7086FD" // Adjusted to a blue tone
            strokeWidth={2}
            dot={{ r: 5, stroke: "#7086FF", strokeWidth: 2, fill: "#00000040" }} // Customize dots with blue stroke and white fill
            activeDot={{ r: 8 }} // Active dot styling
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Line_Chart;
