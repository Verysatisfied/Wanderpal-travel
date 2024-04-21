import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./newsletter.css";
import { Container, Row, Col } from "reactstrap";
// import maleTourist from "../assets/images/male-tourist.png";
import home3 from "../assets/designedImg/home3.jpg";
const NewsLetter = () => {
  const [state, handleSubmit] = useForm("xgejpwpp");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const handleFormSubmit = (e) => {
    if (!email) {
      e.preventDefault(); // Prevent form submission
      setEmailError(true); // Show email error message
    } else {
      handleSubmit(e); // Proceed with Formspree form submission
    }
  };
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subcribe now to get useful traveling information</h2>

              {/* <div className="newsletter__input">
                <input type="email" placeholder="Enter your email" />
                <button className="btn newsletter__btn">Subcribe</button>
              </div> */}
              <form onSubmit={handleFormSubmit} className="newsletter__input">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value); // Update email state
                    setEmailError(false); // Reset email error state when user starts typing
                  }}
                />
                {emailError && <p className="error">Please input email</p>}{" "}
                {/* Conditional rendering for email error message */}
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
                {/* <textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                ></textarea> */}
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
                <button
                  type="submit"
                  className="btn newsletter__btn"
                  disabled={state.submitting}
                >
                  Subscribe
                </button>
              </form>
              {state.succeeded && <p>Thanks for joining!</p>}
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati adipisici sunt in, provident facere ipsam?
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={home3} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewsLetter;
