import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import errorImg from "../assets/images/404.jpg";
const ErrorPage = () => {
  return (
    <Wrapper className="page-100">
      <section>
        <img src={errorImg} alt="404" className="error-img" />
        <h3>Sorry, the page tried cannot be found</h3>
        <Link to="/" className="btn">
          back home
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  .error-img {
    width: 400px;
    height: auto;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
  .btn {
    transition: background-color 0.3s ease; /* Smooth transition for background color */
    &:hover {
      background-color: #faa935; /* Change background color on hover */
      color: #fff; /* Optional: Change text color on hover if needed */
    }
  }
`;

export default ErrorPage;
