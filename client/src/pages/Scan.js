import React, { useRef, useState } from "react";
import styles from "./Scan.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Scan() {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [stream, setStream] = useState(null);
  const [activeTab, setActiveTab] = useState("barcode");
  const [barcodeValue, setBarcodeValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [foodInfo, setFoodInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestions = [
    "Coca Cola, Coke",
    "Pepsi",
    "Red Bull, Energy Drink",
    "Tropicana, Orange Juice",
    "Sprite, Lemon Lime Soda"
  ];

  const handleSearch = async () => {
    const input = activeTab === "barcode" ? barcodeValue.trim() : nameValue.trim();
    if (!input) return;

    setLoading(true);
    setFoodInfo(null);
    setError("");

    try {
      const payload = activeTab === "barcode" ? { barcode: input } : { name: input };

      const response = await fetch("http://localhost:5000/api/food/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 404) {
        const msg = "No food found for this barcode or name. Try another one.";
        setError(msg);
        toast.error(msg);
        return;
      }

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setFoodInfo(data);

    } catch (err) {
      console.error("❌ Fetch Error:", err);
      const msg = "Failed to fetch data. Try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const startScan = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setScanning(true);
    } catch (err) {
      const msg = "Camera access denied.";
      setError(msg);
      toast.error(msg);
    }
  };

  const stopScan = () => {
    if (stream) stream.getTracks().forEach((track) => track.stop());
    setScanning(false);
  };

  return (
    <div className={styles.scanPage}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.card}>
        <div className={styles.tabHeader}>
          <button
            className={activeTab === "barcode" ? styles.activeTab : ""}
            onClick={() => setActiveTab("barcode")}
          >
            Scan Barcode
          </button>
          <button
            className={activeTab === "name" ? styles.activeTab : ""}
            onClick={() => setActiveTab("name")}
          >
            Search by Name
          </button>
        </div>

        {activeTab === "barcode" && (
          <>
            <div className={styles.scannerBox}>
              {scanning ? (
                <video
                  ref={videoRef}
                  className={styles.video}
                  autoPlay
                  playsInline
                  muted
                />
              ) : (
                "📷"
              )}
            </div>
            <button
              onClick={scanning ? stopScan : startScan}
              className={styles.scanButton}
            >
              {scanning ? "Stop Scanning" : "Start Scanning"}
            </button>
          </>
        )}

        {activeTab === "name" && (
          <p className={styles.subtitle}>
            Enter the product name to find nutrition info
          </p>
        )}

        <div className={styles.or}>or enter manually</div>

        <div className={styles.inputRow}>
          <input
            type="text"
            placeholder={
              activeTab === "barcode"
                ? "Enter barcode number"
                : "Enter product name (e.g., Coca Cola, Red Bull)"
            }
            className={styles.input}
            value={activeTab === "barcode" ? barcodeValue : nameValue}
            onChange={(e) =>
              activeTab === "barcode"
                ? setBarcodeValue(e.target.value)
                : setNameValue(e.target.value)
            }
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Show inline error */}
        {error && <p className={styles.error}>{error}</p>}

   {/* Suggestions */}
{activeTab === "name" && suggestions.length > 0 && !foodInfo && !error && (
  <div className={styles.suggestions}>
    <p>Try one of these:</p>
    <ul>
      {suggestions.map((item, index) => (
        <li key={index} onClick={() => setNameValue(item)}>
          {item}
        </li>
      ))}
    </ul>
  </div>
)}


        {/* Sample Barcodes */}
        {activeTab === "barcode" && (
          <div className={styles.sampleBarcodes}>
            <p>Try these sample barcodes:</p>
            <ul>
              <li onClick={() => setBarcodeValue("012000161155")}>
                012000161155 - Coca-Cola
              </li>
              <li onClick={() => setBarcodeValue("01200005009")}>
                01200005009 - Pepsi
              </li>
              <li onClick={() => setBarcodeValue("041318470024")}>
                041318470024 - Red Bull
              </li>
              <li onClick={() => setBarcodeValue("041800402908")}>
                041800402908 - Tropicana
              </li>
            </ul>
          </div>
        )}

        {/* Food Info */}
        {foodInfo && (
          <div className={styles.foodInfo}>
            {foodInfo.image && <img src={foodInfo.image} alt={foodInfo.name} />}
            <h3>{foodInfo.name || foodInfo.description}</h3>
            <p><b>Brand:</b> {foodInfo.brand || foodInfo.brandOwner}</p>
            <p><b>Calories:</b> {foodInfo.calories}</p>
            <p><b>Protein:</b> {foodInfo.protein}g</p>
            <p><b>Fat:</b> {foodInfo.fat}g</p>
            <p><b>Carbs:</b> {foodInfo.carbs}g</p>
            <p><b>Sugar:</b> {foodInfo.sugar}g</p>
            <p><b>Ingredients:</b> {foodInfo.ingredients}</p>
          </div>
        )}
      </div>
    </div>
  );
}
