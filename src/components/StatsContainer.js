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
      icon: <FaRegClock />, // Represents time or scheduling, fitting for "Planned"
      color: "#4D96FF", // Bright blue to signify anticipation or planning
      bcg: "#D6E4FF",
    },
    {
      title: "In Progress ",
      count: stats.pendingTestResultsCount || 0,
      icon: <FaTools />, // Tools icon suggests work being done, suitable for "In Progress"
      color: "#FFC107", // Amber to signify ongoing work or attention needed
      bcg: "#FFF3CD",
    },
    {
      title: "Completed Visit ",
      count: stats.completedVisitCount || 0,
      icon: <FaRegCalendarCheck />, // A checkmark in a calendar, appropriate for completed visits
      color: "#28A745", // Green to signify completion or success
      bcg: "#D4EDDA",
    },
    {
      title: "Cancelled",
      count: stats.cancelledCount || 0,
      icon: <FaBan />, // Ban icon clearly represents cancellation
      color: "#DC3545", // Red to signify cancellation or stopping
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
