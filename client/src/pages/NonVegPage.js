"use client";

import { useState } from "react";
import styles from "./NonVegPage.module.css";
import {
  Search,
  ArrowLeft,
  Drumstick,
  Fish,
  UtensilsCrossed,
  Flame,
  Wheat,
  Droplet,
} from "lucide-react";
import { FaBalanceScale } from "react-icons/fa";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/BlueLoading.json";
import { useNavigate } from "react-router-dom";


// 🔹 NutritionResult Component
const NutritionResult = ({ nutrition }) => {
  const [servings, setServings] = useState(1); // ✅ Moved hook to top
  


  if (!nutrition || nutrition.error) return null; // ✅ Safe now

  const validateServings = (val) => {
    let num = parseFloat(val);
    if (isNaN(num)) return 1;
    if (num < 0.5) return 0.5;
    if (num > 10) return 10;
    return parseFloat(num.toFixed(1));
  };

  const changeServings = (delta) => {
    setServings((prev) => validateServings(prev + delta));
  };

  const handleInputChange = (e) => {
    setServings(validateServings(e.target.value));
  };

  const multiply = (value) => {
    const num = parseFloat(value) || 0;
    return (num * servings).toFixed(1);
  };

  return (
    <div className={styles.resultCard}>
      <h3>{nutrition.name}</h3>

      {/* Serving Controls */}
  <div className={styles.servingControl}>
  <div className={styles.titleRow}>
    <FaBalanceScale className={styles.icon} />
    <p>Quantity Control</p>
  </div>

  <div className={styles.controlButtons}>
    <button onClick={() => changeServings(-0.5)}>-</button>
    <input
      type="number"
      step="0.5"
      value={servings}
      onChange={handleInputChange}
    />
    <button onClick={() => changeServings(0.5)}>+</button>
    <span> servings</span>
  </div>
</div>


      {/* Nutrient List */}
 <div className={styles.nutrientContainer}>
  <li className={`${styles.nutrientBox} ${styles.caloriesBox}`}>
    <Flame size={40} />
    <span>Calories: {multiply(nutrition.calories)}</span>
  </li>

  <div className={styles.smallBoxesRow}>
    <li className={`${styles.nutrientBox} ${styles.smallBox}`}>
      <Drumstick size={16} /> Protein: {multiply(nutrition.protein)}
    </li>
    <li className={`${styles.nutrientBox} ${styles.smallBox}`}>
      <Droplet size={16} /> Fat: {multiply(nutrition.fat)}
    </li>
    <li className={`${styles.nutrientBox} ${styles.smallBox}`}>
      <Wheat size={16} /> Carbs: {multiply(nutrition.carbs)}
    </li>
  </div>
</div>


    </div>
  );
};

// 🔹 Main Component
export default function NutritionFinder() {
  const [query, setQuery] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const USDA_API_KEY = process.env.REACT_APP_USDA_API_KEY;

  const fetchNutrition = async (food = query) => {
    if (!food.trim()) return;
    setLoading(true);
    setNutrition(null);
    setQuery(food);

    try {
      const searchRes = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
          food
        )}&api_key=${USDA_API_KEY}`
      );
      const searchData = await searchRes.json();

      if (!searchData.foods || searchData.foods.length === 0) {
        setNutrition({ error: "No results found" });
        setLoading(false);
        return;
      }

      const fdcId = searchData.foods[0].fdcId;
      const detailRes = await fetch(
        `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${USDA_API_KEY}`
      );
      const detailData = await detailRes.json();

      if (!detailData.foodNutrients || detailData.foodNutrients.length === 0) {
        setNutrition({ error: "No nutrient data found" });
        setLoading(false);
        return;
      }

      const findNutrient = (keywords) => {
        const nutrient = detailData.foodNutrients.find((n) =>
          keywords.some((k) =>
            n.nutrient?.name?.toLowerCase().includes(k.toLowerCase())
          )
        );
        return nutrient
          ? `${nutrient.amount} ${nutrient.nutrient.unitName}`
          : "0";
      };

      const calories = findNutrient(["energy", "calories"]);
      const protein = findNutrient(["protein"]);
      const fat = findNutrient(["fat"]);
      const carbs = findNutrient(["carbohydrate"]);

      setNutrition({
        name: detailData.description,
        calories,
        protein,
        fat,
        carbs,
      });
    } catch (err) {
      console.error(err);
      setNutrition({ error: "Error fetching data" });
    } finally {
      setLoading(false);
    }
  };

  const popularFoods = [
    { name: "Chicken Breast", icon: <Drumstick size={28} /> },
    { name: "Salmon", icon: <Fish size={28} /> },
    { name: "Tuna", icon: <Fish size={28} /> },
    { name: "Beef Steak", icon: <UtensilsCrossed size={28} /> },
  ];

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navLeft}>
         <button
  className={styles.backBtn}
  onClick={() => navigate("/")} // ✅ pass function to onClick
>
  <ArrowLeft size={18} />
</button>

          <div>
            <h1 className={styles.navTitle}>Non-Veg Nutrition Analyzer</h1>
            <p className={styles.navSubtitle}>AI-Powered Protein Analysis</p>
          </div>
        </div>
        <button className={styles.proteinBtn}>Protein Focus</button>
      </header>

      {/* Search Section */}
      <div className={styles.searchSection}>
        <p> Discover Your Protein</p>
        <span className={styles.highlight}>Nutrition</span>
        <p>Get detailed nutritional analysis for any non-vegetarian food item</p>

        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            value={query}
            placeholder="Enter Non-Veg Food Name..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchNutrition()}
            className={styles.searchInput}
          />
          <button onClick={() => fetchNutrition()} className={styles.analyzeBtn}>
            Analyze
          </button>
        </div>
      </div>

      {/* Popular Foods */}
      <h3 className={styles.popularTitle}>Popular Protein Sources</h3>
      <div className={styles.popularGrid}>
        {popularFoods.map(({ name, icon }) => (
          <div
            key={name}
            className={styles.popularCard}
            onClick={() => fetchNutrition(name)}
          >
            <div className={styles.popularIcon}>{icon}</div>
            <h4>{name}</h4>
            <p>Tap to analyze</p>
          </div>
        ))}
      </div>

      {/* Results */}
    {loading && (
  <div className={styles.loading}>
    <Lottie animationData={loadingAnimation} loop={true} style={{ height: 150, width: 150 }} />
  </div>
)}

      {nutrition && !nutrition.error && (
        <NutritionResult nutrition={nutrition} />
      )}
      {nutrition?.error && <p className={styles.error}>{nutrition.error}</p>}
    </div>
  );
}
