import React, { useState } from 'react';
import './FoodTracker.module.css';
// import { useNavigate } from "react-router-dom"; // ❌ Commented if not used

const FoodTracker = () => {
  // const navigate = useNavigate(); // ❌ Commented if not used

  const [query, setQuery] = useState('');
  // const [result, setResult] = useState(null); // ❌ Commented until needed

  const handleTrack = async () => {
    if (!query) return alert("Please enter food name");
    console.log("Tracking:", query);
  };

  return (
    <div className="food-tracker-container">
      <h2>Macro + Micro Nutrient Tracker (Pro)</h2>
      <input
        type="text"
        placeholder="e.g. 1 apple"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="food-tracker-input"
      />
      <button onClick={handleTrack} className="food-tracker-button">
        Track
      </button>

      {/* Future result display here */}
    </div>
  );
};

export default FoodTracker;
