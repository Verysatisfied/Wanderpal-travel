import React from "react";
import styled from "styled-components";
import aboutImg from "../assets/images/aboutImg.jpg";
import { FaEnvelope } from "react-icons/fa";
// import { Footer } from "../components/";
import Footer from "../components/Footer/Footer";
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Temporibus, dicta? Vitae aliquid ad dolorum dolore omnis veritatis
            ipsa itaque repellat alias voluptates? Corrupti accusantium
            voluptate ipsam voluptatum deserunt voluptatem qui!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            ducimus pariatur veniam quos eum maxime similique, placeat, aperiam
            harum ut assumenda tenetur iste facilis dicta aspernatur incidunt
            unde adipisci ipsa.
          </p>
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
