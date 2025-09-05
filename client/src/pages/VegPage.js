import React, { useState } from 'react';
import styles from './VegPage.module.css';
import Lottie from 'lottie-react';
import greenVegBg from '../assets/Green Background.json';
import loadingAnimation from '../assets/Loading.json';

const VegPage = () => {
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  
  const API_KEY = 'XFnnAYjux2v6V5HJvZfVm6f5QuhFrVZJBEuUqRwS';
  
  const fetchNutrition = async () => {
    if (!foodName.trim()) return;
    setLoading(true);
    setNutrition(null);
    try {
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&api_key=${API_KEY}`
      );
      const data = await response.json();
      const first = data.foods?.[0];
      if (!first) throw new Error('No food found');
      const nutrients = {};
      first.foodNutrients.forEach((n) => {
        nutrients[n.nutrientName] = n.value;
      });
      setNutrition(nutrients);
    } catch (err) {
      alert('Error fetching data. Try a different food.');
    } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setFoodName('');
    setQuantity(1);
    setNutrition(null);
  };
  
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.lottieBackground}>
        <Lottie animationData={greenVegBg} loop autoPlay />
      </div>
      
      <div className={styles.vegCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Veg Calorie Calculator</h2>
          <p className={styles.cardSubtitle}>Discover the nutrition in your favorite vegetables</p>
        </div>
        
        <div className={styles.inputContainer}>
          <div className={`${styles.inputWrapper} ${inputFocus ? styles.focused : ''}`}>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              placeholder="e.g., spinach, paneer, rice"
              className={styles.inputField}
            />
            <span className={styles.inputIcon}></span>
          </div>
        </div>
        
        <div className={styles.quantityWrapper}>
          <label className={styles.quantityLabel}>
            Quantity: <span className={styles.quantityValue}>{quantity}</span> serving{quantity > 1 ? 's' : ''}
          </label>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderTicks}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tick) => (
                <span key={tick} className={quantity >= tick ? styles.activeTick : styles.tick}></span>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.buttonGroup}>
          <button onClick={fetchNutrition} className={styles.button} disabled={loading || !foodName.trim()}>
            Calculate Nutrition
            <span className={styles.buttonIcon}>→</span>
          </button>
          <button onClick={resetForm} className={styles.resetButton}>
            Reset
            <span className={styles.resetIcon}>↻</span>
          </button>
        </div>

        {loading && (
          <div className={styles.loadingContainer}>
            <Lottie animationData={loadingAnimation} style={{ height: 100 }} />
            <p className={styles.loadingText}>Crunching the numbers...</p>
          </div>
        )}
        
        {nutrition && (
          <div className={styles.resultsContainer}>
            <h4 className={styles.resultsTitle}>Nutrition Summary ({quantity} serving{quantity > 1 ? 's' : ''})</h4>
            <ul className={styles.nutritionList}>
              {Object.entries(nutrition).map(([key, val]) => (
                <li key={key} className={styles.nutritionItem}>
                  <span className={styles.nutrientName}>{key}:</span>
                  <span className={styles.nutrientValue}>{(val * quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default VegPage;