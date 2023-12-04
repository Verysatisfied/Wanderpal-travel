import React from "react";
import styled from "styled-components";
import aboutImg from "../assets/images/aboutImg.svg";
import { FaEnvelope } from "react-icons/fa";
import { Footer } from "../components";

const AboutPage = () => {
  return (
    <main>
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="doctor" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime esse
            assumenda eius saepe, magnam ad ut voluptatum harum at eaque quasi
            tenetur labore voluptatem sunt doloribus unde impedit! Et,
            perspiciatis? Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Blanditiis, quam perspiciatis quo sed sapiente inventore.
            Suscipit nam aut sequi temporibus, vitae dolorem impedit sunt
            repellat ut, assumenda voluptatum ea reiciendis?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor odio
            libero officia! Laudantium neque optio perspiciatis eaque ipsum
            quasi blanditiis corporis molestiae, id voluptatibus illum? Mollitia
            dignissimos ullam aliquid suscipit.
          </p>
          <p className="question-text">
            Got a question?
            <a href="mailto:rongronghu1997@outlook.com" className="email-link">
              <FaEnvelope className="email-icon" /> Email us!
            </a>
          </p>
        </article>
      </Wrapper>
      <Footer />
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
    color: #4a9fe0;
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
    color: #4a9fe0;
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
