import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import ABOUT_US from '../assets/ABOUT_US.json'; // You'll need to add this Lottie file
import styles from './About.module.css';
import Logo from '../assets/WebLogo.jpg';

const AboutUs = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        <div className={styles.animationContainer}>
          <Player
            autoplay
            loop
            src={ABOUT_US}
            className={styles.lottieAnimation}
          />
        </div>
        
        <div className={styles.contentContainer}>
           <div className={styles.logoHeadingContainer}>
            <img src={Logo} alt="CaloTrack Logo" className={styles.logo} />
            <h1>About CaloTrack</h1>
          </div>
          
          <div className={styles.heroSection}>
            <h2>Transforming Health Through Technology</h2>
            <p>At CaloTrack, we believe that managing your health should be simple, accurate, and empowering. Our innovative calorie tracking technology helps you take control of your nutrition journey with precision and ease.</p>
          </div>

          <div className={styles.missionSection}>
            <h2>Our Mission</h2>
            <p>Our mission is to empower people to make informed nutritional decisions through accurate, easy-to-use technology. We're committed to providing the most precise calorie measurements while maintaining the simplicity that users deserve.</p>
            
            <div className={styles.missionPoints}>
              <div className={styles.point}>
                <h3>Accuracy</h3>
                <p>We're committed to providing the most precise nutritional information available.</p>
              </div>
              <div className={styles.point}>
                <h3>Privacy</h3>
                <p>Your data belongs to you - we never share it without your permission.</p>
              </div>
              <div className={styles.point}>
                <h3>Innovation</h3>
                <p>We continuously improve our technology to serve you better.</p>
              </div>
              <div className={styles.point}>
                <h3>Accessibility</h3>
                <p>Health management should be available to everyone, regardless of technical skill.</p>
              </div>
            </div>
          </div>

          <div className={styles.technologySection}>
            <h2>Our Technology</h2>
            <p>Using advanced algorithms and image recognition technology, CaloTrack takes the guesswork out of calorie counting. Our unique approach allows you to simply scan your food or input basic information to get accurate nutritional data instantly.</p>
            <p>We combine computer vision with nutritional databases to provide estimates that are both quick and reliable, helping you make better decisions about your diet without the hassle of manual tracking.</p>
          </div>

          <div className={styles.ctaSection}>
            <h2>Join Our Community</h2>
            <p>Thousands of users have already transformed their health journey with CaloTrack. Join them today and take the first step toward a healthier you.</p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>Get Started</button>
              <button className={styles.secondaryButton}>Learn More</button>
            </div>
          </div>

          <div className={styles.legalLinks}>
            <p>Please review our <Link to="/privacy-policy">Privacy Policy</Link> and <Link to="/term">Terms of Use</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;