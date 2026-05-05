import React from "react";
import { FiStar, FiHeart, FiMessageSquare, FiThumbsUp, FiUser, FiCalendar } from "react-icons/fi";
import "../../style/AdminCSS/review.css";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://via.placeholder.com/50",
      rating: 4,
      date: "2 days ago",
      content: "Great food and excellent service! The canteen has improved a lot.",
      image: "https://via.placeholder.com/300x200",
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/50",
      rating: 5,
      date: "1 week ago",
      content: "Amazing variety of dishes. Highly recommend the pasta!",
      image: "https://via.placeholder.com/300x200",
      likes: 8,
      comments: 1
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "https://via.placeholder.com/50",
      rating: 3,
      date: "3 days ago",
      content: "Good food but service could be faster.",
      image: null,
      likes: 5,
      comments: 2
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`star-icon ${i < rating ? 'filled' : 'empty'}`}
      />
    ));
  };

  return (
    <div className="reviews">
      <div className="reviews-header">
        <FiMessageSquare className="header-icon" />
        <h1>Customer Reviews</h1>
        <p>See what our customers are saying</p>
      </div>

      <div className="reviews-stats">
        <div className="stat-item">
          <FiStar className="stat-icon" />
          <div>
            <h3>4.2</h3>
            <p>Average Rating</p>
          </div>
        </div>
        <div className="stat-item">
          <FiThumbsUp className="stat-icon" />
          <div>
            <h3>156</h3>
            <p>Total Reviews</p>
          </div>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <img
                className="review-avatar"
                src={review.avatar}
                alt={`${review.name} Avatar`}
              />
              <div className="review-user-info">
                <h4>{review.name}</h4>
                <div className="review-meta">
                  <FiCalendar className="meta-icon" />
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
            <div className="review-stars">
              {renderStars(review.rating)}
            </div>
            <div className="review-content">
              {review.content}
            </div>
            {review.image && (
              <img
                className="review-image"
                src={review.image}
                alt="Review Image"
              />
            )}
            <div className="review-actions">
              <button className="review-action-btn">
                <FiHeart className="action-icon" />
                <span>{review.likes}</span>
              </button>
              <button className="review-action-btn">
                <FiMessageSquare className="action-icon" />
                <span>{review.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;