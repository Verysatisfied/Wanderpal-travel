import React from "react";
import { useSelector } from "react-redux";
import StatItem from "./StatItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const stats = useSelector((state) => state.allRecords.stats);

  const defaultStats = [
    {
      title: "pending Visit ",
      count: stats.pendingVisitCount || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "pending Test Results ",
      count: stats.pendingTestResultsCount || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
    {
      title: "completed Visit ",
      count: stats.completedVisitCount || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
  ];

  // const pieChartData = [
  //   { name: "Scheduled Appointment", value: stats.scheduledAppointmentCount },
  //   { name: "Emergency Visit", value: stats.emergencyVisitCount },
  //   { name: "Routine Checkup", value: stats.routineCheckupCount },
  // ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => (
        <StatItem key={index} {...item} />
      ))}
      {/* <PieChart data={pieChartData} /> */}
    </Wrapper>
  );
};
export default StatsContainer;
