import React from "react";
import styled from "styled-components";
// import aboutImg from "../assets/images/aboutImg.jpg";
import home2 from "../assets/designedImg/home1.png";
import { FaEnvelope } from "react-icons/fa";
// import { Footer } from "../components/";
import Footer from "../components/Footer/Footer";
const AboutPage = () => {
  return (
    <main>
      <Wrapper className="page section section-center">
        <img src={home2} alt="JourneyMate" style={{ height: "auto" }} />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>{" "}
          <br />
          <p>
            Founded on a passion for exploration and a commitment to
            convenience, our journey began as a small startup eager to simplify
            travel planning. Over the years, we've evolved into a trusted travel
            partner, dedicated to empowering adventurers by seamlessly
            integrating booking, itinerary management, and real-time travel
            insights. Every feature on our platform reflects our deep.
          </p>
          <p>
            understanding of travelers' needs and our ongoing mission to enhance
            their travel experiences
          </p>
          <br />
          <p className="question-text">
            Got a question?
            <a href="mailto:rongronghu1997@outlook.com" className="email-link">
              <FaEnvelope className="email-icon" /> Email us!
            </a>
          </p>
        </article>
      </Wrapper>
      <Footer className="footer" />
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 3rem;
  h2 {
    text-align: center;
  }
  margin-top: 4rem;
  img {
    width: 100%;
    display: none;
    border-radius: var(--radius);
    height: auto;
    object-fit: cover;
    max-height: 75vh;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    color: var(--clr-grey-5);
    margin-bottom: 10px;
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  .question-text {
    font-size: 1.5rem;
    color: var(--clr-primary-3);
    text-align: center;
  }

  .email-link {
    color: #faa935;
    text-decoration: none;
    font-weight: bold;
    margin-left: 0.5rem;
    border-bottom: 1px solid var(--clr-primary-5);
    transition: color 0.3s;
  }

  .email-link:hover {
    color: var(--clr-primary-2);
  }

  .email-icon {
    color: black;
    transition: color 0.3s;
  }

  .email-link:hover .email-icon {
    color: #faa935;
    transform: scale(1.2);
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
    img {
      display: block;
    }
    h2 {
      text-align: left;
    }
    .question-text {
      font-size: 1.5rem;
      color: var(--clr-primary-3);
      text-align: left;
    }
  }
`;

export default AboutPage;
