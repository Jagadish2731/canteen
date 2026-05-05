import { useState, useRef, useEffect } from "react";
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
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { IoSearch, IoClose } from "react-icons/io5";
import "../style/UserCSS/Navbar.css";

export default function Navbar({
  cart = [],
  favorites = [],
  notifications = 0,
  onClearNotifications,
  search = "",
  onSearchChange,
  onBrowseMenu,
}) {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();
  const searchRef = useRef(null);
  const inputRef  = useRef(null);

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const cartTotal = cart.reduce((t, i) => t + i.qty, 0);
  const closeMenu = () => setMenuOpen(false);

  // ── Close search when clicking outside ──────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
        onSearchChange("");
      }
    };
    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  // ── Auto-focus input when search opens ──────────────────────
  useEffect(() => {
    if (showSearch) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [showSearch]);

  const handleSearchToggle = () => {
    if (showSearch) {
      setShowSearch(false);
      onSearchChange("");
    } else {
      setShowSearch(true);
    }
  };

  const handleHome = () => {
    closeMenu();
    navigate("/home");
  };

  const handleBrowseMenu = () => {
    closeMenu();
    if (location.pathname !== "/") {
      navigate("/home", { state: { scrollToMenu: true } });
    } else {
      onBrowseMenu?.();
    }
  };

  return (
    <>
      {/* ── SIDEBAR ── */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button
          type="button"
          className="user-sidebar-close-btn"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <IoClose />
        </button>

        {/* TOP — profile */}
        <div className="sidebar-top">
          <div className="sidebar-profile-icon">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="sidebar-profile-img" />
            ) : user?.name ? (
              <div className="sidebar-profile-initial">
                {user.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <FaUserCircle />
            )}
          </div>
          <div>
            <h4>{user?.name || "Guest User"}</h4>
            <p>{user?.email || "Not logged in"}</p>
          </div>
        </div>

        {/* MENU links */}
        <ul className="menu">
          <li className={location.pathname === "/home" ? "active" : ""} onClick={handleHome}>
            <span><FaHome /> Home</span>
            <span>›</span>
          </li>
          <li onClick={handleBrowseMenu}>
            <span><FaList /> Browse Menu</span>
            <span>›</span>
          </li>
          <li onClick={() => { navigate("/orders");  closeMenu(); }}>
            <span><FaShoppingBag /> My Orders</span>
            <span>›</span>
          </li>
          <li onClick={() => { navigate("/profile"); closeMenu(); }}>
            <span><FaUser /> Profile</span>
            <span>›</span>
          </li>
        </ul>

        {/* INFORMATION section */}
        <div className="sidebar-info">
          <p className="sidebar-section-label">INFORMATION</p>
          <ul>
            <li onClick={() => { navigate("/about");   closeMenu(); }}>
              <span><FaInfoCircle /> About Us</span><span>›</span>
            </li>
            <li onClick={() => { navigate("/contact"); closeMenu(); }}>
              <span><FaPhone /> Contact Us</span><span>›</span>
            </li>
            <li onClick={() => { navigate("/terms");   closeMenu(); }}>
              <span><FaFileAlt /> Terms & Conditions</span><span>›</span>
            </li>
            <li onClick={() => { navigate("/help");    closeMenu(); }}>
              <span><FaQuestionCircle /> Help & Support</span><span>›</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── OVERLAY — closes sidebar on outside click ── */}
      {menuOpen && <div className="overlay" onClick={closeMenu} />}

      {/* ── HEADER ── */}
      <div className="header">
        <span className="icon" onClick={() => setMenuOpen((v) => !v)}>☰</span>
        <h2>Campus Canteen</h2>

        <div className="header-icons">

          {/* ── Search ── */}
          <div className={`search-container ${showSearch ? "expanded" : ""}`} ref={searchRef}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search food..."
              className={`search-input ${showSearch ? "active" : ""}`}
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button className="search-icon-btn" onClick={handleSearchToggle}>
              {showSearch ? <IoClose /> : <IoSearch />}
            </button>
          </div>

          {/* Favourites */}
          <div className="header-icon-btn fav-icon" onClick={() => navigate("/favorites")} title="Favorites">
            <FaHeart style={{ color: favorites.length > 0 ? "#ff4d4d" : "white" }} />
            {favorites.length > 0 && <span>{favorites.length}</span>}
          </div>

          {/* Notifications */}
          <div className="header-icon-btn notification-icon" onClick={() => navigate("/notifications")} title="Notifications">
            <FaBell />
            {notifications > 0 && <span>{notifications}</span>}
          </div>

          {/* Cart */}
          <div className="header-icon-btn cart-icon" onClick={() => navigate("/cart")} title="My Cart">
            <FaShoppingCart />
            {cartTotal > 0 && <span>{cartTotal}</span>}
          </div>

          {/* Profile */}
          <div className="header-icon-btn" onClick={() => navigate("/profile")} title="Profile">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="header-profile-img" />
            ) : (
              <FaUserCircle style={{ fontSize: "26px" }} />
            )}
          </div>

        </div>
      </div>
    </>
  );
}
