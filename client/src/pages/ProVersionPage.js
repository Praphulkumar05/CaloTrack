import React from 'react';
import styles from './ProVersionPage.module.css';
import Lottie from 'lottie-react';
import heroAnimation from '../assets/ProVersion.json';
import tick from '../assets/tick.json';
import { useNavigate } from 'react-router-dom';



const ProVersionPage = () => {
  const navigate = useNavigate();

  // Helper function to check trial access
  const hasProAccess = () => {
    const accessUntil = localStorage.getItem('proAccess');
    return accessUntil && new Date() < new Date(accessUntil);
  };

  return (
    <div className={styles.proPageContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.textContent}>
          <h1>Unlock Premium Features</h1>
          <p>Take your fitness journey to the next level with CaloTrack Pro!</p>
          <button
            className={styles.ctaButton}
            onClick={() => {
              const trialEnd = new Date();
              trialEnd.setDate(trialEnd.getDate() + 7);
              localStorage.setItem('proAccess', trialEnd.toISOString());
              alert('✅ Your 7-day Pro Trial has started! All premium features are now accessible.');
            }}
          >
            Start Your 7-Day Free Trial
          </button>
        </div>
        <Lottie animationData={heroAnimation} className={styles.heroAnimation} loop autoplay />
      </div>

      {/* Features Section */}
      <div className={styles.featuresGrid}>
        {[
          {
            title: 'AI-Powered Meal Suggestions',
            description: 'Get personalized meal plans based on your dietary preferences and fitness goals.',
            route: '/suggestions',
          },
          {
            title: 'Full Macro + Micro Nutrient Tracking',
            description: 'Track proteins, carbs, fats, vitamins & minerals for complete nutrition insights.',
            route: '/nutrient-tracking',
          },
         
          
          {
            title: 'Water Intake & Sleep Monitoring',
            description: 'Log your hydration and sleep patterns to build healthier habits.',
            route: '/wellness-tracker',
          },
          {
            title: 'Ad-Free Experience',
            description: 'Enjoy a distraction-free, smooth user interface with no advertisements.',
            route: '/ad-free',
          },
          
        ].map((feature, index) => (
          <div
            className={styles.featureCard}
            key={index}
            onClick={() => {
              if (hasProAccess()) {
                // Navigate to feature or alert
                if (feature.route) {
                  navigate(feature.route);
                } else {
                  alert(`Accessing: ${feature.title}`);
                }
              } else {
                alert('⚠️ Please start your free trial or subscribe to access this feature.');
              }
            }}
          >
            <Lottie animationData={tick} loop autoplay style={{ width: 40, height: 40 }} />
            <h3>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className={styles.footerSection}>
        <h2>Only ₹199/month — or Save 30% on Annual Plan!</h2>
        <button onClick={() => navigate('/checkout')} className={styles.subscribeButton}>
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default ProVersionPage;
