import React from "react";
import { useSelector } from "react-redux";
import StatItem from "./StatItem";
import Wrapper from "../assets/wrappers/StatsContainer";
import { FaRegCalendarCheck, FaTools, FaBan, FaRegClock } from "react-icons/fa";
const StatsContainer = () => {
  const stats = useSelector((state) => state.allRecords.stats);
  const defaultStats = [
    {
      title: "Planned ",
      count: stats.pendingVisitCount || 0,
      icon: <FaRegClock />,
      color: "#4D96FF",
      bcg: "#D6E4FF",
    },
    {
      title: "In Progress ",
      count: stats.pendingTestResultsCount || 0,
      icon: <FaTools />,
      color: "#FFC107",
      bcg: "#FFF3CD",
    },
    {
      title: "Completed Visit ",
      count: stats.completedVisitCount || 0,
      icon: <FaRegCalendarCheck />,
      color: "#28A745",
      bcg: "#D4EDDA",
    },
    {
      title: "Cancelled",
      count: stats.cancelledCount || 0,
      icon: <FaBan />,
      color: "#DC3545",
      bcg: "#F8D7DA",
    },
  ];

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
