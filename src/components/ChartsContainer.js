import React, { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useSelector } from "react-redux";
import PieChart from "./PieChart";
const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const stats = useSelector((state) => state.allRecords.stats);

  const data = useSelector(
    (state) => state.allRecords.stats.monthlyApplications
  );
  const pieChartData = [
    { name: "Sightseeing", value: stats.scheduledAppointmentCount },
    { name: "Adventure", value: stats.emergencyVisitCount },
    { name: "Shopping", value: stats.routineCheckupCount },
    { name: "Dining", value: stats.DiningCount },
    { name: "Relaxation", value: stats.RelaxationCount },
    { name: "Cultural Experience", value: stats.CulturalCount },
  ];
  return (
    <Wrapper>
      <h4>Category Of Activities</h4>
      <PieChart data={pieChartData} />
      <h4>Monthly Records</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
