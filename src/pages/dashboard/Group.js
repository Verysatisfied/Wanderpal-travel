import React from "react";
import { ChatComponent, BudgetManager } from "../../components";
import transportationImg from "../../assets/designedImg/transportation.jpg";

const Group = () => {
  return (
    <div>
      <ChatComponent />
      <BudgetManager />
      <img
        src={transportationImg}
        alt="Transportation"
        style={{ width: "100%", height: "auto", marginTop: "30px" }}
      />
    </div>
  );
};

export default Group;
