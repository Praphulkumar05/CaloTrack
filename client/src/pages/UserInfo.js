import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./UserInfo.module.css";

// Import profile images
import maleAvatar from "../assets/male.jpg";
import femaleAvatar from "../assets/Female.jpg";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [streak, setStreak] = useState(0);
  const [badge, setBadge] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
   const [activeSection, setActiveSection] = useState("profile"); // default section

  const [streakData, setStreakData] = useState({
    totalDays: 0,
    maxStreak: 0,
    days: []
  });

  // Generate streak grid based on login history
  useEffect(() => {
    const today = new Date();
    const monthName = today.toLocaleString("default", { month: "long" });
    setCurrentMonth(monthName);

    let loginHistory = JSON.parse(localStorage.getItem("loginHistory")) || [];
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    const monthGrid = Array.from({ length: daysInMonth }, (_, i) => {
      const dayDate = new Date(today.getFullYear(), today.getMonth(), i + 1).toDateString();
      return loginHistory.includes(dayDate);
    });

    const totalActive = monthGrid.filter(Boolean).length;
    const maxStreakCalc = (() => {
      let max = 0, current = 0;
      monthGrid.forEach(active => {
        if (active) {
          current++;
          max = Math.max(max, current);
        } else {
          current = 0;
        }
      });
      return max;
    })();

    setStreakData({
      totalDays: totalActive,
      maxStreak: maxStreakCalc,
      days: monthGrid
    });
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setUser(storedUser);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const lastLoginDate = localStorage.getItem("lastLoginDate");
    const today = new Date().toDateString();
    let currentStreak = parseInt(localStorage.getItem("streakCount")) || 0;

    if (lastLoginDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastLoginDate === yesterday.toDateString()) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }
    }

    localStorage.setItem("lastLoginDate", today);
    localStorage.setItem("streakCount", currentStreak);

    let history = JSON.parse(localStorage.getItem("loginHistory")) || [];
    if (!history.includes(today)) {
      history.push(today);
    }
    localStorage.setItem("loginHistory", JSON.stringify(history));

    setStreak(currentStreak);

    if (currentStreak >= 30) setBadge("🏆 Congratulations! 1 Month Streak!");
    else if (currentStreak >= 20) setBadge("🌟 20-Day Streak Badge!");
    else if (currentStreak >= 10) setBadge("🔥 10-Day Streak Badge!");
    else if (currentStreak >= 5) setBadge("⭐ 5-Day Streak Badge!");
    else setBadge("");
  }, []);

  // const genderColors = {
  //   Male: "#00bcd4",
  //   Female: "#ff4081",
  //   Other: "#b0bec5"
  // };

  const getProfileImage = (gender) => {
    if (gender === "Male") return maleAvatar;
    if (gender === "Female") return femaleAvatar;
    return null;
  };

  return (
  <div className={styles.container}>
    <Navbar />

    {/* Greeting */}
    {user && <h2 className={styles.greeting}>{greeting}, {user.name}! 👋</h2>}

    <div className={styles.layout}>
      {/* Sidebar */}
    <aside className={styles.sidebar}>
        <button
          className={activeSection === "profile" ? styles.active : ""}
          onClick={() => setActiveSection("profile")}
        >
          Profile Info
        </button>
        <button
          className={activeSection === "dashboard" ? styles.active : ""}
          onClick={() => setActiveSection("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={activeSection === "about" ? styles.active : ""}
          onClick={() => setActiveSection("about")}
        >
          About
        </button>
      </aside>

      {/* Content Area */}
<main className={`${styles.content} ${styles.fade}`}>
  {activeSection === "profile" && (
    <div key="profile">
      {/* <h2>Profile Info</h2>
      <p>Show user information here.</p> */}
    </div>
  )}
  {activeSection === "dashboard" && (
    <div key="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard! Here you can track your health activities, view progress charts, and check your daily goals.</p>
    </div>
  )}
  {activeSection === "about" && (
    <div key="about">
      <h2>About</h2>
      <p>This application helps you monitor your health and fitness journey. Stay consistent, earn streak badges, and reach your goals faster!</p>
    </div>
  )}
</main>


      {/* Main Content */}
      <main className={styles.main}>
        {/* Profile Section */}
        <section className={styles.profileSection}>
          <div className={styles.profileHeader}>
            {getProfileImage(user?.gender) && (
              <img
                src={getProfileImage(user.gender)}
                alt="Profile"
                className={styles.avatar}
              />
            )}
            <div>
              <h2>{user ? user.name : "Guest User"}</h2>
              <p className={styles.subtitle}>
                {user ? "Health & Fitness Enthusiast" : ""}
              </p>
              <span className={styles.badgeActive}>Active User</span>
              <span className={styles.badgeVerified}>Verified</span>
            </div>
          </div>

          <div className={styles.stats}>
            <div>
              <h3>{streak}</h3>
              <p>Current Streak</p>
            </div>
            <div>
              <h3>{streakData.totalDays}</h3>
              <p>Total Active Days</p>
            </div>
            <div>
              <h3>{streakData.maxStreak}</h3>
              <p>Max Streak</p>
            </div>
          </div>
        </section>

        {/* Personal Info */}
        <section className={styles.infoSection}>
          <div className={styles.infoHeader}>
            <h3>Personal Information</h3>
            <button className={styles.editBtn}>Edit Profile</button>
          </div>

          {user ? (
            <div className={styles.infoGrid}>
              <div><strong>Full Name:</strong> {user.name}</div>
              <div><strong>Age:</strong> {user.age}</div>
              <div><strong>Email Address:</strong> {user.email}</div>
              <div><strong>Gender:</strong> {user.gender}</div>
              <div><strong>Phone Number:</strong> {user.phone}</div>
              <div className={styles.accountVerified}>
                <span>✔ Account Verified</span>
                <p>Your account has been verified and secured</p>
              </div>
            </div>
          ) : (
            <p>No user info found. Please log in.</p>
          )}
        </section>

        {/* Streak Activity Grid */}
        <section className={styles.streakSection}>
          <h3>🔥 Activity Streak - {currentMonth}</h3>
          {badge && <p className={styles.badge}>{badge}</p>}
          <div className={styles.streakGrid}>
            {streakData.days.map((active, index) => (
              <div
                key={index}
                className={`${styles.streakDay} ${active ? styles.activeDay : ""}`}
              ></div>
            ))}
          </div>
        </section>
      </main>
    </div>
  </div>
);

};

export default UserInfo;
