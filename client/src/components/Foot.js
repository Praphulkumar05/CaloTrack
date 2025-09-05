import React from "react";
import { Link } from "react-router-dom"; // import Link for routing
import styles from "./Foot.module.css";
import MainLogo from "../assets/WebLogo.jpg";
import FootMainImage from "../assets/FootMainImage.jpg";

const Foot = () => {
  return (
    <footer className={styles.footer}>
      {/* Newsletter Section */}
     
<div className={styles.newsletterBox}>
  <div className={styles.newsLeft}>
    <img
      src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
      alt="Vacuum"
      className={styles.vacuum}
    />
  </div>

  <div className={styles.newsRight}>
    <img
      src={FootMainImage}
      alt="Food Main"
      className={styles.foodImage}
    />
  </div>
</div>

      {/* Footer Main Content */}
      <div className={styles.footerMain}>
      <div className={styles.footerCol}>
  <div className={styles.logoBox}>
    <img src={MainLogo} alt="Logo" className={styles.logoImg} />
    <h2 className={styles.logoText}>CaloTrack</h2>
  </div>
</div>

        <div className={styles.footerCol}>
          <h4>Company</h4>
          <ul>
               <Link to="/about" className={styles.blackLink}>About Us</Link>
          
          </ul>
        </div>

        {/* New Services column with Links */}
       <div className={`${styles.footerCol} ${styles.servicesCol}`}>
  <h4>Services</h4>
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/ideal-weight">Ideal Weight</Link>
    </li>
    <li>
      <Link to="/daily-intake">Daily Intake</Link>
    </li>
    <li>
      <Link to="/calorie-burn">Calorie Burn</Link>
    </li>
  </ul>
</div>


        <div className={styles.footerCol}>
          <h4>Contact Us</h4>
          <p>📞 (+91) xxx xxx xxx</p>
          <p>📧 support@mail.com</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <p>© Copyright by CaloTrack. All rights reserved.</p>
        <div>
         <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/term">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
};

export default Foot;
