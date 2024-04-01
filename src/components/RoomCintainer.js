import React from "react";

// import context
import { withRoomConsumer } from "../components/Context";

// import components
import Loadings from "../components/Loading";
import RoomFilter from "../components//RoomsFilter";
import RoomList from "../components/RoomList";

function RoomContainer({ context }) {
  const { loading, sortedRooms, rooms } = context;

  if (loading) {
    return <Loadings />;
  }

  return (
    <>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </>
  );
}

export default withRoomConsumer(RoomContainer);
