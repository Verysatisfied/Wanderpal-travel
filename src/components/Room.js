import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../assets/hotelImages/room-1.jpeg";
import styled from "styled-components";
import PropTypes from "prop-types";

// Styled components for Room
const RoomWrapper = styled.article`
  box-shadow: var(--lightShadow);
  transition: var(--mainTransition);

  &:hover {
    box-shadow: var(--darkShadow);
  }
`;

const ImgContainer = styled.div`
  position: relative;
  img {
    width: 100%;
    display: block;
    transition: var(--mainTransition);
  }
  &:hover img {
    opacity: 0.3;
  }
  &:hover .price-top {
    opacity: 0;
  }
  &:hover .room-link {
    transform: translate(-50%, -50%) scale(1);
  }
`;

const PriceTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.3rem 0.6rem 0.5rem;
  border-bottom-right-radius: 1rem;
  font-size: 0.5rem;
  text-align: center;
  transition: var(--mainTransition);
  h6 {
    margin-bottom: 0;
    font-size: 0.9rem;
    font-weight: 300;
    letter-spacing: var(--mainSpacing);
  }
`;

const RoomLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  letter-spacing: var(--mainSpacing);
  color: var(--mainBlack); // Assuming you want to keep the text color
  background: #ffeb3b; // A vibrant yellow background
  padding: 0.4rem 0.9rem;
  border: 3px solid #ffeb3b; // Border color matching the background
  transition: var(--mainTransition); // Smooth transition for hover effect
  text-transform: uppercase;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: scale(0);
  transition: all 0.3s linear;

  &:hover {
    background: transparent;
    color: #ffeb3b; // Vibrant yellow text color on hover
    border-color: var(--mainBlack); // Optional: change border color on hover
  }
`;

const RoomInfo = styled.p`
  background: var(--mainBlack);
  text-transform: capitalize;
  padding: 0.5rem 0;
  text-align: center;
  font-weight: 700;
  letter-spacing: var(--mainSpacing);
`;

export default function Room({ room }) {
  const { name, slug, images, price } = room;

  return (
    <RoomWrapper>
      <ImgContainer>
        <img src={images[0] || defaultImg} alt="single room" />
        <PriceTop>
          <h6>$ {price}</h6>
          <p>per night</p>
        </PriceTop>
        {/* <RoomLink to={`/rooms/${slug}`} className="btn-primary room-link">
          Feature
        </RoomLink> */}
        <RoomLink to={`/rooms/${slug}`} className="btn-primary room-link">
          Book
        </RoomLink>
      </ImgContainer>
      <RoomInfo>{name}</RoomInfo>
    </RoomWrapper>
  );
}

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }),
};
