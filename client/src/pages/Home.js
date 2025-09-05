import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Foot from "../components/Foot";
import api, { fetchFoodByCategory } from "../utils/api";
import styles from "./Home.module.css";
import { useNavigate, Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import ImageWaveSection from "./ImageWaveSection";
import axios from "axios";
import { List, Send } from "lucide-react";

import img1 from "../assets/IMAGE.jpg";
import HomePage from "../assets/Pattern.jpg";

import purchase from "../assets/ProVersion.json";
import Start from "../assets/Startbtn.json";
import Lottie from "lottie-react";

import imgA from "../assets/healthy.jpg";
import imgB from "../assets/meal.jpg";
import imgC from "../assets/dailyfitness.jpg";
import imgD from "../assets/hydration.jpg";
import imgE from "../assets/running.jpg";

import pro1 from "../assets/pro1.jpg";
import pro2 from "../assets/pro2.jpg";
import pro3 from "../assets/pro3.jpg";

import ChatBot from "../assets/Chat Bot.json";

import healthTips from "../data/healthTips.json";
import { Html5QrcodeScanner } from "html5-qrcode";
import jsQR from "jsqr";
import scanner from "../assets/SCAN.json";

const fetchUSDAFoodByBarcode = async (barcode) => {
  try {
    const apiKey = process.env.REACT_APP_USDA_KEY;
    const res = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${barcode}&dataType=Branded&api_key=${apiKey}`
    );

    if (res.data.foods && res.data.foods.length > 0) {
      const food = res.data.foods[0];
      const caloriesObj = food.foodNutrients.find(
        (nutrient) => nutrient.nutrientName === "Energy"
      );
      return {
        name: food.description,
        calories: caloriesObj ? caloriesObj.value : 0,
        nutrients: food.foodNutrients,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("USDA API Error:", error);
    return null;
  }
};

const Home = () => {
  const [category, setCategory] = useState("");
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState(null);
  const [msg, setMsg] = useState("");
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % healthTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (showScanner) {
      const scanner = new Html5QrcodeScanner("qr-reader", {
        fps: 10,
        qrbox: 250,
      });

      scanner.render(
        async (decodedText) => {
          console.log("Scanned code:", decodedText);
          setShowScanner(false);
          scanner.clear();

          // Call USDA API
          const foodInfo = await fetchUSDAFoodByBarcode(decodedText);
          if (foodInfo) {
            setFoodName(foodInfo.name);
            setCalories(foodInfo.calories);
            setMsg(""); // clear any previous messages
          } else {
            setMsg("Food not found in USDA database.");
          }
        },
        (error) => console.warn(error)
      );
    }
  }, [showScanner]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // 👈 must match upload.single("image") in backend

    try {
      const res = await axios.post("http://localhost:5000/api/scan", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Backend response:", res.data);

      if (res.data.code) {
        setMsg(`Decoded: ${res.data.code}`);

        // 🔎 Lookup food info with USDA (replace with your logic if different)
        const foodInfo = await fetchUSDAFoodByBarcode(res.data.code);
        if (foodInfo) {
          setFoodName(foodInfo.name);
          setCalories(foodInfo.calories);
        } else {
          setMsg("Food not found in USDA database.");
        }
      } else {
        setMsg("❌ No QR/Barcode detected.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMsg("⚠️ Failed to scan barcode. Please try again.");
    }
  };

  const handleCalculate = async () => {
    if (!foodName || !quantity) {
      setMsg("Please enter both food name and quantity.");
      return;
    }

    try {
      const res = await api.get(
        `/calories?food=${foodName.trim()}&quantity=${parseFloat(quantity)}`
      );
      setCalories(res.data.totalCalories);
      setMsg("");
    } catch (err) {
      setMsg(err.response?.data?.error || "Something went wrong.");
    }
  };

  const handleReset = () => {
    setCategory("");
    setFoodName("");
    setQuantity("");
    setCalories(null);
    setMsg("");
    setSearchResults([]);
  };

  const handleCategorySearch = async (query) => {
    const data = await fetchFoodByCategory(query);
    setSearchResults(data);
  };

  const handleNavbarSearch = async (query) => {
    const data = await fetchFoodByCategory(query);
    setSearchResults(data);
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [pro1, pro2, pro3]; // your imported images

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const handleSearchKey = async (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      try {
        // Call your AI backend
        const res = await axios.post("http://localhost:5000/api/ai/ask", {
          prompt: searchQuery.trim(),
        });

        setAiResponse(res.data.reply); // store AI reply
        setSearchQuery(""); // clear input
      } catch (error) {
        console.error("AI request failed:", error);
        setAiResponse("⚠️ Sorry, something went wrong. Try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* ✅ Navbar */}
      <Navbar
        onSelectCategory={(cat) => {
          setCategory(cat);
          handleCategorySearch(cat);
        }}
        onSearch={handleNavbarSearch}
        onReset={handleReset}
      />

      {/* ✅ Header Section */}
      <div className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heading}>
              Your Personalized <br /> Calorie Guide
            </h1>
            <p className={styles.subheading}>
              Get an instant estimate of your daily energy needs — tailored to
              your lifestyle, fitness goals, and routine.
              <br />
              Track smarter, eat better, and stay in control of your health
              every single day.
              <br />
              Start now and take the guesswork out of nutrition!
            </p>

            {/* Lottie Get Started Button */}
            <div className={styles.lottieWrapper}>
              <Link to="/scan">
                <Lottie
                  animationData={Start}
                  loop={true}
                  autoplay={true}
                  // style={{ width: 500, height: 150, cursor: "pointer" }} // bigger size
                  className={styles.lottieAnimation}
                />
              </Link>
            </div>
          </div>

          <div className={styles.heroImageWrapper}>
            {/* Background SVG Pattern */}
            <svg
              className={styles.globePattern}
              width="500"
              height="500"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="250"
                cy="250"
                r="200"
                stroke="white"
                fill="none"
                strokeWidth="2"
              />
              <circle
                cx="250"
                cy="250"
                r="160"
                stroke="white"
                fill="none"
                strokeWidth="1"
                strokeDasharray="6,6"
              />
              <circle
                cx="250"
                cy="250"
                r="120"
                stroke="white"
                fill="none"
                strokeWidth="1"
                strokeDasharray="4,6"
              />
              <circle
                cx="250"
                cy="250"
                r="80"
                stroke="white"
                fill="none"
                strokeWidth="1"
                strokeDasharray="2,6"
              />

              <ellipse
                cx="250"
                cy="250"
                rx="200"
                ry="100"
                stroke="white"
                fill="none"
                strokeWidth="1"
                strokeDasharray="6,6"
              />
              <ellipse
                cx="250"
                cy="250"
                rx="200"
                ry="50"
                stroke="white"
                fill="none"
                strokeWidth="1"
                strokeDasharray="4,6"
              />

              <circle cx="350" cy="170" r="8" fill="white" />
              <circle cx="180" cy="330" r="8" fill="white" />
              <circle cx="280" cy="300" r="8" fill="white" />
            </svg>

            {/* Foreground Images */}
            <img
              src={img1}
              alt="Healthy Food Banner"
              className={styles.heroImage}
            />
            <img
              src={HomePage}
              alt="Second Banner"
              className={styles.SecondImageMain}
            />
          </div>
        </div>
      </div>

      <Link to="/scan" className={styles.barcodeWrapper}>
        {/* Left side Lottie */}
        <div className={styles.lottieBox}>
          <Lottie
            animationData={scanner}
            loop={true}
            className={styles.lottie}
          />
        </div>

        {/* Right side Text */}
        <div className={styles.scannerText}>
          <ul>
            <li>
              <strong>Instant Access:</strong> Get product details, prices, and
              reviews in seconds.
            </li>
            <li>
              <strong>Ultimate Convenience:</strong> No more manual typing or
              searching. Just scan and go.
            </li>
            <li>
              <strong>Effortless Comparisons:</strong> Easily compare prices and
              features to make smarter shopping decisions.
            </li>
            <li>
              <strong>Quick & Accurate:</strong> Scans are fast and reliable,
              saving you time and preventing errors.
            </li>
          </ul>
        </div>
      </Link>

      {/* ChatBot */}

      <div className={styles.ChatBOT}>
        <div className={styles.CHAT}>
          <h1 className={styles.TEXTAI}>
            AI Redefines <br></br>{" "}
            <span className={styles.Highlight}>Calorie Calculator</span>
          </h1>

          <p className={styles.TEXTPARA}>
            Discover precise calorie information instantly with our advanced
            AI-powered food <br></br>
            scanner and intelligent search technology.<br></br> Whether you scan
            your meal or simply ask a question, our system delivers accurate
            nutrition details in seconds.<br></br> From everyday snacks to
            complex dishes, you can track calories, explore healthier choices,
            <br></br>
            and get the answers you need—all with ease and convenience.<br></br>
          </p>

          <Player
            autoplay
            loop
            src={ChatBot}
            style={{ height: "300px", width: "300px" }}
          />

          {/* Ai Srh box */}

          <div className={styles.CHATBOX}>
            <input
              className={styles.userAction}
              placeholder="🤖 Describe your food..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKey}
            />

            {/* Send Button */}
            <button className={styles.iconButton}>
              <Send size={20} />
            </button>

            {aiResponse && (
              <div className={styles.aiResponse}>
                <p>
                  <strong>AI Says:</strong> {aiResponse}
                </p>
              </div>
            )}
          </div>

          {/* AI Search Box */}
          <div className={styles.TEXTCHAT}>
            <div className={styles.AICARDS}>
              <div className={styles.card}>
                <div className={`${styles.icon} ${styles.iconBlue}`}>📷</div>
                <h3>Smart QR Scanner</h3>
                <p>
                  Instantly scan product QR codes to get comprehensive
                  nutritional information with AI-powered accuracy.
                </p>
              </div>

              <div className={styles.card}>
                <div className={`${styles.icon} ${styles.iconPurple}`}>🤖</div>
                <h3>AI Food Recognition</h3>
                <p>
                  Advanced machine learning algorithms provide precise calorie
                  calculations for thousands of food items.
                </p>
              </div>

              <div className={styles.card}>
                <div className={`${styles.icon} ${styles.iconOrange}`}>📊</div>
                <h3>Complete Nutrition</h3>
                <p>
                  Get detailed breakdowns of proteins, carbohydrates, fats,
                  fiber, and other essential nutrients.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section class="bottom-section"></section>

        <div className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>CaloTrack Top Features</h2>
          <p className={styles.sectionSubtitle}>
            You will love the minimalistic design and easy to use features!
          </p>

          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <h3>Calorie Counting</h3>
              <p>
                Calory provides a quick way to record the calories you consume,
                making it a helpful nutrition, health, and weight loss app.
              </p>
            </div>

            <div className={styles.card}>
              <h3>AI Integration</h3>
              <p>
                This web app comes with built-in AI integration, making it
                smarter and more interactive. From personalized recommendations
                to automated insights, the AI helps enhance your overall
                experience.
              </p>
            </div>

            <div className={styles.card}>
              <h3>Water Tracking</h3>
              <p>
                Calory isn’t just a calories counter and calculator – it also
                provides a way to track your hydration levels too! Track how
                much water you drink during the day.
              </p>
            </div>

            <div className={styles.card}>
              <h3>Macro Tracking</h3>
              <p>
                The Calory food and calorie tracker app gives you the ability to
                track your nutrition intake in detail. This includes the option
                to specify daily macro nutrient goals
              </p>
            </div>
          </div>
        </div>

        {/* Image Card */}

        <ImageWaveSection
          images={[
            { src: imgA, alt: "Healthy Snack", caption: "Healthy Snack" },
            { src: imgB, alt: "Balanced Meal", caption: "Balanced Meal" },
            { src: imgC, alt: "Daily Fitness", caption: "Daily Fitness" },
            { src: imgD, alt: "Hydration", caption: "Hydration" },
            { src: imgE, alt: "Running", caption: "Running" },
          ]}
        />

        <div className={styles.carouselWrapper}>
          <button onClick={goToPrevious} className={styles.arrowLeft}>
            ←
          </button>

          <div className={styles.carouselContent}>
            {/* Image & Button */}
            <div className={styles.imageContainer}>
              <img
                src={images[currentSlide]}
                className={styles.carouselImage}
                alt="carousel"
              />
              <button
                className={`${styles.knowMoreBtn} ${styles.animatedBtn}`}
                onClick={() => navigate("/pro-version")}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                Subscribe Now
                <Lottie
                  animationData={purchase}
                  loop
                  autoplay
                  style={{ width: 24, height: 24 }}
                />
              </button>
            </div>

            {/* Right-side Text */}
            <div className={styles.textContainer}>
              <h2>Upgrade to Pro</h2>
              <p>
                Unlock advanced features like smart calorie insights, AI fitness
                coaching, and personalized diet tracking.
              </p>
              <p>
                Be part of the fitness revolution — track smarter, live better.
              </p>
            </div>
          </div>

          <button onClick={goToNext} className={styles.arrowRight}>
            →
          </button>
        </div>
        {/* ✅ Input Form */}
        {category && (
          <div className={styles.inputGroup}>
            <h3>{category} - Enter food details</h3>

            <input
              className={styles.input}
              placeholder="Food name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
            <br />

            <input
              className={styles.input}
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value.trim())}
            />
            <br />

            <button className={styles.button} onClick={handleCalculate}>
              Calculate
            </button>

            {msg && <p className={styles.error}>{msg}</p>}
          </div>
        )}

        {/* ✅ Calorie Result */}
        {calories !== null && <h3>Total Calories: {calories} kcal</h3>}

        {/* ✅ Footer */}
        {/* <Footer /> */}
        <Foot></Foot>
      </div>
    </div>
  );
};

export default Home;
