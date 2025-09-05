import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./CalorieBurn.module.css";

const burnRates = {
  running: 10,
  cycling: 8,
  walking: 4,
  swimming: 9,
  yoga: 3,
  skipping: 12,
};

const getMessage = (burned) => {
  if (burned < 100) return "💤 Light activity. Consider increasing duration or intensity.";
  if (burned < 300) return "🏃‍♂️ Good work! Keep it consistent.";
  return "🔥 Excellent! You’re burning serious calories!";
};

const CalorieBurn = () => {
  const [activity, setActivity] = useState("");
  const [minutes, setMinutes] = useState("");
  const [burned, setBurned] = useState(null);

  const calculate = () => {
    const rate = burnRates[activity];
    const mins = parseFloat(minutes);

    if (!rate || !mins || mins <= 0) {
      alert("Please select a valid activity and time.");
      return;
    }

    const total = rate * mins;
    setBurned(total);
  };

  const reset = () => {
    setActivity("");
    setMinutes("");
    setBurned(null);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h2 className={styles.heading}>🔥 Calorie Burn Calculator</h2>

      <div className={styles.card}>
        <div className={styles.inputGroup}>
          <select
            className={styles.select}
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option disabled value="">Select Activity</option>
            {Object.keys(burnRates).map((act) => (
              <option key={act} value={act}>
                {act.charAt(0).toUpperCase() + act.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="number"
            className={styles.input}
            placeholder="Enter minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />

          <button className={styles.button} onClick={calculate}>
            Calculate Burn
          </button>

          <button className={styles.resetButton} onClick={reset}>
            Reset
          </button>

          {burned !== null && (
            <div className={styles.resultBox}>
              <p className={styles.result}>
                🔥 Total Calories Burned: <strong>{burned.toFixed(2)} kcal</strong>
              </p>
              <p className={styles.message}>{getMessage(burned)}</p>

              <div className={styles.progressBar}>
                <div
                  className={styles.fill}
                  style={{ width: `${Math.min((burned / 500) * 100, 100)}%` }}
                ></div>
              </div>

              <div className={styles.scaleLabels}>
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalorieBurn;
