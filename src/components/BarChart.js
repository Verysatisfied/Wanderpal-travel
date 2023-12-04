import React from "react";
import {
  BarChart as RechartBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChart = ({ data }) => {
  // Convert "date" values to JavaScript Date objects
  const mdata = Object.entries(data).map(([date, count]) => ({
    date: date.toString(),
    count: count,
  }));

  // Sort the data by the "date" property
  mdata.sort((a, b) => a.date - b.date);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartBarChart data={mdata} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="date" type="category" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" barSize={75} />
      </RechartBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
