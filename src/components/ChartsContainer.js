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
    { name: "Scheduled Appointment", value: stats.scheduledAppointmentCount },
    { name: "Emergency Visit", value: stats.emergencyVisitCount },
    { name: "Routine Checkup", value: stats.routineCheckupCount },
  ];
  return (
    <Wrapper>
      <h4>Medical Type</h4>
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
