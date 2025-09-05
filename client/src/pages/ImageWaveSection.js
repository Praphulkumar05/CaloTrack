import { useState, useEffect } from "react";
import styles from "./ImageWaveSection.module.css";

const ImageWaveSection = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.imageWaveSection}>
      {images.map((item, index) => {
        let position = "side";
        if (index === currentIndex) position = "center";
        else if (
          index === (currentIndex - 1 + images.length) % images.length ||
          index === (currentIndex + 1) % images.length
        )
          position = "near";

        return (
          <div
            key={index}
            className={`${styles.gradientBorder} ${styles[position]}`}
          >
            <img src={item.src} alt={item.alt} className={styles.waveImage} />
            <p className={styles.imageCaption}>{item.caption}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ImageWaveSection;
