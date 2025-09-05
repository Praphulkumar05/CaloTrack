import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Player } from '@lottiefiles/react-lottie-player';
import styles from "./OTPLogin.module.css";
import OTPAnimation from "../assets/OtpAnimation.json";

const OTPLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const requestOtp = async () => {
    setIsLoading(true);
    try {
      await api.post("/auth/send-otp", { email });
      setStep(2);
      setMsg("OTP sent to your email");
    } catch (err) {
      setMsg(err.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setMsg("Invalid or expired OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.otpContainer}>
      <div className={styles.leftPanel}>
        <div className={styles.animationContainer}>
          <Player
            autoplay
            loop
            src={OTPAnimation}
            className={styles.animation}
          />
        </div>
        <div className={styles.leftContent}>
          <h1 className={styles.appName}>CaloTrack</h1>
          <p className={styles.tagline}>Secure access with one-time password</p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.otpForm}>
          <div className={styles.formHeader}>
            <h2>OTP Verification</h2>
            <p>
              {step === 1 
                ? "Enter your email to receive a verification code" 
                : "Enter the 6-digit code sent to your email"
              }
            </p>
          </div>

          {step === 1 ? (
            <div className={styles.formStep}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>
              <button 
                onClick={requestOtp} 
                className={styles.primaryButton}
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <div className={styles.spinner}></div>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </div>
          ) : (
            <div className={styles.formStep}>
              <div className={styles.inputGroup}>
                <label htmlFor="otp">Verification Code</label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={styles.input}
                  disabled={isLoading}
                  maxLength={6}
                />
              </div>
              <button 
                onClick={verifyOtp} 
                className={styles.primaryButton}
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <div className={styles.spinner}></div>
                ) : (
                  "Verify & Login"
                )}
              </button>
              
              <div className={styles.resendContainer}>
                <p>Didn't receive the code?</p>
                <button 
                  onClick={requestOtp} 
                  className={styles.resendButton}
                  disabled={isLoading}
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}

          {msg && (
            <div className={`${styles.message} ${msg.includes('sent') ? styles.success : styles.error}`}>
              {msg}
            </div>
          )}

          <div className={styles.backLink}>
            <button 
              onClick={() => step === 2 ? setStep(1) : navigate(-1)} 
              className={styles.backButton}
            >
              ← Back to {step === 2 ? "Email" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPLogin;