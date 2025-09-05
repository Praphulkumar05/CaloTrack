import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./DailyIntake.module.css";

const intakeRates = {
  male: {
    sedentary: 2200,
    moderate: 2600,
    active: 3000,
  },
  female: {
    sedentary: 1800,
    moderate: 2100,
    active: 2400,
  },
};

const getAdvice = (calories) => {
  if (calories < 2000) return "🍎 You might need a moderate intake. Balance is key!";
  if (calories < 2500) return "🥗 Great! Maintain a healthy lifestyle.";
  return "🔥 High energy needs. Stay active and eat well!";
};

const DailyCalorieIntake = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activity, setActivity] = useState("");
  const [calories, setCalories] = useState(null);

  const calculate = () => {
    if (!gender || !activity || !age || parseInt(age) <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    const baseCalories = intakeRates[gender][activity];
    setCalories(baseCalories);
  };

  const reset = () => {
    setAge("");
    setGender("");
    setActivity("");
    setCalories(null);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h2 className={styles.heading}>🎯 Daily Calorie Intake Estimator</h2>

      <div className={styles.inputGroup}>
        <input
          type="number"
          placeholder="Enter your age"
          className={styles.input}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <select
          className={styles.select}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option disabled value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          className={styles.select}
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        >
          <option disabled value="">Activity Level</option>
          <option value="sedentary">Sedentary</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
        </select>

        <button className={styles.button} onClick={calculate}>
          Calculate
        </button>

        <button className={styles.clearButton} onClick={reset}>
          Reset
        </button>

        {calories && (
          <div className={styles.resultBox}>
            <p className={styles.result}>
              🔥 Your estimated daily calorie intake is <strong>{calories} kcal</strong>
            </p>
            <p className={styles.message}>{getAdvice(calories)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyCalorieIntake;
