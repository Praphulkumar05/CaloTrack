import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { Player } from '@lottiefiles/react-lottie-player';
import styles from "./Login.module.css"; 
import LoginAnimation from "../assets/LoginAnimation.json";
import googleLogo from "../assets/g-logo.png";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
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
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      setMsg("Login successful!");
      navigate("/");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const res = await api.post("/auth/google", {
          access_token: tokenResponse.access_token,
        });

        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        setMsg("Google login successful!");
        navigate("/");
      } catch (error) {
        console.error("Google login error:", error);
        setMsg("Google login failed.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (err) => {
      console.error("Google Login Failed:", err);
      setMsg("Google login failed.");
    },
  });

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftPanel}>
        <div className={styles.animationContainer}>
          <Player
            autoplay
            loop
            src={LoginAnimation}
            className={styles.animation}
          />
        </div>
        <div className={styles.leftContent}>
          <h1 className={styles.appName}>CaloTrack</h1>
          <p className={styles.tagline}>Track your calories, transform your health</p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.loginForm}>
          <div className={styles.formHeader}>
            <h2>Welcome Back</h2>
            <p>Sign in to continue your health journey</p>
          </div>

          <button 
            className={styles.googleButton} 
            onClick={() => googleLogin()}
            disabled={isLoading}
          >
            <img src={googleLogo} alt="Google" className={styles.googleIcon} />
            <span>Continue with Google</span>
          </button>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
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
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.spinner}></div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {msg && (
            <div className={`${styles.message} ${msg.includes('success') ? styles.success : styles.error}`}>
              {msg}
            </div>
          )}

          <div className={styles.links}>
            <Link to="/otp-login" className={styles.link}>Use OTP instead</Link>
            <Link to="/forgot-password" className={styles.link}>Forgot password?</Link>
          </div>

          <div className={styles.signupPrompt}>
            <p>Don't have an account? <Link to="/signup" className={styles.signupLink}>Create account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;