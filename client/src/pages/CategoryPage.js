import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./CategoryPage.module.css"; // create styling later

const CategoryPage = () => {
  const { type } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackImage =
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/nutrition?query=${type}`,
          {
            headers: {
              "X-Api-Key": "W/wuraiHoUsBlUGDogCZew==156HIJOPWab1ANom",
            },
          }
        );
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch category data:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [type]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Category: {type}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.grid}>
          {data.map((item, i) => (
            <div className={styles.card} key={i}>
              <img
                src={`https://source.unsplash.com/400x300/?${item.name},food`}
                alt={item.name}
                onError={(e) => (e.target.src = fallbackImage)}
                className={styles.foodImg}
              />
              <div className={styles.content}>
                <h2>{item.name}</h2>
                <ul>
                  <li><strong>Calories:</strong> {item.calories} kcal</li>
                  <li><strong>Protein:</strong> {item.protein_g} g</li>
                  <li><strong>Carbs:</strong> {item.carbohydrates_total_g} g</li>
                  <li><strong>Fat:</strong> {item.fat_total_g} g</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
