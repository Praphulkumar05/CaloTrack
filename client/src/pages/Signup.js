import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { Player } from '@lottiefiles/react-lottie-player';
import styles from "./Signup.module.css";
import SignupAnimation from "../assets/NewAnimation.json";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    phone: "",
    email: "",
    password: ""
  });
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post("/auth/signup", form);

      const { name, gender, age, phone, email } = form;
      const userInfo = { name, gender, age, phone, email };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      setMsg("Signup successful. Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.leftPanel}>
        <div className={styles.animationContainer}>
          <Player
            autoplay
            loop
            src={SignupAnimation}
            className={styles.animation}
          />
        </div>
        <div className={styles.leftContent}>
          <h1 className={styles.appName}>CaloTrack</h1>
          <p className={styles.tagline}>Start your health journey today</p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.signupForm}>
          <div className={styles.formHeader}>
            <h2>Create Account</h2>
            <p>Join thousands of users tracking their health with CaloTrack</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  value={form.name}
                  required
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                  value={form.gender}
                  required
                  className={styles.select}
                  disabled={isLoading}
                >
                  <option value="" disabled hidden>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="age">Age</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Age"
                  onChange={handleChange}
                  value={form.age}
                  required
                  className={styles.input}
                  disabled={isLoading}
                  min="1"
                  max="120"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="Phone number"
                  onChange={handleChange}
                  value={form.phone}
                  required
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={form.email}
                required
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                onChange={handleChange}
                value={form.password}
                required
                className={styles.input}
                disabled={isLoading}
                minLength="6"
              />
            </div>

            <button 
              type="submit" 
              className={styles.primaryButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.spinner}></div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {msg && (
            <div className={`${styles.message} ${msg.includes('successful') ? styles.success : styles.error}`}>
              {msg}
            </div>
          )}

          <div className={styles.loginPrompt}>
            <p>Already have an account? <Link to="/login" className={styles.loginLink}>Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;