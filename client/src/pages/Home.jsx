import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../style/UserCSS/home.css";
import {
  FaTimes,
  FaStar,
  FaClock,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

// ── Image Imports (ensure filenames match EXACTLY in src/assets/) ──
import Biryani from "../assets/biryani.jpg";
import Chai from "../assets/chai.jpg";
import VegBiryani from "../assets/vegbiryanii.jpg";
import MasalaDosa from "../assets/masaladosa.jpg";
import PaneerWrap from "../assets/paneerwrap.png";  // ✅ .png not .jpg
import Vadapav from "../assets/vadapav.jpg";

const items = [
  {
    id: 1,
    name: "Veg Biryani",
    price: 80,
    category: "Lunch",
    rating: 4.5,
    time: 15,
    image: VegBiryani,
    description:
      "Aromatic basmati rice cooked with fresh vegetables and a blend of fragrant spices. Served with a cool and refreshing raita.",
    nutrition: { protein: "8g", carbs: "45g", fats: "12g" },
  },
  {
    id: 2,
    name: "Paneer Wrap",
    price: 60,
    category: "Lunch",
    rating: 4,
    time: 10,
    image: PaneerWrap,
    description:
      "Grilled paneer tikka and fresh veggies wrapped in a soft tortilla with mint chutney. A perfect on-the-go meal.",
    nutrition: { protein: "15g", carbs: "30g", fats: "18g" },
  },
  {
    id: 3,
    name: "Masala Dosa",
    price: 50,
    category: "Breakfast",
    rating: 4.2,
    time: 10,
    image: MasalaDosa,
    description:
      "A crispy, golden-brown rice and lentil crepe filled with a savory spiced potato mash, served with sambar and chutneys.",
    nutrition: { protein: "6g", carbs: "55g", fats: "10g" },
  },
  {
    id: 4,
    name: "Vada Pav",
    price: 30,
    category: "Snacks",
    rating: 3.8,
    time: 5,
    image: Vadapav,
    description:
      "The classic Mumbai street food: a spiced potato fritter sandwiched in a soft bread roll with zesty and spicy chutneys.",
    nutrition: { protein: "5g", carbs: "40g", fats: "15g" },
  },
  {
    id: 5,
    name: "Chai",
    price: 10,
    category: "Snacks",
    rating: 4.8,
    time: 5,
    image: Chai,
    description:
      "A warm, comforting cup of Indian milk tea, brewed with aromatic spices like ginger, cardamom, and cloves.",
    nutrition: { protein: "2g", carbs: "10g", fats: "3g" },
  },
  {
    id: 6,
    name: "Chicken Biryani",
    price: 200,
    category: "Lunch",
    rating: 4.8,
    time: 15,
    image: Biryani,
    description:
      "A royal dish of fragrant basmati rice and tender chicken, slow-cooked in a sealed pot with exotic spices to lock in the flavor.",
    nutrition: { protein: "25g", carbs: "50g", fats: "20g" },
  },
];

const categories = ["All", "Lunch", "Snacks", "Breakfast"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [notifications, setNotifications]       = useState(3);
  const [favorites, setFavorites]               = useState([]);
  const [search, setSearch]                     = useState("");
  const [cart, setCart]                         = useState([]);
  const [selectedItem, setSelectedItem]         = useState(null);

  const gridRef  = useRef(null);
  const location = useLocation();

  // ── Scroll to grid when navigated here via Browse Menu from another page ──
  useEffect(() => {
    if (location.state?.scrollToMenu) {
      setTimeout(() => {
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.state]);

  // ── Scroll to grid when already on Home (Browse Menu click) ──
  const handleBrowseMenu = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── Cart helpers ──────────────────────────────────────────────
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      return exist
        ? prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...item, qty: 1 }];
    });
  };

  const handleIncrease = (item) => {
    setCart((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const handleDecrease = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (!exist) return prev;
      if (exist.qty === 1) return prev.filter((i) => i.id !== item.id);
      return prev.map((i) =>
        i.id === item.id ? { ...i, qty: i.qty - 1 } : i
      );
    });
  };

  // ── Favourites helper ─────────────────────────────────────────
  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const updated = prev.find((f) => f.id === item.id)
        ? prev.filter((f) => f.id !== item.id)
        : [...prev, item];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  // ── Persist / hydrate ─────────────────────────────────────────
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ── Derived state ─────────────────────────────────────────────
  const filteredItems = items
    .filter(
      (item) => selectedCategory === "All" || item.category === selectedCategory
    )
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="home">
      {/* ── NAVBAR ── */}
      <Navbar
        cart={cart}
        favorites={favorites}
        notifications={notifications}
        onClearNotifications={() => setNotifications(0)}
        search={search}
        onSearchChange={setSearch}
        onBrowseMenu={handleBrowseMenu}
      />

      {/* ── CATEGORIES ── */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── GRID ── */}
      <div className="grid" ref={gridRef}>
        {filteredItems.map((item) => {
          const cartItem   = cart.find((i) => i.id === item.id);
          const isFavorite = favorites.find((f) => f.id === item.id);
          return (
            <div
              className="card"
              key={item.id}
              onClick={() => setSelectedItem(item)}
            >
              <div className="card-media">
                {item.rating >= 4.5 && <span className="popular-badge">Popular</span>}
                <button
                  className={`fav-btn ${isFavorite ? "active" : ""}`}
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}
                >
                  <FaHeart style={{ color: isFavorite ? "#ff4d4d" : "#aaa" }} />
                </button>
                <img src={item.image} alt={item.name} />
                <div className="card-image-overlay">
                  <span className="chip rating-chip"><FaStar /> {item.rating}</span>
                  <span className="chip time-chip"><FaClock /> {item.time} min</span>
                </div>
              </div>
              <div className="card-body">
                <h4>{item.name}</h4>
                <div className="card-bottom">
                  <span>₹{item.price}</span>
                  {cartItem ? (
                    <div
                      className="qty-controls"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="qty-btn" onClick={() => handleDecrease(item)}>−</button>
                      <span className="qty-count">{cartItem.qty}</span>
                      <button className="qty-btn" onClick={() => handleIncrease(item)}>+</button>
                    </div>
                  ) : (
                    <button
                      className="add-btn"
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                    >
                      ADD
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── MODAL ── */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>
              <FaTimes />
            </button>
            <div className="modal-image">
              <img src={selectedItem.image} alt={selectedItem.name} />
            </div>
            <div className="modal-details">
              <h2>{selectedItem.name}</h2>
              <div className="modal-meta">
                <span className="modal-rating"><FaStar /> {selectedItem.rating}</span>
                <span className="modal-time"><FaClock /> {selectedItem.time} min</span>
              </div>
              <p className="modal-description">{selectedItem.description}</p>

              <div className="modal-nutrition">
                <h4>Nutrition Info (per serving)</h4>
                <div className="nutrition-grid">
                  <div className="nutrition-item protein">
                    <span className="nutrition-value">{selectedItem.nutrition?.protein}</span>
                    <span className="nutrition-label">Protein</span>
                  </div>
                  <div className="nutrition-item carbs">
                    <span className="nutrition-value">{selectedItem.nutrition?.carbs}</span>
                    <span className="nutrition-label">Carbs</span>
                  </div>
                  <div className="nutrition-item fats">
                    <span className="nutrition-value">{selectedItem.nutrition?.fats}</span>
                    <span className="nutrition-label">Fats</span>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <span className="modal-price">₹{selectedItem.price}</span>
                {cart.find((i) => i.id === selectedItem.id) ? (
                  <div className="qty-controls modal-qty">
                    <button className="qty-btn" onClick={() => handleDecrease(selectedItem)}>−</button>
                    <span className="qty-count">
                      {cart.find((i) => i.id === selectedItem.id)?.qty}
                    </span>
                    <button className="qty-btn" onClick={() => handleIncrease(selectedItem)}>+</button>
                  </div>
                ) : (
                  <button
                    className="add-btn modal-add-btn"
                    onClick={() => handleAddToCart(selectedItem)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
