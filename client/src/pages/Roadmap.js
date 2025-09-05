import React from 'react';
import styles from './RoadmapPage.module.css';
import roadmapImage from '../assets/bck2.jpg'; // Add your roadmap image here
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import wellnessAnimation from '../assets/wellness.json'; // Lottie animation JSON

const RoadmapPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.animationWrapper}>
          <Lottie animationData={wellnessAnimation} loop={true} />
        </div>
        <h1 className={styles.title}>Your Complete Health & Wellness Roadmap</h1>
        <p className={styles.subtitle}>
          Follow this structured path to improve your fitness, maintain healthy calories, and practice yoga regularly.
        </p>
      </div>

      <div className={styles.section}>
        <h2>🏋️‍♂️ Exercise Plan</h2>
        <ul>
          <li><strong>Week 1-2:</strong> Light cardio (15-20 mins/day), bodyweight exercises</li>
          <li><strong>Week 3-4:</strong> Add resistance training (3x/week)</li>
          <li><strong>Week 5-6:</strong> Mix strength and HIIT (5x/week)</li>
          <li><strong>Ongoing:</strong> Track progress, progressive overload, rest days</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>🥗 Calorie & Nutrient Maintenance</h2>
        <ul>
          <li>Use the <Link to="/nutrient-tracking">Macro & Micro Nutrient Tracker</Link> to monitor intake</li>
          <li>Maintain calorie deficit/surplus based on goal (fat loss/gain)</li>
          <li>Balanced diet: Carbs (40%), Proteins (30%), Fats (30%)</li>
          <li>Stay hydrated (3–4 litres/day)</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>🧘‍♀️ Yoga & Mindfulness</h2>
        <ul>
          <li>Start with 10 minutes of beginner yoga each morning</li>
          <li>Practice deep breathing & meditation before bed</li>
          <li>Join online yoga sessions (3x/week)</li>
          <li>Track flexibility and mood improvements</li>
        </ul>
      </div>

      <div className={styles.footer}>
        <img src={roadmapImage} alt="Roadmap Visual" />
        <p>Stay consistent and revisit this roadmap weekly for updates!</p>
      </div>
    </div>
  );
};

export default RoadmapPage;
