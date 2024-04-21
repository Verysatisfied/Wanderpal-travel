import React from "react";
import manageIMG from "../assets/designedImg/transportation.jpg";
import Footer from "../components/Footer/Footer";
const Manage = () => {
  return (
    <div>
      <img
        src={manageIMG}
        alt="Transportation"
        style={{ width: "100%", height: "auto", marginTop: "18px" }}
      />
      <Footer />
    </div>
  );
};

export default Manage;
