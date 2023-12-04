import React from "react";
import {
  ResponsiveContainer,
  AreaChart as RechartAreaChart, // Rename the import to avoid conflict
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AreaChart = ({ data }) => {
  const mdata = Object.entries(data).map(([date, count]) => ({
    date: date.toString(),
    count: count,
  }));
  mdata.sort((a, b) => a.date - b.date);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartAreaChart data={mdata} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#1e3a8a" fill="#3b82f6" />
      </RechartAreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
