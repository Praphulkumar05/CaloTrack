const express= require("express");
const router = express.Router();
const {getCalories} = require("../controllers/calorieController");

router.get("/",getCalories);
module.exports = router;