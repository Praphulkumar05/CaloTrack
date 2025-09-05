const express = require("express");
const { upload, decodeCode } = require("../controllers/scanController");

const router = express.Router();

// POST /api/scan
router.post("/", upload.single("image"), decodeCode);

module.exports = router;
