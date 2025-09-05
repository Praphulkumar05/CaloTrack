import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import animationData from '../assets/Loading.json'; 
import styles from './DrinksPage.module.css';
import drinkImg from '../assets/9071115.png';

const USDA_API_KEY = process.env.REACT_APP_DRINK_API_KEY;

function DrinksPage() {
  const [input, setInput] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [drinkInfo, setDrinkInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('regular'); // 'regular' or 'alcoholic'

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!input) {
      setError("Please enter a drink name");
      return;
    }

    setLoading(true);
    setError(null);
    setDrinkInfo(null);

    try {
      const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
        params: {
          query: input,
          pageSize: 1,
          api_key: USDA_API_KEY
        }
      });

      const food = response.data.foods?.[0];
      if (!food) throw new Error("No food found");

      const calories = food.foodNutrients.find(
        n => n.nutrientName === 'Energy' && n.unitName === 'KCAL'
      )?.value || 0;

      setDrinkInfo({
        name: food.description,
        brand: food.brandName || "Generic",
        calories: (calories * quantity).toFixed(2)
      });

    } catch (err) {
      setError("Nutrition data not found. Try another name or check your internet connection.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInput('');
    setQuantity(1);
    setDrinkInfo(null);
    setError(null);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Nutrition Analyzer</h1>
        <p className={styles.subtitle}>Get detailed nutritional information for your favorite beverages</p>

        {/* Category Tabs */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${selectedCategory === 'regular' ? styles.activeTab : ''}`}
            onClick={() => setSelectedCategory('regular')}
          >
            Regular Drinks
          </button>
          <button
            className={`${styles.tab} ${selectedCategory === 'alcoholic' ? styles.activeTab : ''}`}
            onClick={() => setSelectedCategory('alcoholic')}
          >
            Alcoholic Beverages
          </button>
        </div>

        {/* Input Section */}
        <form className={styles.inputSection} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={
              selectedCategory === 'regular'
                ? "Enter drink name (e.g., milk, cola, orange juice)"
                : "Enter alcoholic beverage (e.g., beer, wine, whiskey)"
            }
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(null);
            }}
          />

          {/* Serving Controls */}
          <div className={styles.servingsWrapper}>
            <span>Servings</span>
            <div className={styles.servingControl}>
              <button type="button" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.primaryBtn} disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze Nutrition'}
            </button>
            <button type="button" className={styles.secondaryBtn} onClick={handleReset}>
              Clear
            </button>
          </div>
        </form>

        {/* Loading Animation */}
        {loading && (
          <div className={styles.loader}>
            <Lottie animationData={animationData} loop={true} style={{ width: 100, height: 100 }} />
            <p>Fetching nutritional data...</p>
          </div>
        )}

        {/* Error */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Result */}
        {drinkInfo && (
          <div className={styles.resultBox}>
            <h3>{drinkInfo.name}</h3>
            <p><strong>Brand:</strong> {drinkInfo.brand}</p>
            <p><strong>Total Calories:</strong> {drinkInfo.calories} kcal</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DrinksPage;
  