import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./IdealWeight.module.css";

const getHeightPercentile = (height, gender) => {
  const maleAvg = 171;
  const femaleAvg = 159;
  const avg = gender === "male" ? maleAvg : femaleAvg;
  const max = avg + 15;
  const min = avg - 15;

  if (height <= min) return 5;
  if (height >= max) return 95;
  const position = ((height - min) / (max - min)) * 90 + 5;
  return Math.round(position);
};

const IdealWeight = () => {
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState(null);
  const [percentile, setPercentile] = useState(null);

  const calculate = () => {
    const h = parseFloat(height);
    if (!h || !gender) return;

    const ideal =
      gender === "male" ? (h - 100) * 0.9 : (h - 100) * 0.85;

    setWeight(ideal);
    setPercentile(getHeightPercentile(h, gender));
  };

  const reset = () => {
    setHeight("");
    setGender("");
    setWeight(null);
    setPercentile(null);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h2 className={styles.heading}>📏 Ideal Weight Calculator</h2>

      <div className={styles.inputGroup}>
        <input
          type="number"
          className={styles.input}
          placeholder="Enter height in cm"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <select
          className={styles.select}
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <option disabled value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button className={styles.button} onClick={calculate}>
          Calculate Ideal Weight
        </button>

        <button className={styles.clearButton} onClick={reset}>
          Reset
        </button>

        {weight && (
          <p className={styles.result}>✅ Ideal Weight: <strong>{weight.toFixed(2)} kg</strong></p>
        )}

        {percentile && (
          <p className={styles.percentile}>
            📊 You are taller than <strong>{percentile}%</strong> of the global population.
          </p>
        )}

        {height && (
          <div className={styles.heightMeter}>
            <p>
              📏 Your height compared to global scale:
              <strong> {height} cm</strong>
            </p>

            <div className={styles.meterBar}>
              <div
                className={styles.pointer}
                style={{ left: `${(Math.min(height, 220) / 220) * 100}%` }}
              />
            </div>

            <div className={styles.meterLabels}>
              <span>Very Short</span>
              <span>Average</span>
              <span>Tall</span>
              <span>Very Tall</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdealWeight;
