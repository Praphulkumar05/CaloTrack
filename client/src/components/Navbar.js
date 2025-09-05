// Navbar.js
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css";

import { CiLogout } from "react-icons/ci";

const Navbar = ({ onReset }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleCalculatorChange = (e) => {
    const path = e.target.value;
    if (path) {
      navigate(path);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value.toLowerCase();
    if (value) {
      navigate(`/category/${value}`);
    }
  };

  // const handleSearchKey = (e) => {
  //   if (e.key === "Enter" && searchQuery.trim()) {
  //     navigate(`/search?food=${encodeURIComponent(searchQuery.trim())}`);
  //     setSearchQuery("");
  //   }
  // };

  return (
    <header className={`${styles.navbar} ${styles.animate}`}>
      <div className={styles.brand} onClick={onReset}>
        <Link to="/" className={styles.brandLink}>
          CaloTrack
        </Link>
      </div>

      <nav className={styles.navLinks}>
        <div className={`${styles.dropdown} ${styles.fadeIn}`}>
          <select onChange={handleCategoryChange} defaultValue="">
            <option disabled value="">
              Categories
            </option>
            <option value="Veg">Veg</option>
            <option value="NonVeg">Non-Veg</option>
            <option value="Drinks">Drinks</option>
            <option value="Salad">Salad</option>
          </select>
        </div>

        <div className={`${styles.dropdown} ${styles.fadeIn}`}>
          <select
            onChange={handleCalculatorChange}
            defaultValue=""
            className={styles.customSelect}
          >
            <option disabled value="">
              Calculators
            </option>
            <option value="/ideal-weight">Ideal Weight</option>
            <option value="/daily-intake">Daily Calorie Intake</option>
            <option value="/calorie-burn">Calorie Burn</option>
          </select>
        </div>
      </nav>

      <div className={styles.userActions}>
      <button
        className={`${styles.knowMoreBtn} ${styles.animatedBtn}`}
        onClick={() => navigate('/pro-version')}
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        Subscribe Now
      </button>
      
      <Link to="/user" className={styles.userLink}>User Info</Link>
      
      <div className={styles.BTN}>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <h8><CiLogout />Logout</h8>
        </button>
      </div> 
      </div>


    </header>
  );
};

export default Navbar;
