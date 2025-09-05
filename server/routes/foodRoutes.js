const express = require("express");
const router = express.Router();
const { getFoodInfo } = require("../controllers/foodController");

// POST /api/food/search
router.post("/search", getFoodInfo);

module.exports = router;
