import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./SaladPage.module.css";
import Lottie from "lottie-react";
import SaladWaiting from "../assets/FoodAnimation.json";
import Vege from "../assets/wired-outline-526-paper-bag-vegetables-in-reveal.json";

const SaladPage = () => {
  const [salads, setSalads] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const observer = useRef();

  const fetchSalads = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=salad&number=10&offset=${offset}&addRecipeNutrition=true&apiKey=973603b0e6714a14b1904c72cbafefd5`
      );
      const data = await response.json();
      setSalads((prev) => [...prev, ...data.results]);
      setHasMore(data.results.length > 0);
    } catch (error) {
      console.error("Error fetching salads:", error);
    } finally {
      setLoading(false);
    }
  }, [offset]);

  useEffect(() => {
    fetchSalads();
  }, [fetchSalads]);

  const lastSaladRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prev) => prev + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchRecipe = async (id) => {
    setRecipeLoading(true);
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=973603b0e6714a14b1904c72cbafefd5`
      );
      const data = await res.json();
      setSelectedRecipe(data);
    } catch (error) {
      console.error("Failed to load recipe info:", error);
    } finally {
      setRecipeLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className={styles.saladPage}>
      <div className={styles.MainPara}>
        <div className={styles.vegeContainer}>
          <Lottie animationData={Vege} loop={true} />
        </div>
        <h4 className={styles.MainHead}>
          {"Salad: More Than Just a Side Dish".split("").map((char, i) => (
            <span
              key={i}
              className={styles.letter}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h4>
        <h3 className={styles.HeadingText}>
          Embrace the power of fresh greens and vibrant vegetables! Adding a
          salad to your meal is a simple yet impactful step towards a healthier
          lifestyle, boosting your energy and nourishing your body from within.
        </h3>
      </div>

      <h2 className={styles.heading}>Salad Explorer 🥗</h2>
      <div className={styles.scrollContainer}>
        {salads.map((salad, index) => {
          const isLast = index === salads.length - 1;
          const calories = Math.round(
            salad.nutrition?.nutrients?.find((n) => n.name === "Calories")
              ?.amount || 0
          );

          return (
            <div
              className={styles.saladCard}
              key={salad.id}
              ref={isLast ? lastSaladRef : null}
            >
              <img src={salad.image} alt={salad.title} />
              <h3>{salad.title}</h3>
              <p>
                <strong>Calories:</strong>
                <span className={styles.calorieValue}> {calories}</span> kcal
              </p>
              <button
                onClick={() => fetchRecipe(salad.id)}
                className={styles.recipeButton}
              >
                View Recipe
              </button>
            </div>
          );
        })}
      </div>

      {loading && (
        <div className={styles.loading}>
          <Lottie
            animationData={SaladWaiting}
            loop={true}
            style={{ height: 150 }}
          />
        </div>
      )}

      {!hasMore && <p className={styles.endText}>You’ve reached the end 🥗</p>}

      {selectedRecipe && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedRecipe.title}</h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className={styles.modalImage}
            />
            <p
              dangerouslySetInnerHTML={{
                __html:
                  selectedRecipe.instructions || "No instructions available.",
              }}
            />
            <button onClick={closeModal} className={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}

      {recipeLoading && (
        <div className={styles.recipeLoader}>Loading recipe...</div>
      )}
    </div>
  );
};

export default SaladPage;
