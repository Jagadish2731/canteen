import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/UserCSS/favorite.css";
import { FaTrash, FaArrowLeft, FaShoppingCart, FaHeart } from "react-icons/fa";
 
export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart]           = useState([]);
  const navigate = useNavigate();
 
  // 📦 Load favorites & cart from localStorage
  useEffect(() => {
    const favData = JSON.parse(localStorage.getItem("favorites"));
    if (favData) setFavorites(favData);
 
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) setCart(cartData);
  }, []);
 
  // 💾 Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
 
  // ❌ Remove item from favorites
  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };
 
  // 🛒 Add to Cart
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };
 
  const cartTotal = cart.reduce((t, i) => t + i.qty, 0);
 
  return (
    <div className="favorite-page">
 
      {/* ── HEADER ── */}
      <div className="fav-header">
        <FaArrowLeft
          className="back-btn"
          onClick={() => navigate("/home")}
          title="Go Back"
        />
        <h2>❤️ Your Favorites</h2>
        <div
          className="fav-cart-icon"
          onClick={() => navigate("/cart")}
          title="Go to Cart"
        >
          <FaShoppingCart />
          {cartTotal > 0 && (
            <span className="cart-count">{cartTotal}</span>
          )}
        </div>
      </div>
 
      {/* ── EMPTY STATE ── */}
      {favorites.length === 0 ? (
        <div className="empty-state">
          <FaHeart className="empty-heart-icon" />
          <h3>No Favorites Yet!</h3>
          <p>Go back and like some food items ❤️</p>
          <button className="browse-btn" onClick={() => navigate("/home")}>
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="fav-grid">
          {favorites.map((item) => (
            <div className="fav-card" key={item.id}>
 
              {/* ── IMAGE ── */}
              <div className="fav-media">
                <img src={item.image} alt={item.name} />
                <div className="fav-chip-row">
                  <span className="fav-chip rating">⭐ {item.rating}</span>
                  <span className="fav-chip time">⏱ {item.time} min</span>
                </div>
              </div>
 
              {/* ✅ DELETE — direct child of fav-card so absolute positioning works */}
              <button
                className="delete"
                onClick={() => removeFavorite(item.id)}
                title="Remove from favorites"
              >
                <FaTrash />
              </button>
 
              {/* ── CARD BODY ── */}
              <div className="fav-body">
                <h4>{item.name}</h4>
 
                <div className="fav-bottom">
                  <span className="fav-price">₹{item.price}</span>
 
                  <button
                    className="add-cart-btn"
                    onClick={() => handleAddToCart(item)}
                    disabled={Boolean(cart.find((i) => i.id === item.id))}
                  >
                    {cart.find((i) => i.id === item.id) ? "ADDED ✓" : "ADD"}
                  </button>
                </div>
              </div>
 
            </div>
          ))}
        </div>
      )}
    </div>
  );
}