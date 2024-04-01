import React from "react";
import styled from "styled-components";
import Room from "../components/Room";

// Styled components
const RoomsListWrapper = styled.section`
  padding: 5rem 0;
`;

const RoomsListCenter = styled.div`
  width: 80vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-row-gap: 2rem;
  grid-column-gap: 30px;

  @media screen and (min-width: 776px) {
    width: 90vw;
  }

  @media screen and (min-width: 992px) {
    width: 95vw;
    max-width: 1170px;
  }
`;

export default function RoomList({ rooms }) {
  if (rooms.length === 0) {
    return (
      <RoomsListWrapper>
        <div className="empty-search">
          <h3>unfortunately no rooms matched your search parameters</h3>
        </div>
      </RoomsListWrapper>
    );
  }

  return (
    <RoomsListWrapper>
      <RoomsListCenter>
        {rooms.map((item) => {
          return <Room key={item.id} room={item} />;
        })}
      </RoomsListCenter>
    </RoomsListWrapper>
  );
}
