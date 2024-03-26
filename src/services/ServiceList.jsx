import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";
import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";
import {
  FaMapMarkedAlt,
  FaUsers,
  FaMoneyBillWave,
  FaRegCalendarCheck,
  FaHotel,
  FaPlaneDeparture,
  FaComments,
  FaVoteYea,
  FaCloudSun,
  FaRegShareSquare,
  FaUserFriends,
} from "react-icons/fa";

const servicesData = [
  {
    icon: FaMapMarkedAlt,
    title: "Destination Exploration",
    desc: "Find your next adventure with personalized destination recommendations.",
  },
  {
    icon: FaUsers,
    title: "Trip Collaboration",
    desc: "Engage everyone in the trip planning process for the perfect group getaway.",
  },
  {
    icon: FaRegCalendarCheck,
    title: "Dynamic Itinerary",
    desc: "Craft and modify your travel itinerary with flexibility and ease.",
  },
  {
    icon: FaHotel,
    title: "Accommodations",
    desc: "Secure the best stays, from cozy Airbnb homes to luxurious hotels.",
  },
  {
    icon: FaPlaneDeparture,
    title: "Travel Arrangements",
    desc: "Book all your flights and local transport directly within the app.",
  },
  {
    icon: FaComments,
    title: "Group Chat",
    desc: "Communicate with your group in real-time for smooth coordination.",
  },
  {
    icon: FaMoneyBillWave,
    title: "Expense Manager",
    desc: "Track and manage trip expenses, ensuring budget adherence for everyone.",
  },
  {
    icon: FaVoteYea,
    title: "Group Decisions",
    desc: "Facilitate decision-making with in-app polls and votes.",
  },
  {
    icon: FaCloudSun,
    title: "Weather Insights",
    desc: "Stay ahead with the latest weather forecasts for your destination.",
  },
  {
    icon: FaRegShareSquare,
    title: "Document Hub",
    desc: "Easily share and access important travel documents in one place.",
  },
  {
    icon: FaUserFriends,
    title: "Connect and Expand",
    desc: "Invite friends to join Wanderpal and expand your travel community.",
  },
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
