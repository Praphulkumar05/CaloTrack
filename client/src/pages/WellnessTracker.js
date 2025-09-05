// WaterTracker.jsx
import React, { useState } from "react";
import styles from "./wellnessWater.module.css";
import earth from "../assets/water.json";
import { Player } from "@lottiefiles/react-lottie-player";
import bottle from "../assets/Water Bottle.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const buttonLabels = [
  "✔ Drank a Glass",
  "Add Water",
  "🧊 I Drank!",
  "+1 Glass",
];

function WellnessTracker() {
  const [glasses, setGlasses] = useState(0);
  const [labelIndex, setLabelIndex] = useState(0);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [recommendedLiters, setRecommendedLiters] = useState(null);
  const [sleepStart, setSleepStart] = useState("");
  const [sleepEnd, setSleepEnd] = useState("");
  const [sleepGoal, setSleepGoal] = useState(8);
  const [sleepNote, setSleepNote] = useState("");
  const [sleepHours, setSleepHours] = useState(null);
  const [sleepLogs, setSleepLogs] = useState([]);
  const sleepData = [
  { date: 'Mon', actual: 7, target: 8 },
  { date: 'Tue', actual: 6.5, target: 8 },
  { date: 'Wed', actual: 8, target: 8 },
  { date: 'Thu', actual: 5, target: 8 },
  { date: 'Fri', actual: 9, target: 8 },
  { date: 'Sat', actual: 7.5, target: 8 },
  { date: 'Sun', actual: 6, target: 8 },
];



const handleSleepLog = () => {
  if (sleepStart && sleepEnd) {
    const [startH, startM] = sleepStart.split(":").map(Number);
    const [endH, endM] = sleepEnd.split(":").map(Number);
    let diff = endH + endM / 60 - (startH + startM / 60);
    if (diff < 0) diff += 24; // if sleep goes past midnight

    const hoursSlept = parseFloat(diff.toFixed(2));
    setSleepHours(hoursSlept);

    // 🆕 Add log to sleepLogs
    const today = new Date().toLocaleDateString(); // e.g., "8/5/2025"
    setSleepLogs((prevLogs) => [
      ...prevLogs,
      {
        date: today,
        hours: hoursSlept,
        goal: sleepGoal,
        note: sleepNote,
      },
    ]);
  }
};
  const totalGlasses = 9;

  const handleLogGlass = () => {
    if (glasses < totalGlasses) {
      setGlasses(glasses + 1);
    }
  };

  const handleReset = () => {
    setGlasses(0);
    setAge("");
    setWeight("");
    setRecommendedLiters(null);
  };

  const handleCalculate = () => {
    if (age && weight) {
      const liters = (weight * 0.033).toFixed(2);
      setRecommendedLiters(liters);
    }
  };

  const toggleLabel = () => {
    setLabelIndex((labelIndex + 1) % buttonLabels.length);
  };

  const progress = (glasses / totalGlasses) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.earthSection}>
        <Player
          autoplay
          loop
          src={earth}
          style={{ height: "180px", width: "180px" }}
        />
        <div className={styles.earthText}>
          <h3>🌍 Water: Earth's Lifeline</h3>
          <p>
            About 71% of Earth's surface is covered with water, yet only 3% is
            freshwater.
          </p>
          <p>
            Protecting and conserving water is crucial for the survival of all
            life on our planet.
          </p>
        </div>
      </div>
      <h2>💧 Daily Water Tracker</h2>

      {/* Input Section */}

      {/* Input + Animation Side-by-Side Section */}
      <div className={styles.inputWithBottle}>
        {/* Input Section - Left */}
        <div className={styles.inputSection}>
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </label>
          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
            />
          </label>
          <button onClick={handleCalculate}>Calculate Water Need</button>
          <button onClick={handleReset}>Reset</button>
        </div>

        {/* Bottle Animation - Right */}
        <div className={styles.bottleAnimation}>
          <Player
            autoplay
            loop
            src={bottle}
            style={{ height: "250px", width: "250px" }}
          />
        </div>
      </div>

      {/* Recommendation */}
      {recommendedLiters && (
        <div className={styles.recommendation}>
          <p>
            🌊 Based on your weight, you should drink{" "}
            <strong>{recommendedLiters} liters</strong> of water per day.
          </p>
        </div>
      )}

      {/* Tracker UI */}
      <div className={styles.waveContainer}>
        <div className={styles.wave} style={{ height: `${progress}%` }} />
        <div className={styles.progressText}>
          {glasses}/{totalGlasses} Glasses
        </div>
      </div>

      <button className={styles.logButton} onClick={handleLogGlass}>
        {buttonLabels[labelIndex]}
      </button>

      <button className={styles.toggleButton} onClick={toggleLabel}>
        🔄 Change Label
      </button>

      {/* Informative Paragraph */}
      <div className={styles.infoSection}>
        <h3>Why Staying Hydrated Matters</h3>
        <p>
          Water is essential for maintaining optimal health. It regulates your
          body temperature, keeps your joints lubricated, helps prevent
          infections, and keeps organs functioning properly. Being well-hydrated
          also improves sleep quality, cognition, and mood.
        </p>
        <p>
          Your daily water intake depends on various factors like age, weight,
          physical activity, and climate. A common recommendation is to drink at
          least 8 glasses (around 2 liters) of water a day. However, calculating
          based on your weight provides a more accurate estimate.
        </p>
        <p>
          Track your water intake and make hydration a daily habit for a
          healthier lifestyle!
        </p>
      </div>

      {/* //Sleep Tracker// */}







      

      <div className={styles.sleepSection}>
        <h2>😴 Sleep Tracker</h2>

        <div className={styles.sleepInputs}>
          <label>
            Sleep Start:
            <input
              type="time"
              value={sleepStart}
              onChange={(e) => setSleepStart(e.target.value)}
            />
          </label>
          <label>
            Wake Up:
            <input
              type="time"
              value={sleepEnd}
              onChange={(e) => setSleepEnd(e.target.value)}
            />
          </label>
          <label>
            Sleep Goal (hours):
            <input
              type="number"
              value={sleepGoal}
              onChange={(e) => setSleepGoal(e.target.value)}
              placeholder="e.g., 8"
            />
          </label>
          <label>
            Notes / Mood:
            <input
              type="text"
              value={sleepNote}
              onChange={(e) => setSleepNote(e.target.value)}
              placeholder="e.g., Felt refreshed"
            />
          </label>
          <button onClick={handleSleepLog}>Log Sleep</button>
        </div>
        <h3 style={{ marginTop: '2rem' }}>📈 Sleep Pattern (Last 7 Days)</h3>
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={sleepData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis domain={[0, 10]} />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Sleep" />
    <Line type="monotone" dataKey="target" stroke="#82ca9d" name="Target Sleep" />
  </LineChart>
</ResponsiveContainer>

        {sleepHours !== null && (
          <div className={styles.sleepSummary}>
            <p>
              🕒 You slept for <strong>{sleepHours} hours</strong>.
            </p>
            <p>
              Goal: {sleepGoal} hrs –{" "}
              {sleepHours >= sleepGoal
                ? "✅ Met Goal!"
                : "⚠️ Try for more sleep."}
            </p>
            {sleepNote && <p>📝 Note: {sleepNote}</p>}
          </div>
        )}

        <div className={styles.sleepTips}>
          <h3>💡 Tips for Better Sleep</h3>
          <ul>
            <li>Avoid caffeine 6 hours before bed.</li>
            <li>Keep a consistent sleep schedule.</li>
            <li>Use blue light filters after sunset.</li>
            <li>Wind down with relaxing activities.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WellnessTracker;
