import React from "react";
import styles from "./InDepthArticle.module.css";
import nutrient from "../assets/images/InDepth/nutrient.jpg";
import bestBasal from "../assets/images/InDepth/bestBasal.jpg";
import breakHabit from "../assets/images/InDepth/breakHabit.jpg";
import bulkingGuide from "../assets/images/InDepth/bulk.jpg";
import carbohydrates from "../assets/images/InDepth/carbo.jpg";
import craftingEnvironment from "../assets/images/InDepth/craftingEnv.jpg";
import cuttingGuide from "../assets/images/InDepth/cutting.jpg";
import dailyRoutine from "../assets/images/InDepth/dailyroutine.jpg";
import fastMetabolism from "../assets/images/InDepth/fastMeta.jpg";
import dietaryFats from "../assets/images/InDepth/fat.jpg";
import weightGain from "../assets/images/InDepth/gainWeight.jpg";
import habitChange from "../assets/images/InDepth/habitChange.jpg";
import habitGoals from "../assets/images/InDepth/habitGoals.jpg";
import healthyHabits from "../assets/images/InDepth/habits.jpg";
import weightLoss from "../assets/images/InDepth/lossWeight.jpg";
import metabolicRate from "../assets/images/InDepth/MetaRate.jpg";
import micronutrientImportance from "../assets/images/InDepth/microImportant.jpg";
import micronutrientEssential from "../assets/images/InDepth/MicronutrientAndEssential.jpg";
import micronutrientSeries from "../assets/images/InDepth/MicronutrientSeries.jpg";
import micronutrientTracking from "../assets/images/InDepth/microTracking.jpg";
import areMicrosWorthIt from "../assets/images/InDepth/microWorth.jpg";
import nutrientOverview from "../assets/images/InDepth/nutrient.jpg";
import nutritionFundamentals from "../assets/images/InDepth/nutrition.jpg";
import proteinGuide from "../assets/images/InDepth/Protien2.jpg";
import runningTips from "../assets/images/InDepth/running.jpg";
import Main from "../assets/images/InDepth/Main.jpg";

