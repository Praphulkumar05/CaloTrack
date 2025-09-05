import React from "react";
import styles from "./CategoryMenu.module.css";

const frequentlySearched = [
  "Liquor & Cocktails", "Meat", "Beer", "Fruit", "Pizza",
  "Vegetables & Legumes", "Food with high calorie", "Food with low calorie", "Food with no calorie"
];

const allCategories = [
  "Beef & Veal", "Meat", "Beer", "Milk & Dairy Products",
  "Bread, Rolls & Pastries", "Mushrooms", "Cakes & Pies", "Nuts & Seeds", "Cereal",
  "Oils & Fats", "Cheese", "Pasta & Noodles", "Popcorn & Snacks", "Chicken & Turkey",
  "Rice Products", "Salad", "Flour & Grains", "Sauces & Dressings", "Protein Powder",
  "Ham & Sausage", "Herbs & Spices", "Sushi", "Chocolate & Candy", "Tofu & Vegan Products",
  "Vegetables & Legumes"
];

const CategoryMenu = ({ onSelect }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3>Frequently searched</h3>
        <ul>
          {frequentlySearched.map((item, i) => (
            <li key={i} onClick={() => onSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.right}>
        <h3>All Categories</h3>
        <div className={styles.grid}>
          {allCategories.map((cat, i) => (
            <div key={i} className={styles.gridItem} onClick={() => onSelect(cat)}>
              {cat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
