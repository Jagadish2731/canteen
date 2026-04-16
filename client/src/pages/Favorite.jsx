import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/favorite.css";
import { FaTrash, FaArrowLeft, FaShoppingCart, FaHeart } from "react-icons/fa";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
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
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  return (
    <div className="favorite-page">

      {/* ✅ HEADER with back button */}
      <div className="fav-header">
        <FaArrowLeft
          className="back-btn"
          onClick={() => navigate("/")}
          title="Go Back"
        />
        <h2>❤️ Your Favorites</h2>
        <div
          className="fav-cart-icon"
          onClick={() => navigate("/cart")}
          title="Go to Cart"
        >
          <FaShoppingCart />
          {cart.reduce((t, i) => t + i.qty, 0) > 0 && (
            <span className="cart-count">
              {cart.reduce((t, i) => t + i.qty, 0)}
            </span>
          )}
        </div>
      </div>

      {/* ✅ EMPTY STATE */}
      {favorites.length === 0 ? (
        <div className="empty-state">
          <FaHeart className="empty-heart-icon" />
          <h3>No Favorites Yet!</h3>
          <p>Go back and like some food items ❤️</p>
          <button className="browse-btn" onClick={() => navigate("/")}>
            Browse Menu
          </button>
        </div>
      ) : (
        // ✅ FAVORITES GRID
        <div className="fav-grid">
          {favorites.map((item) => (
            <div className="fav-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="fav-body">
                <h4>{item.name}</h4>
                <p className="fav-details">
                  ⭐ {item.rating} • ⏱ {item.time} min
                </p>

                <div className="fav-bottom">
                  <span className="fav-price">₹{item.price}</span>

                  {/* 🛒 ADD TO CART BUTTON */}
                  <button
                    className="add-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    {cart.find((i) => i.id === item.id) ? "ADDED ✓" : "ADD"}
                  </button>
                </div>

                {/* ❌ DELETE BUTTON */}
                <FaTrash
                  className="delete"
                  onClick={() => removeFavorite(item.id)}
                  title="Remove from favorites"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}