function InDepthArticle() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>In-Depth Nutrition & Fitness Guide</h1>

      <p className={styles.intro}>
        Fitness is more than a goal — it’s a commitment to self-betterment.
        Being fit is not about achieving the perfect body, but about feeling
        strong, healthy, and empowered every single day. It’s about discipline,
        consistency, and understanding the fuel your body needs to perform and
        recover. Welcome to a journey that will inspire and educate you to make
        lasting change.
      </p>

      {/* Inspiring Image */}
      <div className={styles.imageContainer}>
          <img
            src={Main}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>
      {/* Article Sections */}

      <section className={styles.section}>
        <h2>Nutrition Fundamentals Series</h2>
        <div className={styles.imageContainer}>
          <img
            src={nutrient}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          Our series on nutrition fundamentals covers a range of topics, from
          daily intake guidelines for macronutrients to food sources and their
          potential impact on health. This series is great for those new to
          nutrition and enthusiasts seeking the latest guidelines.
        </p>
      </section>

      <section className={styles.section}>
        <h2>How Much Protein Should I Eat?</h2>
        <div className={styles.imageContainer}>
          <img
            src={proteinGuide}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>
        <p>
          Whether you’re bulking up or losing body fat, several questions
          remain: How much protein should I eat daily? Does it matter how much I
          eat in a meal? What are low-calorie sources? This article covers how
          much protein you should eat every day based on varying goals and
          populations.
        </p>
      </section>

      <section className={styles.section}>
        <h2>How Many Carbohydrates Should I Eat Every Day?</h2>
        <div className={styles.imageContainer}>
          <img
            src={carbohydrates}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>
        <p>
          Carbohydrates are diverse and valuable sources of energy, fiber, and
          nutrients. This article covers intake recommendations, the best foods
          for fiber, and the health impacts of different types of carbohydrates.
        </p>
      </section>

      <section className={styles.section}>
        <h2>How Much Fat Should I Eat Every Day?</h2>
        <div className={styles.imageContainer}>
          <img
            src={healthyHabits}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>
        <p>
          Fats are vital for optimal health and energy. This article highlights
          the importance of essential fatty acids, recommended daily intake, and
          food sources based on fat types.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Protein Quality: Why It Matters and How to Maximize It</h2>
        <div className={styles.imageContainer}>
          <img
            src={habitGoals}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          In this article, we explain rating protein quality, the effects of
          meal preparation on protein, and the importance of amino acid variety
          for vegans to ensure they obtain a complete profile.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Exploring Bulking and Cutting Series</h2>
        <div className={styles.imageContainer}>
          <img
            src={cuttingGuide}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          This article series digs into the brass tacks of outcome-focused,
          weight-related goals: should you bulk or cut, how fast should you aim
          to gain weight, and how fast should you aim to lose weight?
        </p>
      </section>

      <section className={styles.section}>
        <h2>Should I Bulk or Cut?</h2>
        <div className={styles.imageContainer}>
          <img
            src={weightGain}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          Trying to decide whether you should aim to gain or lose weight? This
          article and the accompanying “bulk or cut” quiz walk you through how
          to make the decision.
        </p>
      </section>

      <section className={styles.section}>
        <h2>How Fast Should You Gain Weight When Bulking?</h2>
        <div className={styles.imageContainer}>
          <img
            src={bulkingGuide}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          How fast should you aim to gain weight? That will ultimately depend on
          how long you’d like to bulk for, and your degree of comfort with
          gaining fat as you gain weight.
        </p>
      </section>

      <section className={styles.section}>
        <h2>How Fast Should You Lose Weight When Cutting?</h2>
        <div className={styles.imageContainer}>
          <img
            src={weightLoss}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          How fast should you aim to cut? That will ultimately depend on how
          long you’d like to diet, your comfort with potentially losing a bit of
          muscle, and your motivation and perceptions as your cut progresses.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Basal Metabolic Rate (BMR) Series</h2>
        <div className={styles.imageContainer}>
          <img
            src={bestBasal}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          We’ve done a thorough review of the literature on the latest BMR
          science digging into the research on factors that affect BMR.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Do People Really Have "Fast Metabolisms" or "Slow Metabolisms"?</h2>
        <div className={styles.imageContainer}>
          <img
            src={metabolicRate}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          If you compare two people who are the same height, same weight, same
          age, same sex, and who have the same body composition, could those two
          people still have BMRs that differ by 500+ calories per day? The
          answer might surprise you.
        </p>
      </section>

      <section className={styles.section}>
        <h2>What are the Best Basal Metabolic Rate Equations?</h2>
        <div className={styles.imageContainer}>
          <img
            src={habitChange}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          If you want to calculate your energy needs for weight gain, weight
          loss, or athletic performance, you first need to estimate your basal
          metabolic rate: how many Calories your body burns at rest.
        </p>
      </section>

      <section className={styles.section}>
        <h2>What Determines Your Basal Metabolic Rate?</h2>
        <div className={styles.imageContainer}>
          <img
            src={fastMetabolism}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          This article looks at the key factors that determine your basal
          metabolic rate (BMR), from fat-free tissues to vital organs.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Habits Series</h2>
        <div className={styles.imageContainer}>
          <img
            src={areMicrosWorthIt}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          In this five-part series on habits, we dive deep into the research on
          habits while providing actionable steps for meaningful change.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Why Habit Formation Matters For Goals</h2>
        <div className={styles.imageContainer}>
          <img
            src={breakHabit}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          This article explores the concept of habits, their significance in
          achieving your goals, and the importance of giving them more
          attention.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Why Are Habits Hard to Change?</h2>
        <div className={styles.imageContainer}>
          <img
            src={dietaryFats}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          In the second installment of our series on habits, we delve into the
          complexities of habit formation, uncovering the interplay between
          intentions and behavior change.
        </p>
      </section>

      <section className={styles.section}>
        <h2>How to Form (or Break) a Habit</h2>
        <div className={styles.imageContainer}>
          <img
            src={runningTips}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          In the third installment of our series on habits, we explore the
          technical mechanisms and essential principles underlying habit
          conditioning.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Daily Routines for Successful Habits</h2>
        <div className={styles.imageContainer}>
          <img
            src={dailyRoutine}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          This fourth article in our series explores how to structure daily
          routines to improve habit efficiency.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Crafting Environments to Support Your New Habits</h2>
        <div className={styles.imageContainer}>
          <img
            src={craftingEnvironment}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          This article concludes our five-part series by examining the impact of
          environments on our habits.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Micronutrient Series</h2>
        <div className={styles.imageContainer}>
          <img
            src={micronutrientImportance}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          Adequate micronutrient intake is an important component of optimizing
          overall nutrition.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Understanding Micronutrient and Essential Nutrient Categories</h2>
        <div className={styles.imageContainer}>
          <img
            src={micronutrientEssential}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          In Part 1 of our five-part micronutrient article series, we discuss
          what micronutrients are and explain the different categories of
          micronutrients and essential nutrients.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Understanding Nutrient Targets</h2>
        <div className={styles.imageContainer}>
          <img
            src={micronutrientSeries}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          In Part 2 of our five-part micronutrient article series, we discuss
          nutrient targets: where they come from, what they mean, and how to
          think about them.
        </p>
      </section>

      <section className={styles.section}>
        <h2>
          Considerations for Micronutrient Tracking: Precision and Difficulty
        </h2>
        <div className={styles.imageContainer}>
          <img
            src={micronutrientTracking}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          In Part 3 of our five-part micronutrient article series, we discuss
          the (im)precision of micronutrient tracking and how to track
          micronutrients.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Which Micronutrients Are Worth Monitoring?</h2>
        <div className={styles.imageContainer}>
          <img
            src={nutrientOverview}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          In Part 4 of our five-part micronutrient article series, we discuss
          which micronutrients you should consider monitoring.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Micronutrients Are Important, But They Aren’t Everything</h2>
        <div className={styles.imageContainer}>
          <img
            src={nutritionFundamentals}
            alt="Nutrition Fundamentals"
            className={styles.image}
          />
        </div>

        <p>
          In the last installment of our five-part micronutrient article series,
          we discuss the limits of micronutrient tracking for the purpose of
          planning a healthy diet.
        </p>
      </section>
    </div>
  );
}

export default InDepthArticle;
