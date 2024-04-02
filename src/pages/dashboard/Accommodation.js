import React from "react";
import RoomContainer from "../../components/RoomCintainer";
import { RoomProvider } from "../../components/Context";

const Accommodation = () => {
  return (
    <>
      <RoomProvider>
        <RoomContainer />
      </RoomProvider>
    </>
  );
};

export default Accommodation;
