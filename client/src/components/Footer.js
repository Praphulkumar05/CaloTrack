import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  const [isDarkMode, setIsDarkMode] = useState(false);

const handleScrollToTop = () => {
  const container = document.querySelector(`.${styles.container}`);
  if (container) {
    container.scrollTo({ top: 0, behavior: "smooth" });
  }
};


  useEffect(() => {
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(isSystemDark);
  }, []);

  return (
    <footer className={`${styles.footer} ${isDarkMode ? styles.dark : ""}`}>
      <div className={styles.top}>
        <p className={styles.logo}>CaloTrack</p>
        <nav className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/ideal-weight">Ideal Weight</Link>
          <Link to="/daily-intake">Daily Intake</Link>
          <Link to="/calorie-burn">Calorie Burn</Link>
        </nav>

        {/* ✅ Scroll to Top Button */}
        <button className={styles.scrollBtn} onClick={handleScrollToTop}>
  ↑ Back to Top
</button>

      </div>
      <p className={styles.copy}>© {year} CaloTrack. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
