import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// ✅ NEW: Nutrition API (e.g. API Ninjas)
const NUTRITION_API_URL = "https://api.api-ninjas.com/v1/nutrition";
const API_KEY = process.env.REACT_APP_API_KEY;

/**
 * ✅ Fetch food data from external nutrition API
 * @param {string} query
 * @returns {Promise<Array>}
 */
export const fetchFoodByCategory = async (query) => {
  try {
    const response = await fetch(`${NUTRITION_API_URL}?query=${encodeURIComponent(query)}`, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch food data");
    }

    const data = await response.json();

    // Ensure it's always returned as an array
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Nutrition API error:", error.message);
    return [];
  }
};

// ✅ Export default backend API + named food function
export default api;

