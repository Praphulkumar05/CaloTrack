const axios = require("axios");

const getFoodInfo = async (req, res) => {
  try {
    const { barcode, name } = req.body;

    if (!barcode && !name) {
      return res.status(400).json({ error: "Barcode or product name is required" });
    }

    const appId = process.env.NUTRITIONIX_APP_ID;
    const appKey = process.env.NUTRITIONIX_APP_KEY;

    if (!appId || !appKey) {
      return res.status(500).json({ error: "Missing Nutritionix credentials" });
    }

    let url = "";
    let method = "get";
    let headers = {
      "x-app-id": appId,
      "x-app-key": appKey,
    };
    let data;

    if (barcode) {
      url = `https://trackapi.nutritionix.com/v2/search/item?upc=${barcode}`;
    } else if (name) {
      const query = name.trim();
      if (!query) return res.status(400).json({ error: "Invalid product name" });

      const sanitizedQuery = query.replace(/[^a-zA-Z0-9\s,.-]/g, "");
      url = "https://trackapi.nutritionix.com/v2/natural/nutrients";
      method = "post";
      headers["Content-Type"] = "application/json";
      data = { query: sanitizedQuery };
    }

    const response = await axios({ method, url, headers, ...(data && { data }) });

    let food;
    if (barcode) {
      if (!response.data.foods || response.data.foods.length === 0)
        return res.status(404).json({ error: "Food not found" });
      food = response.data.foods[0];
    } else if (name) {
      if (!response.data.foods || response.data.foods.length === 0)
        return res.status(404).json({ error: "Food not found" });
      food = response.data.foods[0];
    }

    const result = {
      description: food.food_name || "N/A",
      brandOwner: food.brand_name || "N/A",
      calories: food.nf_calories || "N/A",
      protein: food.nf_protein || "N/A",
      fat: food.nf_total_fat || "N/A",
      carbs: food.nf_total_carbohydrate || "N/A",
      sugar: food.nf_sugars || "N/A",
      image: food.photo?.thumb || null,
      ingredients: food.nf_ingredient_statement || "Not available",
    };

    res.json(result);
 } catch (err) {
  console.error("❌ Nutritionix API Error:", err.response?.data || err.message);

  if (err.response?.data?.message === "resource not found") {
    return res.status(404).json({ error: "Food not found in Nutritionix database" });
  }

  res.status(500).json({
    error: "Failed to fetch food info",
    details: err.response?.data || err.message,
  });
}

};

module.exports = { getFoodInfo };
