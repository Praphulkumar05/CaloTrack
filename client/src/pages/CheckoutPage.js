import React, { useState } from "react";
import styles from "./CheckoutPage.module.css";
import Payment from "../assets/Payment.json";
import Refund from "../assets/Refund.json";
import ChargesCoin from "../assets/RupeeCoin.json";
import PaymentDone from "../assets/PaymentDone.json";
import { Player } from "@lottiefiles/react-lottie-player";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simulate successful payment
    setIsPaymentDone(true);
  };

  const handleClosePopup = () => {
    setIsPaymentDone(false);
  };

  return (
    <div className={styles.checkoutWrapper}>
      {/* Left Side */}
      <div className={styles.leftSection}>
        <div>
          <h2 className={styles.siteName}>CaloTrack</h2>

          <Player
            autoplay
            loop
            src={Payment}
            style={{ height: "300px", width: "300px", marginBottom: "1rem" }}
          />

          <h1>Complete your Premium Subscription</h1>
          <p className={styles.subtitle}>
            All-in-one access to AI meal planning, nutrient tracking, sleep monitoring, and more.
          </p>

          <div className={styles.guarantees}>
            <div className={styles.guaranteeItem}>
              <Player autoplay loop src={Refund} style={{ height: "40px", width: "40px" }} />
              <span>7-Day Refund Guarantee</span>
            </div>
            <div className={styles.guaranteeItem}>
              <Player autoplay loop src={ChargesCoin} style={{ height: "40px", width: "40px" }} />
              <span>No Hidden Fees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className={styles.rightSection}>
        <div className={styles.summary}>
          <h2>Summary</h2>
          <ul>
            <li><span>Pro Plan (Monthly)</span><span>₹199</span></li>
            <li><span>Taxes</span><span>₹0</span></li>
            <li className={styles.total}><span>Total</span><span>₹199</span></li>
          </ul>
        </div>

        <div className={styles.payment}>
          <h2>Payment</h2>

          {/* Payment Tabs */}
          <div className={styles.paymentTabs}>
            <button
              className={paymentMethod === "card" ? styles.activeTab : ""}
              onClick={() => handlePaymentChange("card")}
            >
              Card
            </button>
            <button
              className={paymentMethod === "upi" ? styles.activeTab : ""}
              onClick={() => handlePaymentChange("upi")}
            >
              UPI
            </button>
          </div>

          {/* Card Form */}
          {paymentMethod === "card" && (
            <form onSubmit={handlePaymentSubmit}>
              <label>Card number</label>
              <input type="text" placeholder="1234 1234 1234 1234" />

              <div className={styles.expiryCvc}>
                <div>
                  <label>Expiry</label>
                  <input type="text" placeholder="MM / YY" />
                </div>
                <div>
                  <label>CVC</label>
                  <input type="text" placeholder="CVC" />
                </div>
              </div>

              <label>Country</label>
              <select>
                <option>India</option>
                <option>United States</option>
                <option>Germany</option>
                <option>Australia</option>
              </select>

              <button type="submit" className={styles.payButton}>
                Pay ₹199 Now
              </button>
            </form>
          )}

          {/* UPI Form */}
          {paymentMethod === "upi" && (
            <form onSubmit={handlePaymentSubmit}>
              <label>UPI ID</label>
              <input type="text" placeholder="example@upi" />

              <button type="submit" className={styles.payButton}>
                Pay ₹199 via UPI
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Payment Done Popup */}
      {isPaymentDone && (
        <div className={styles.paymentDonePopup}>
          <div className={styles.popupContent}>
            <Player
              autoplay
              loop
              src={PaymentDone}
              style={{ height: "200px", width: "200px" }}
            />
            <h3>Payment Successful!</h3>
            <button onClick={handleClosePopup} className={styles.closePopupBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
