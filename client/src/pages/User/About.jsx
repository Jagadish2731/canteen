
import { useNavigate } from "react-router-dom";

// ✅ correct - go up 2 folders from pages/User/ to reach src/
import "../../style/UserCSS/about.css";

import {
  FaArrowLeft,
  FaUtensils,
  FaLeaf,
  FaShippingFast,
  FaUsers,
  FaHeart,
  FaStar,
  FaClock,
} from "react-icons/fa";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* HEADER */}
      <div className="about-header">
        <FaArrowLeft className="back-btn" onClick={() => navigate(-1)} />
        <h2>About Us</h2>
        <FaUtensils className="header-icon" />
      </div>

      {/* HERO SECTION */}
      <div className="about-hero">
        <h1>Making Campus Life Tastier Since 2024</h1>
        <p>Fresh food, fast delivery, made with love — just for you.</p>
      </div>

      {/* OUR STORY */}
      <section className="about-section story">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>
            Campus Canteen started with a simple idea — students shouldn't have to choose 
            between eating well and studying hard. We saw long queues, expensive food, and 
            tired faces... and decided to do something about it.
          </p>
          <p>
            In 2024, a group of passionate students and food lovers came together to create 
            a smarter, faster, and more affordable way to eat on campus. Today, we're proud to 
            serve thousands of students every day with fresh, delicious meals delivered in minutes.
          </p>
        </div>
        <div className="story-image">
          <div className="image-placeholder">
            <FaUtensils className="placeholder-icon" />
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="about-section values">
        <h2>Why Students Love Us</h2>
        <div className="values-grid">
          <div className="value-card">
            <FaLeaf className="value-icon" />
            <h3>Fresh & Healthy</h3>
            <p>Made with fresh ingredients daily — no frozen nonsense.</p>
          </div>
          <div className="value-card">
            <FaShippingFast className="value-icon" />
            <h3>Super Fast</h3>
            <p>Your food ready in 10–15 minutes. Perfect for busy schedules.</p>
          </div>
          <div className="value-card">
            <FaHeart className="value-icon" />
            <h3>Affordable Prices</h3>
            <p>Student-friendly rates. Eat well without breaking the bank.</p>
          </div>
          <div className="value-card">
            <FaStar className="value-icon" />
            <h3>Quality First</h3>
            <p>Hygienic kitchen, trained staff, and lots of love in every meal.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="about-section stats">
        <h2>Campus Canteen By the Numbers</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>50,000+</h3>
            <p>Meals Served</p>
          </div>
          <div className="stat-item">
            <h3>4.8 ★</h3>
            <p>Average Rating</p>
          </div>
          <div className="stat-item">
            <h3>15 min</h3>
            <p>Average Delivery</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Student Run</p>
          </div>
        </div>
      </section>

      {/* FINAL MESSAGE */}
      <section className="about-section final">
        <div className="final-content">
          <h2>We're More Than Just Food</h2>
          <p>
            We're your late-night study buddy, your post-exam treat, your quick lunch between classes. 
            We're here to make your campus life a little easier, a little happier, and a lot tastier.
          </p>
          <p className="thank-you">
            Thank you for being part of our journey ❤️
          </p>
        </div>
      </section>

    </div>
  );
}