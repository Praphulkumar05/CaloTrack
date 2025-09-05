import React, { useState } from 'react';
import Lottie from 'lottie-react';
import PleaseWait from '../assets/PleaseWait.json';
import styles from './MealSuggestion.module.css';

const goalOptions = [
  { value: 'I want a high-protein vegetarian meal under 600 calories.', label: 'High-protein vegetarian under 600 cal' },
  { value: 'Suggest a vegan breakfast for weight loss.', label: 'Vegan breakfast for weight loss' },
  { value: 'Give me a keto-friendly lunch idea.', label: 'Keto-friendly lunch' },
  { value: 'I want a quick dinner under 400 calories.', label: 'Quick dinner under 400 cal' },
  { value: 'Low-carb, high-fiber meal suggestion.', label: 'Low-carb, high-fiber meal' },
];

const MealSuggestion = () => {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [useCustomPrompt, setUseCustomPrompt] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(goalOptions[0]);
  const [customPrompt, setCustomPrompt] = useState('');

  const getMealSuggestion = async () => {
    const promptToSend = useCustomPrompt ? customPrompt : selectedGoal?.value;
    if (!promptToSend.trim()) return;

    setLoading(true);
    setSuggestion('');

    try {
      const response = await fetch("http://localhost:5000/api/ai/meal-suggestion", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userGoals: promptToSend }),
      });

      const data = await response.json();
     setSuggestion(data.reply || 'No suggestion received.');

    } catch (error) {
      console.error('Error fetching suggestion:', error);
      setSuggestion('Failed to fetch suggestion.');
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedSuggestion = () => {
    const lines = suggestion.split('\n').filter(line => line.trim() !== '');
    return (
      <div className={styles.suggestionBox}>
        {lines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.START}>
    <div className={styles.mealBox}>
      <h2 className={styles.heading}>🍽️ AI-Powered Meal Suggestion</h2>

      
      <div className={styles.toggleContainer}>
        <label>
          <input
            type="radio"
            checked={!useCustomPrompt}
            onChange={() => setUseCustomPrompt(false)}
          />
          Use predefined goal
        </label>
        <label>
          <input
            type="radio"
            checked={useCustomPrompt}
            onChange={() => setUseCustomPrompt(true)}
          />
          Enter your own prompt
        </label>
      </div>

     
      {!useCustomPrompt ? (
        <div className={styles.dropdownContainer}>
          <select
            value={selectedGoal.value}
            onChange={(e) =>
              setSelectedGoal(goalOptions.find(opt => opt.value === e.target.value))
            }
            className={styles.dropdownSelect}
          >
            {goalOptions.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter your custom goal"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className={styles.textInput}
          />
        </div>
      )}

      <button onClick={getMealSuggestion} disabled={loading} className={styles.button}>
        {loading ? 'Getting suggestion...' : 'Get AI Suggestion'}
      </button>

      {loading && (
        <div className={styles.animationContainer}>
          <Lottie animationData={PleaseWait} loop={true} />
        </div>
      )}

      {!loading && suggestion && renderFormattedSuggestion()}
    </div>
    </div>
  );
};

export default MealSuggestion;
