import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "1",
    uv: 4000,
    item: "mobile",
  },
  {
    name: "2",
    uv: 3000,
    item: "mobile",
  },
  {
    name: "3",
    uv: 2000,
    item: "mobile",
  },
  {
    name: "4",
    uv: 2780,
    item: "mobile",
  },
  {
    name: "5",
    uv: 1890,
    item: "mobile",
  },
  {
    name: "6",
    uv: 2390,
    item: "mobile",
  },
  {
    name: "7",
    uv: 3490,
    item: "mobile",
  },
  {
    name: "8",
    uv: 3490,
    item: "mobile",
  },
  {
    name: "9",
    uv: 3490,
    item: "mobile",
  },
  {
    name: "10",
    uv: 3490,
    item: "mobile",
  },
  {
    name: "11",
    uv: 3490,
    item: "mobile",
  },
  {
    name: "12",
    uv: 3490,
    item: "mobile",
  },
];

export default function TotalLineChart() {
  return (
    <div>
      <LineChart width={500} height={500} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis name="Month" dataKey="name">
          <Label value="Day" offset={-5} position="insideBottomRight" />
          <Label value="February" offset={-5} position="bottom" />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
}
