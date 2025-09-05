import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import resetImage from "../assets/LoginImage.jpg";

const ResetPassword = () => {
  const { state } = useLocation();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      await api.post("/auth/reset-password", {
        email: state?.email,
        otp,
        newPassword,
      });
      setMsg("✅ Password reset successful");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg("❌ Reset failed. Invalid OTP or email.");
    }
  };

  return (
    <div className={styles.resetContainer}>
      <div className={styles.left}>
        <img src={resetImage} alt="Reset Visual" className={styles.image} />
      </div>

      <div className={styles.right}>
        <h2 className={styles.title}>Reset Password</h2>
        <p className={styles.subtitle}>Enter the OTP and your new password</p>

        <input
          placeholder="OTP"
          className={`${styles.input} ${styles.otpInput}`}
          onChange={(e) => setOtp(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className={styles.input}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button onClick={handleReset} className={styles.btn}>
          Reset Password
        </button>

        {msg && (
          <p
            className={`${styles.message} ${
              msg.startsWith("✅") ? styles.success : styles.error
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
