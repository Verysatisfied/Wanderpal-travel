import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const PieChartComponent = ({ data }) => {
  const colors = ["#36A2EB", "#FF6384", "#FFCE56"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${name} (${value})`, ""]}
          labelFormatter={(name) => ""}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
