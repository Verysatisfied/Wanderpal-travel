import React from "react";
import styled from "styled-components";

export const Footer = () => {
  return (
    <Wrapper>
      <h5>
        &copy;{new Date().getFullYear()}
        <span> We care </span>
      </h5>
      <h5>All right reserved</h5>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: gray;
  text-align: center;
  span {
    color: #4a9fe0;
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }

  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0; /* To ensure it stays on the left edge of the viewport. */
  z-index: 1; /* Ensure it's on top of other content. */

  @media (min-width: 776px) {
    flex-direction: row;
  }
`;
