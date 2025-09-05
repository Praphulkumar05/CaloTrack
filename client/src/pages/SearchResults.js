import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import styles from "./SearchResults.module.css";
import { motion } from "framer-motion";
import { FaAppleAlt, FaDrumstickBite, FaCarrot } from "react-icons/fa";

const fallbackImage =
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("food");
  const [results, setResults] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
          {
            headers: {
              "X-Api-Key": "W/wuraiHoUsBlUGDogCZew==156HIJOPWab1ANom",
            },
          }
        );
        const data = response.data;
        setResults(data);
        // Initialize quantity = 1 for each item
        const initialQuantities = {};
        data.forEach((item, index) => {
          initialQuantities[index] = 1;
        });
        setQuantities(initialQuantities);
        setError("");
      } catch (err) {
        console.error("API error:", err);
        setError("Could not fetch nutrition data.");
      }
      setLoading(false);
    };

    fetchData();
  }, [query]);

  const getIcon = (name) => {
    if (name.toLowerCase().includes("chicken")) return <FaDrumstickBite />;
    if (name.toLowerCase().includes("apple")) return <FaAppleAlt />;
    if (name.toLowerCase().includes("carrot")) return <FaCarrot />;
    return "🍽️";
  };

  const handleQuantityChange = (index, value) => {
    const num = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({ ...prev, [index]: num }));
  };

  const multiply = (val, qty) => {
    return val !== undefined ? (val * qty).toFixed(2) : "🔒 Premium";
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Search Results for “{query}”</h1>
      <Link to="/" className={styles.backBtn}>
        ← Back to Home
      </Link>

      {loading && <p className={styles.message}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {results.length > 0 ? (
        <div className={styles.grid}>
          {results.map((item, index) => {
            const qty = quantities[index] || 1;
            return (
              <motion.div
                key={index}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <img
                  className={styles.foodImg}
                  src={`https://source.unsplash.com/400x300/?${item.name},food`}
                  alt={item.name}
                  onError={(e) => (e.target.src = fallbackImage)}
                />
                <div className={styles.content}>
                  <h2>
                    {getIcon(item.name)} {item.name}
                  </h2>

                  <div className={styles.quantityControl}>
                    <label htmlFor={`qty-${index}`}>Quantity:</label>
                    <input
                      id={`qty-${index}`}
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                    <span>pcs</span>
                  </div>

                  <ul>
                    <li>
                      <strong>Calories:</strong>{" "}
                      {multiply(item.calories, qty)} kcal
                    </li>
                    <li>
                      <strong>Protein:</strong>{" "}
                      {multiply(item.protein_g, qty)} g
                    </li>
                    <li>
                      <strong>Carbs:</strong>{" "}
                      {multiply(item.carbohydrates_total_g, qty)} g
                    </li>
                    <li>
                      <strong>Fat:</strong>{" "}
                      {multiply(item.fat_total_g, qty)} g
                    </li>
                    <li>
                      <strong>Serving Size:</strong>{" "}
                      {multiply(item.serving_size_g, qty)} g
                    </li>
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        !loading && <p className={styles.message}>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
