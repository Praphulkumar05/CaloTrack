import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import TERMS from '../assets/Term.json'; 
import styles from './Term.module.css';

const TermsOfUse = () => {
  return (
    <div className={styles.termsPage}>
      <div className={styles.container}>
        <div className={styles.animationContainer}>
          <Player
            autoplay
            loop
            src={TERMS}
            className={styles.lottieAnimation}
          />
        </div>
        
        <div className={styles.contentContainer}>
          <h1>Terms of Use for CaloTrack</h1>
          <p><strong>Last updated:</strong> September 3, 2025</p>

          <p>Welcome to CaloTrack. These Terms of Use govern your use of our website and services. By accessing or using CaloTrack, you agree to be bound by these Terms.</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By creating an account or using CaloTrack, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.</p>

          <h2>2. Description of Service</h2>
          <p>CaloTrack provides a calorie tracking service that allows users to monitor their food intake, physical activities, and calculate estimated calorie expenditure. Features include:</p>
          <ul>
            <li>Food and nutrition tracking</li>
            <li>Exercise and activity logging</li>
            <li>Calorie calculation and goal setting</li>
            <li>Progress monitoring and reporting</li>
          </ul>

          <h2>3. User Accounts</h2>
          <p>To access most features of CaloTrack, you must create a user account. You agree to:</p>
          <ul>
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your password and accept all risks of unauthorized access</li>
            <li>Notify us immediately if you discover or suspect any security breaches related to our services</li>
          </ul>

          <h2>4. User Responsibilities</h2>
          <p>You are responsible for all activities that occur under your account and agree to:</p>
          <ul>
            <li>Use CaloTrack only for lawful purposes</li>
            <li>Not upload, post, or transmit any content that is harmful, offensive, or violates any laws</li>
            <li>Not attempt to gain unauthorized access to any part of the service or other users' accounts</li>
            <li>Not use the service to infringe upon the intellectual property rights of others</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>All content included on CaloTrack, such as text, graphics, logos, images, and software, is the property of CaloTrack or its content suppliers and protected by intellectual property laws. You may not modify, copy, distribute, transmit, display, publish, or create derivative works from any part of the service without our prior written consent.</p>

          <h2>6. Disclaimer of Warranties</h2>
          <p>CaloTrack is provided "as is" without any warranties of any kind, either express or implied. We do not guarantee that:</p>
          <ul>
            <li>The service will meet your specific requirements</li>
            <li>The service will be uninterrupted, timely, secure, or error-free</li>
            <li>The results that may be obtained from the use of the service will be accurate or reliable</li>
            <li>The quality of any products, services, information, or other material obtained by you will meet your expectations</li>
          </ul>

          <h2>7. Limitation of Liability</h2>
          <p>In no event shall CaloTrack, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
          <ul>
            <li>Your access to or use of or inability to access or use the service</li>
            <li>Any conduct or content of any third party on the service</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
          </ul>

          <h2>8. Modifications to Terms</h2>
          <p>We reserve the right to modify these Terms of Use at any time. We will provide notice of significant changes by posting the new Terms on our website and updating the "Last updated" date. Your continued use of the service after such modifications constitutes your acceptance of the modified Terms.</p>

          <h2>9. Termination</h2>
          <p>We may terminate or suspend your account and access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.</p>

          <h2>10. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>

          <h2>11. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p><strong>support@mail.com</strong></p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;