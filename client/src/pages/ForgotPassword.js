import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Player } from '@lottiefiles/react-lottie-player';
import styles from "./ForgotPassword.module.css";
import ForgotAnimation from "../assets/ForgotAnimation.json";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setMsg("OTP sent to your email");
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1500);
    } catch (err) {
      setMsg("Email not found or invalid");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.forgotContainer}>
      <div className={styles.leftPanel}>
        <div className={styles.animationContainer}>
          <Player
            autoplay
            loop
            src={ForgotAnimation}
            className={styles.animation}
          />
        </div>
        <div className={styles.leftContent}>
          <h1 className={styles.appName}>CaloTrack</h1>
          <p className={styles.tagline}>Reset your password securely</p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.forgotForm}>
          <div className={styles.formHeader}>
            <h2>Reset Your Password</h2>
            <p>Enter your email address and we'll send you an OTP to reset your password</p>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              disabled={isLoading}
            />
          </div>

          <button 
            onClick={sendOtp} 
            className={styles.primaryButton}
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              "Send Verification Code"
            )}
          </button>

          {msg && (
            <div className={`${styles.message} ${msg.includes('sent') ? styles.success : styles.error}`}>
              {msg}
            </div>
          )}

          <div className={styles.backLink}>
            <button 
              onClick={() => navigate(-1)} 
              className={styles.backButton}
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;