import React from "react";
import "./service-card.css";

const ServiceCard = ({ item }) => {
  const { title, desc, icon: Icon } = item;

  return (
    <div className="service__item">
      <div className="service__img">
        <Icon size="3em" color="#fff" />
      </div>
      <h6>{title}</h6>
      <p>{desc}</p>
    </div>
  );
};

export default ServiceCard;
