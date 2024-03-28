import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/wrappers/Payment.css";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPaymentStatus } from "../reducers/paySlice";
const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handlePayment = () => {
    if (user) {
      toast.success("Payment successful!");
      setTimeout(() => navigate("/dashboard"), 2000); // 2秒后跳转到dashboard
      dispatch(setPaymentStatus(true));
    } else {
      dispatch(setPaymentStatus(true));
      toast.success("Payment successful!");
      navigate("/register");
    }
  };
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

                  <button
                    className="btn btn-dark pricing-button"
                    type="button"
                    style={{ marginTop: "40px" }}
                    onClick={handlePayment}
                  >
                    Upgrade Now
                  </button>
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
