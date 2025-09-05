    import React from 'react';
    import styles from './CaseStudy.module.css';
import markImg from '../assets/images/casestudy/mark.png';
import ayeshaImg from '../assets/images/casestudy/ayesha.png';
import davidImg from '../assets/images/casestudy/david.png';
import meeraImg from '../assets/images/casestudy/meera.png';
import arjunImg from '../assets/images/casestudy/arjun.png';
import priyasamirImg from '../assets/images/casestudy/priyasamir.png';
import anikaImg from '../assets/images/casestudy/anika.png';
import rajImg from '../assets/images/casestudy/raj.png';


    function CaseStudy() {
   const studies = [
  {
    title: "From Sedentary to Strong: Mark's Fitness Comeback",
    date: "June 10, 2025",
    description:
      "After years at a desk job and unhealthy eating, Mark decided to track his calories and train 3 times a week...",
    imageAlt: "Mark before and after transformation",
    image: markImg,
  },
  {
    title: "Running into Wellness: Ayesha’s Story",
    date: "May 18, 2025",
    description:
      "Ayesha, a software engineer, used macro tracking to fuel her marathon training...",
    imageAlt: "Ayesha marathon training",
    image: ayeshaImg,
  },
  {
    title: "Fitness Over 50: David’s Strength Journey",
    date: "April 2, 2025",
    description:
      "At 54, David started tracking his protein intake and walking 10,000 steps daily...",
    imageAlt: "David smiling post-gym",
    image: davidImg,
  },
  {
    title: "Postpartum Power: Meera’s Rebuild",
    date: "March 15, 2025",
    description:
      "Meera began tracking her nutrients after childbirth. Through mindful eating and postpartum yoga...",
    imageAlt: "Meera holding her baby and flexing",
    image: meeraImg,
  },
  {
    title: "Student Shred: Arjun’s Campus Transformation",
    date: "February 1, 2025",
    description:
      "Juggling classes and part-time work, Arjun used macro planning apps to simplify meals...",
    imageAlt: "Arjun at college gym",
    image: arjunImg,
  },
  {
    title: "Couple Goals: Priya and Samir’s Joint Fitness Journey",
    date: "January 21, 2025",
    description:
      "Priya and Samir turned evening walks into HIIT sessions and meal-prepped together...",
    imageAlt: "Priya and Samir working out together",
    image: priyasamirImg,
  },
  {
    title: "Techie to Toned: Anika’s Desk Detox",
    date: "December 10, 2024",
    description:
      "Working in IT, Anika used calorie tracking and stretch breaks every 30 minutes to beat fatigue...",
    imageAlt: "Anika at standing desk smiling",
    image: anikaImg,
  },
  {
    title: "Military Discipline: Raj’s Ultra Marathon Prep",
    date: "November 25, 2024",
    description:
      "Raj, a military officer, tracked his macros precisely for endurance training...",
    imageAlt: "Raj crossing finish line",
    image: rajImg,
  },
];

    return (
        <div className={styles.container}>
        <h1 className={styles.heading}>📊 Real Fitness Transformations</h1>
        <p className={styles.subheading}>
            Explore how real people used calorie tracking, consistent workouts, and mindfulness to reshape their lives.
        </p>
        <div className={styles.cardWrapper}>
            {studies.map((study, index) => (
            <div key={index} className={styles.card}>
                {/* Placeholder for Image */}
            <div className={styles.imagePlaceholder}>
  <img src={study.image} alt={study.imageAlt} className={styles.studyImg} />
</div>

                <div className={styles.textContent}>
                <h2 className={styles.title}>{study.title}</h2>
                <p className={styles.date}>{study.date}</p>
                <p className={styles.description}>{study.description}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    }

    export default CaseStudy;
