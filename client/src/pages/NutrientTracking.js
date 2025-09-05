import React, { useState } from 'react';
import styles from './NutrientTracking.module.css';
import Lottie from 'lottie-react';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import LoadinPage from '../assets/Loading.json';
import ProNav from '../components/ProNav';
import macro from '../assets/macro.jpg';

const API_KEY = 'HMGZqMd1kIIQ3umDqeudPk9daskmI7QgL1T6KIsO';

const NutrientTracking = () => {
  const [query, setQuery] = useState('');
  const [nutrients, setNutrients] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchFood = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setNutrients(null);

    try {
      const searchRes = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&pageSize=1&api_key=${API_KEY}`
      );
      const searchData = await searchRes.json();
      console.log('🔍 Search data:', searchData);

      if (!searchData.foods || searchData.foods.length === 0) {
        setError('No results found.');
        setLoading(false);
        return;
      }

      const fdcId = searchData.foods[0].fdcId;

      const detailRes = await fetch(
        `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${API_KEY}`
      );
      const detailData = await detailRes.json();
      console.log('FULL detailData:', JSON.stringify(detailData, null, 2));

      const foodNutrients = detailData.foodNutrients || [];
      console.log('Full nutrient objects:', detailData.foodNutrients);
      console.log('detailData keys:', Object.keys(detailData));

      setNutrients(foodNutrients);
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const macroKeys = ['protein', 'total lipid (fat)', 'carbohydrate, by difference'];
  const microKeys = [
    'calcium, ca', 'iron, fe', 'magnesium, mg', 'potassium, k',
    'sodium, na', 'zinc, zn', 'vitamin c, total ascorbic acid',
    'vitamin b-6', 'vitamin b-12', 'vitamin a, iu'
  ];

  const renderNutrients = (label, keys) => (
    <>
      <h3>{label}</h3>
      {nutrients
        .filter(n =>
          keys.some(key =>
            n.nutrient?.name?.toLowerCase().includes(key.toLowerCase())
          )
        )
        .map((n, index) => (
          <div key={index} className={styles.nutrientItem}>
            <span>{n.nutrient?.name}</span>
            <span>{n.amount} {n.nutrient?.unitName}</span>
          </div>
        ))}
    </>
    
  );

 

  const getChartData = (keys) => {
    return nutrients
      ?.filter(n =>
        keys.some(key =>
          n.nutrient?.name?.toLowerCase().includes(key.toLowerCase())
        )
      )
      .map(n => ({
        name: n.nutrient?.name,
        value: n.amount,
        unit: n.nutrient?.unitName
      }));
  };
  const getUnitForNutrient = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes("calorie")) return "kcal";
  if (["protein", "carbohydrate", "fat", "fiber", "sugar"].some(w => lower.includes(w))) return "g";
  if (["sodium", "potassium", "calcium", "iron", "zinc", "magnesium"].some(w => lower.includes(w))) return "mg";
  if (lower.includes("vitamin")) return "mg";
  return "g";
};
const renderReadableList = (keys) => {
  const list = getChartData(keys);
  return (
    <div className={styles.readableList}>
      {list?.map((item, idx) => (
        <div key={idx} className={styles.nutrientItem}>
          <span>{item.name}</span>
          <span>{item.value} {getUnitForNutrient(item.name)}</span>
        </div>
      ))}
    </div>
  );
};


  const MacroChart = () => {
    const data = getChartData(macroKeys);
    return data?.length ? (
      <>
        <h4>Macronutrient Chart</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value, name, props) => [`${value} ${props.payload.unit}`, name]} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </>
    ) : null;
  };

  const MicroChart = () => {
    const data = getChartData(microKeys);
    return data?.length ? (
      <>
        <h4>Micronutrient Chart</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value, name, props) => [`${value} ${props.payload.unit}`, name]} />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </>
    ) : null;
  };

  return (
    



  <>
  

    <ProNav onReset={() => {
    
      setQuery('');
      setNutrients(null);
      setError('');
    }} />

  <div className={styles.wrapper}>
  <div className={styles.imageSection}>
    <img src={macro} alt="Macro View" className={styles.MacroImg} />
    <h2>Macro + Micro Nutrient Tracking</h2>
    <div className={styles.nutritionIntro}>
  <h3>🍽️ Understanding Your Nutritional Blueprint</h3>

  <p>
    Nutrition isn’t just about eating — it’s about **feeding your body with the right balance** of nutrients to thrive.
    Your daily fuel comes primarily from <strong>carbohydrates (20.46g)</strong>, <strong>proteins (16.37g)</strong>, and <strong>fats (3.58g)</strong>, 
    each playing a vital role in your health and energy levels.
  </p>

  <p>
    <strong>Carbohydrates</strong> are your brain’s best friend and your muscles’ primary source of energy. 
    <strong>Proteins</strong> repair tissue and build muscle mass, while <strong>healthy fats</strong> support hormones and 
    keep your brain sharp and focused.
  </p>

  <p>
    But don’t ignore the **micronutrients**, your body's unsung heroes. With <strong>737 mg of sodium</strong> for fluid balance, 
    <strong>169 mg potassium</strong> for muscle contractions, <strong>38 mg calcium</strong> for bone strength, and 
    <strong>1.28 mg iron</strong> to fuel oxygen delivery — these small elements play a **huge** role in your well-being.
  </p>

  <p>
    Tracking both macro and micronutrients isn’t just smart — it’s empowering. Whether you're hitting the gym, mastering yoga, 
    or just trying to feel your best, **data-backed nutrition** turns goals into progress.
  </p>

  <div className={styles.separator}></div>
</div>
  </div>

  <div className={styles.trackerSection}>
    <div className={styles.inputGroup}>
      <input
        type="text"
        placeholder="Enter food name (e.g., Banana)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchFood}>Search</button>
    </div>

    {loading && (
      <div className={styles.loadingContainer}>
        <Lottie animationData={LoadinPage} loop={true} />
      </div>
    )}

    {error && <p style={{ color: 'red' }}>{error}</p>}

    {nutrients && (
      <div className={styles.resultCard}>
        <h3>Macronutrients</h3>
        {renderNutrients('', macroKeys)}
        <MacroChart />
        {renderReadableList(macroKeys)}

        <hr />

        <h3>Micronutrients</h3>
        {renderNutrients('', microKeys)}
        <MicroChart />
        {renderReadableList(microKeys)}
      </div>
    )}
  </div>
</div>


  </>
);
}

export default NutrientTracking;
