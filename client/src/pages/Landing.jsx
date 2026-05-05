import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiZap } from "react-icons/fi";
import { GiKnifeFork, GiLeafSwirl } from "react-icons/gi";
import "../style/UserCSS/landing.css";

export default function Landing() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => navigate("/login"), 2500);
  };

  // ── Loading Screen ──
  if (loading) {
    return (
      <div className="cc-loader">
        <div className="cc-icon-ring">
          <GiKnifeFork className="cc-fork-icon" />
        </div>
        <h1 className="cc-title">Campus Canteen</h1>
        <p className="cc-sub">Preparing your experience...</p>
        <div className="cc-dots">
          <span /><span /><span />
        </div>
      </div>
    );
  }

  return (
    <div className="lp-root">
      <section className="lp-hero">
        <div className="lp-logo-ring">
          <GiKnifeFork className="lp-logo-icon" />
        </div>
        <h1 className="lp-title">Campus Canteen</h1>
        <p className="lp-subtitle">
          Delicious Indian cuisine at your fingertips. Order your favorite
          meals and skip the queue!
        </p>
        <button className="lp-btn" onClick={handleStart}>
          Get Started <span className="lp-arrow">›</span>
        </button>
      </section>

      <section className="lp-cards">
        <div className="lp-card">
          <span className="lp-card-icon green"><FiClock /></span>
          <h3>Quick Delivery</h3>
          <p>Get your food in 10-20 minutes</p>
        </div>
        <div className="lp-card">
          <span className="lp-card-icon green"><GiLeafSwirl /></span>
          <h3>Fresh Food</h3>
          <p>Made with fresh ingredients daily</p>
        </div>
        <div className="lp-card">
          <span className="lp-card-icon green"><FiZap /></span>
          <h3>Easy Ordering</h3>
          <p>Simple and fast ordering process</p>
        </div>
      </section>

      <p className="lp-tagline">
        Your favorite campus meals, delivered fresh <span className="lp-heart">❤️</span>
      </p>
    </div>
  );
}