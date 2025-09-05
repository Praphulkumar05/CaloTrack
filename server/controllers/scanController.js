const multer = require("multer");
const Jimp = require("jimp");
const axios = require("axios");
const { MultiFormatReader, BarcodeFormat, DecodeHintType, RGBLuminanceSource, BinaryBitmap, HybridBinarizer } = require("@zxing/library");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const decodeCode = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📸 File received:", req.file);

    // Read image using Jimp
    const image = await Jimp.read(req.file.buffer);

    const width = image.bitmap.width;
    const height = image.bitmap.height;
    const rgbaBuffer = image.bitmap.data;

    const luminances = new Uint8ClampedArray(width * height);
    for (let i = 0; i < luminances.length; i++) {
      const r = rgbaBuffer[i * 4];
      const g = rgbaBuffer[i * 4 + 1];
      const b = rgbaBuffer[i * 4 + 2];
      luminances[i] = (r + g + b) / 3;
    }

    const luminanceSource = new RGBLuminanceSource(luminances, width, height);
    const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));

    const hints = new Map();
    hints.set(DecodeHintType.TRY_HARDER, true); 
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.CODE_128,
      BarcodeFormat.EAN_13,
    ]);

    const reader = new MultiFormatReader();
    reader.setHints(hints);

    // Decode barcode/QR
    const result = reader.decode(binaryBitmap);
    const decodedText = result.getText();
    console.log("✅ Decoded text:", decodedText);

    // 🔎 Step 2: Fetch Nutrition Info from USDA API
    const apiKey = process.env.USDA_API_KEY;
    const searchUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(decodedText)}&api_key=${apiKey}`;

    const { data } = await axios.get(searchUrl);

    if (!data.foods || data.foods.length === 0) {
      return res.status(404).json({ error: "No nutrition info found for this item" });
    }

    // Grab first match
    const foodItem = data.foods[0];

    const nutritionInfo = {
      description: foodItem.description,
      brand: foodItem.brandOwner || "Generic",
      calories: foodItem.foodNutrients.find(n => n.nutrientName === "Energy")?.value || "N/A",
      protein: foodItem.foodNutrients.find(n => n.nutrientName === "Protein")?.value || "N/A",
      fat: foodItem.foodNutrients.find(n => n.nutrientName === "Total lipid (fat)")?.value || "N/A",
      carbs: foodItem.foodNutrients.find(n => n.nutrientName === "Carbohydrate, by difference")?.value || "N/A",
    };

    res.json({
      scannedCode: decodedText,
      nutrition: nutritionInfo,
    });

  } catch (err) {
    console.error("Decode error:", err);
    res.status(500).json({ error: err.message || "Failed to decode" });
  }
};

module.exports = { upload, decodeCode };
