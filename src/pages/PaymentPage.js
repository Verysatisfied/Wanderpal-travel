import React from "react";
import { Link } from "react-router-dom";
import "../assets/wrappers/Payment.css";
import Footer from "../components/Footer/Footer";

const PaymentPage = () => {
  return (
    <div className="payment-page">
      <section className="hero-section">
        <h1 style={{ textAlign: "center" }}>
          Unlock the full potential of your travels with Wanderpal Premium
        </h1>
      </section>

      <section className="pricing-payment" style={{ textAlign: "center" }}>
        <h2>Explore Wanderpal Plans</h2>
        <div className="row">
          <div className="card-group text-center">
            {/* Keep the original card design as you liked */}
            <div className="pricing-column col-lg-4 col-md-6">
              <div className="card h-100">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    color: "#fff",
                  }}
                >
                  <h3>Free Plan</h3>
                </div>
                <div className="card-body">
                  <h2>Free</h2>
                  <p>1 Travel Plan</p>
                  <p>Invite up to 3 People</p>
                  <p>Basic Planning Features</p>
                  <p>Voting on options</p>
                  <button
                    className="btn"
                    type="button"
                    style={{
                      backgroundColor: "grey",
                      color: "#fff",
                      marginTop: "40px",
                      width: "100%",
                    }}
                  >
                    Current Plan
                  </button>
                </div>
              </div>
            </div>

            <div className="pricing-column col-lg-4 col-md-6">
              <div className="card h-100">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    color: "#fff",
                  }}
                >
                  <h3>Premium Plan</h3>
                </div>
                <div className="card-body">
                  <h2>$9.99 / mo</h2>

                  <p>Unlimited travel plans</p>
                  <p>Invite up to 30 companions</p>
                  <p>Enhanced planning tools</p>
                  <p>Priority support & recommendations</p>
                  <p>Expense tracking & budgeting</p>
                  <p>Document sharing & itinerary management</p>
                  <p>Exclusive booking options</p>
                  <p>Real-time weather updates</p>

                  <Link to="/dashboard">
                    <button
                      className="btn btn-dark pricing-button"
                      type="button"
                      style={{ marginTop: "40px" }}
                    >
                      Upgrade Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PaymentPage;
