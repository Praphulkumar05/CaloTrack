import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import DATASAFE from '../assets/DATASAFE.json';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyPage}>
      <div className={styles.container}>
        <div className={styles.animationContainer}>
          <Player
            autoplay
            loop
            src={DATASAFE}
            className={styles.lottieAnimation}
          />
        </div>
        
        <div className={styles.contentContainer}>
          <h1>Privacy Policy for CaloTrack Website</h1>
          <p><strong>Last updated:</strong> September 3, 2025</p>

          <p>Welcome to the CaloTrack website. This Privacy Policy describes how we collect, use, and protect your personal information when you use our services.</p>

          <h2>1. Information We Collect</h2>
          <p>We collect personal information that you provide to us directly when you register for an account and use our services. This information includes:</p>
          <ul>
            <li><strong>Registration and Profile Data:</strong> Your name, email address, mobile number, age, gender, and weight.</li>
            <li><strong>Health and Activity Data:</strong> All information you enter that is used to calculate calories (e.g., food intake, activity levels, etc.).</li>
          </ul>
          <p>We also collect data through your chosen login method. If you use a Google login, we collect your name, email address, and profile picture from your Google account with your consent.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li><strong>To Provide Services:</strong> To calculate calories and provide you with a seamless and personalized experience on our website.</li>
            <li><strong>Account Management:</strong> To create and manage your user account, including providing access to our services.</li>
            <li><strong>Communication:</strong> To communicate with you regarding your account, our services, or any updates.</li>
          </ul>

          <h2>3. Data Security</h2>
          <p>We are committed to protecting your personal information. We use a combination of technical and organizational security measures to protect the data you provide. Your data is protected using <strong>encryption</strong> and <strong>hashing</strong> to secure sensitive information and prevent unauthorized access. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.</p>

          <h2>4. Sharing Your Information</h2>
          <p>We do not share your personal information with any third parties, including for marketing, advertising, or data analytics purposes.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at <strong>support@mail.com</strong>.</p>

          <h2>6. Children's Privacy</h2>
          <p>Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information from our records as soon as possible.</p>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

          <h2>8. Contact Us</h2>
          <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
          <p><strong>support@mail.com</strong></p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;