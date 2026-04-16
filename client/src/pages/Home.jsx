import { useState, useEffect } from "react";
import "../style/home.css";
import {
  FaHome,
  FaList,
  FaShoppingBag,
  FaUser,
  FaInfoCircle,
  FaPhone,
  FaFileAlt,
  FaQuestionCircle,
  FaUserCircle,
  FaShoppingCart,
  FaBell,
  FaHeart,
  FaTimes,
  FaStar,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(3);
  const [favorites, setFavorites] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ["All", "Lunch", "Snacks", "Breakfast"];

  // ✅ UPDATED: Added a 'nutrition' object to each item
  const items = [
    {
      id: 1,
      name: "Veg Biryani",
      price: 80,
      category: "Lunch",
      rating: 4.5,
      time: 15,
      image: "https://tse2.mm.bing.net/th/id/OIP.Vjw4yJSpw3yeD_2RhCLZpgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "Aromatic basmati rice cooked with fresh vegetables and a blend of fragrant spices. Served with a cool and refreshing raita.",
      nutrition: { protein: "8g", carbs: "45g", fats: "12g" }
    },
    {
      id: 2,
      name: "Paneer Wrap",
      price: 60,
      category: "Lunch",
      rating: 4,
      time: 10,
      image: "https://images.herzindagi.info/image/2019/Nov/how-to-make-paneer-wrap-recipe-two.jpg",
      description: "Grilled paneer tikka and fresh veggies wrapped in a soft tortilla with mint chutney. A perfect on-the-go meal.",
      nutrition: { protein: "15g", carbs: "30g", fats: "18g" }
    },
    {
      id: 3,
      name: "Masala Dosa",
      price: 50,
      category: "Breakfast",
      rating: 4.2,
      time: 10,
      image: "https://png.pngtree.com/png-vector/20250416/ourmid/pngtree-masala-dosa-with-chutneys-appealing-south-indian-breakfast-png-image_16032369.png",
      description: "A crispy, golden-brown rice and lentil crepe filled with a savory spiced potato mash, served with sambar and chutneys.",
      nutrition: { protein: "6g", carbs: "55g", fats: "10g" }
    },
    {
      id: 4,
      name: "Vada Pav",
      price: 30,
      category: "Snacks",
      rating: 3.8,
      time: 5,
      image: "https://wallpapercave.com/wp/wp8981219.jpg",
      description: "The classic Mumbai street food: a spiced potato fritter sandwiched in a soft bread roll with zesty and spicy chutneys.",
      nutrition: { protein: "5g", carbs: "40g", fats: "15g" }
    },
    {
      id: 5,
      name: "Chai",
      price: 10,
      category: "Snacks",
      rating: 4.8,
      time: 5,
      image: "https://static.vecteezy.com/system/resources/thumbnails/030/708/178/small_2x/of-a-spiced-chai-tea-isolated-on-flat-black-background-generative-ai-photo.jpg",
      description: "A warm, comforting cup of Indian milk tea, brewed with aromatic spices like ginger, cardamom, and cloves.",
      nutrition: { protein: "2g", carbs: "10g", fats: "3g" }
    },
    {
      id: 6,
      name: "Chicken Biryani",
      price: 200,
      category: "Lunch",
      rating: 4.8,
      time: 15,
      image: "https://tse4.mm.bing.net/th/id/OIP.rMUygBjiFdzGMpwfbU89uQHaE8?rs=1&pid=ImgDetMain",
      description: "A royal dish of fragrant basmati rice and tender chicken, slow-cooked in a sealed pot with exotic spices to lock in the flavor.",
      nutrition: { protein: "25g", carbs: "50g", fats: "20g" }
    },
  ];

  // --- (Cart and Favorite functions remain the same) ---
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const handleIncrease = (item) => {
    setCart((prev) => prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i)));
  };

  const handleDecrease = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (!exist) return prev;
      if (exist.qty === 1) {
        return prev.filter((i) => i.id !== item.id);
      }
      return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty - 1 } : i));
    });
  };

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const isFav = prev.find((f) => f.id === item.id);
      let updated;
      if (isFav) {
        updated = prev.filter((f) => f.id !== item.id);
      } else {
        updated = [...prev, item];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const favData = JSON.parse(localStorage.getItem("favorites")) || [];
    setCart(cartData);
    setFavorites(favData);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filteredItems = items
    .filter((item) => (selectedCategory === "All" ? true : item.category === selectedCategory))
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="home">
      {/* --- (Sidebar and Header JSX remain the same) --- */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <div className="profile-icon"><FaUserCircle /></div>
          <div><h4>Login / Sign Up</h4><p>Access your account</p></div>
        </div>
        <ul className="menu">
          <li className="active" onClick={() => navigate("/")}><span><FaHome /> Home</span><span>›</span></li>
          <li onClick={() => navigate("/")}><span><FaList /> Browse Menu</span><span>›</span></li>
          <li onClick={() => navigate("/orders")}><span><FaShoppingBag /> My Orders</span><span>›</span></li>
          <li onClick={() => navigate("/profile")}><span><FaUser /> Profile</span><span>›</span></li>
        </ul>
        <div className="info-section">
          <p>INFORMATION</p>
          <li onClick={() => { navigate("/about"); setMenuOpen(false); }}><span><FaInfoCircle /> About Us</span><span>›</span></li>
         <li onClick={() => { navigate("/contact"); setMenuOpen(false); }}>
            <span><FaPhone /> Contact Us</span><span>›</span>
          </li>
       <li onClick={() => { navigate("/terms"); setMenuOpen(false); }}>
           <span><FaFileAlt /> Terms & Conditions</span>
          <span>›</span>
       </li>
          <li onClick={() => { navigate("/help"); setMenuOpen(false); }}>
            <span><FaQuestionCircle /> Help & Support</span><span>›</span>
          </li>
        </div>
      </div>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
      <div className="header">
        <span className="icon" onClick={() => setMenuOpen(!menuOpen)}>☰</span>
        <h2>Campus Canteen</h2>
        <div className="header-icons">
          <div className="search-container">
            <IoSearch className="search-icon" onClick={() => setShowSearch(!showSearch)} />
            <input type="text" placeholder="Search food..." className={`search-input ${showSearch ? "active" : ""}`} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="icon badge fav-icon" onClick={() => navigate("/favorites")} title="Favorites">
            <FaHeart style={{ color: favorites.length > 0 ? "#ff4d4d" : "white" }} />
            {favorites.length > 0 && <span>{favorites.length}</span>}
          </div>
          <div className="icon badge notification-icon" onClick={() => setNotifications(0)} title="Notifications">
            <FaBell />
            {notifications > 0 && <span>{notifications}</span>}
          </div>
          <div className="icon badge cart-icon" onClick={() => navigate("/cart")} title="My Cart">
            <FaShoppingCart />
            {cart.reduce((t, i) => t + i.qty, 0) > 0 && <span>{cart.reduce((t, i) => t + i.qty, 0)}</span>}
          </div>
          <div className="icon badge order-icon" onClick={() => navigate("/orders")} title="My Orders">
            <FaShoppingBag />
          </div>
          <FaUserCircle className="icon profile-icon-header" onClick={() => navigate("/profile")} title="Profile" />
        </div>
      </div>

      <div className="categories">
        {categories.map((cat) => <button key={cat} className={selectedCategory === cat ? "active" : ""} onClick={() => setSelectedCategory(cat)}>{cat}</button>)}
      </div>

      <div className="grid">
        {filteredItems.map((item) => {
          const cartItem = cart.find((i) => i.id === item.id);
          const isFavorite = favorites.find((f) => f.id === item.id);
          return (
            <div className="card" key={item.id} onClick={() => setSelectedItem(item)}>
              <div className="fav-btn" onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}>
                <FaHeart style={{ color: isFavorite ? '#ff4d4d' : '#555' }} />
              </div>
              <img src={item.image} alt={item.name} />
              <div className="card-body">
                <h4>{item.name}</h4>
                <p><FaStar /> {item.rating} • <FaClock /> {item.time} min</p>
                <div className="card-bottom">
                  <span>₹{item.price}</span>
                  {cartItem ? (
                    <div className="qty-controls" onClick={(e) => e.stopPropagation()}>
                      <button className="qty-btn" onClick={() => handleDecrease(item)}>−</button>
                      <span className="qty-count">{cartItem.qty}</span>
                      <button className="qty-btn" onClick={() => handleIncrease(item)}>+</button>
                    </div>
                  ) : (
                    <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}>ADD</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
                <span><FaStar /> {selectedItem.rating}</span>
                <span><FaClock /> {selectedItem.time} min</span>
              </div>
              <p className="modal-description">{selectedItem.description}</p>
              
              {/* ✅ NEW: NUTRITION SECTION */}
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
                    <span className="qty-count">{cart.find((i) => i.id === selectedItem.id)?.qty}</span>
                    <button className="qty-btn" onClick={() => handleIncrease(selectedItem)}>+</button>
                  </div>
                ) : (
                  <button className="add-btn modal-add-btn" onClick={() => handleAddToCart(selectedItem)}>
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