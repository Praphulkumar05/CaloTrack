const axios = require("axios");

exports.getCalories = async (req, res) => {
  const food = req.query.food?.trim();
  const quantity = parseFloat(req.query.quantity?.trim());

  if (!food || isNaN(quantity)) {
    return res.status(400).json({ error: "Valid food and quantity are required" });
  }

  try {
    const response = await axios.get("https://api.calorieninjas.com/v1/nutrition", {
      headers: { "X-Api-Key": "W/wuraiHoUsBlUGDogCZew==XIFhJBOqp63o5RAT" },
      params: { query: food }
    });

    if (response.data.items.length === 0) {
      return res.status(404).json({ error: "Food not found" });
    }

    const calPerUnit = response.data.items[0].calories;
    const totalCalories = calPerUnit * quantity;

    res.json({ food, quantity, totalCalories });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error fetching calorie data" });
  }
};
