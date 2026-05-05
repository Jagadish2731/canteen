import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/UserCSS/profile.css";
import {
  FaArrowLeft,         // original back arrow — unchanged
  FaUserCircle,        // avatar placeholder
  FaEdit,              // header edit
  FaSignOutAlt,        // logout — unchanged
  FaMobileAlt,         // phone
  FaEnvelope,          // email
  FaMapMarkerAlt,      // address
  FaCameraRetro,       // avatar upload
  FaCheckCircle,       // save
  FaTimesCircle,       // cancel
  FaIdBadge,           // roll number
  FaUniversity,        // department
  FaUserGraduate,      // year
  FaChevronRight,      // quick link arrow
  FaBoxOpen,           // quick links orders
  FaHeart,             // quick links favs
  FaCartPlus,          // quick links cart
} from "react-icons/fa";
 
export default function Profile() {
  const navigate = useNavigate();
 
  const [editMode, setEditMode]   = useState(false);
  const [cart, setCart]           = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders]       = useState([]);
 
  const [profile, setProfile] = useState({
    name:       "",
    email:      "",
    phone:      "+91 ",
    address:    "",
    rollNo:     "",
    department: "",
    year:       "",
    avatar:     null,
  });
 
  const [tempProfile, setTempProfile] = useState({ ...profile });
 
  // ─── LOAD DATA ──────────────────────────────────────────────
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"))    || {};
    const savedProfile = JSON.parse(localStorage.getItem("profile")) || {};
 
    const cartData  = JSON.parse(localStorage.getItem("cart"))      || [];
    const favData   = JSON.parse(localStorage.getItem("favorites")) || [];
    const orderData = JSON.parse(localStorage.getItem("orders"))    || [];
 
    setCart(cartData);
    setFavorites(favData);
    setOrders(orderData);
 
    const merged = {
      name:       loggedInUser.name           || savedProfile.name       || "",
      email:      loggedInUser.email          || savedProfile.email      || "",
      phone:      savedProfile.phone          || "+91 ",
      address:    savedProfile.address        || "",
      rollNo:     savedProfile.rollNo         || "",
      department: savedProfile.department     || "",
      year:       savedProfile.year           || "",
      avatar:     loggedInUser.profilePicture || savedProfile.avatar     || null,
    };
 
    setProfile(merged);
    setTempProfile(merged);
  }, []);
 
  // ─── SAVE ────────────────────────────────────────────────────
  const handleSave = () => {
    setProfile(tempProfile);
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
    localStorage.setItem(
      "user",
      JSON.stringify({ ...loggedInUser, name: tempProfile.name, email: tempProfile.email })
    );
    localStorage.setItem("profile", JSON.stringify(tempProfile));
    setEditMode(false);
  };
 
  // ─── CANCEL ──────────────────────────────────────────────────
  const handleCancel = () => {
    setTempProfile({ ...profile });
    setEditMode(false);
  };
 
  // ─── AVATAR UPLOAD ───────────────────────────────────────────
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setTempProfile((prev) => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(file);
    }
  };
 
  // ─── LOGOUT ──────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
 
  // ─── STATS ───────────────────────────────────────────────────
  const totalOrders    = orders.length;
  const totalSpent     = orders.reduce((t, o) => t + (o.total || 0), 0);
  const totalFavorites = favorites.length;
  const cartItems      = cart.reduce((t, i) => t + (i.qty || 0), 0);
 
  const display = (val) => val?.trim() ? val : "—";
 
  return (
    <div className="profile-page">
 
      {/* ── HEADER ── */}
      <div className="profile-header">
        <FaArrowLeft
          className="profile-back-btn"
          onClick={() => navigate("/home")}
          title="Go Back"
        />
        <h2>My Profile</h2>
        <FaEdit
          className="profile-edit-icon"
          onClick={() => { setTempProfile({ ...profile }); setEditMode(true); }}
          title="Edit Profile"
          style={{ opacity: editMode ? 0 : 1, pointerEvents: editMode ? "none" : "auto" }}
        />
      </div>
 
      <div className="profile-content">
 
        {/* ── AVATAR ── */}
        <div className="avatar-section">
          <div className="avatar-wrapper">
            {(editMode ? tempProfile.avatar : profile.avatar) ? (
              <img
                src={editMode ? tempProfile.avatar : profile.avatar}
                alt="Profile"
                className="avatar-img"
              />
            ) : (
              <FaUserCircle className="avatar-placeholder" />
            )}
 
            {editMode && (
              <label className="camera-btn" title="Change Photo">
                <FaCameraRetro />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  hidden
                />
              </label>
            )}
          </div>
 
          {!editMode && (
            <div className="avatar-info">
              <h3>{display(profile.name)}</h3>
              <p>
                {display(profile.rollNo)}
                {profile.rollNo && profile.department ? " • " : ""}
                {display(profile.department)}
              </p>
              {profile.year && (
                <span className="year-badge">{profile.year}</span>
              )}
            </div>
          )}
        </div>
 
        {/* ── STATS — EMOJI ICONS ── */}
        <div className="stats-row">
          <div className="stat-card" onClick={() => navigate("/orders")}>
            <div className="stat-icon-wrap">
              <span className="stat-emoji">🛍️</span>
            </div>
            <span className="stat-value">{totalOrders}</span>
            <span className="stat-label">Orders</span>
          </div>
 
          <div className="stat-card" onClick={() => navigate("/favorites")}>
            <div className="stat-icon-wrap">
              <span className="stat-emoji">❤️</span>
            </div>
            <span className="stat-value">{totalFavorites}</span>
            <span className="stat-label">Favs</span>
          </div>
 
          <div className="stat-card" onClick={() => navigate("/cart")}>
            <div className="stat-icon-wrap">
              <span className="stat-emoji">🛒</span>
            </div>
            <span className="stat-value">{cartItems}</span>
            <span className="stat-label">Cart</span>
          </div>
 
          <div className="stat-card">
            <div className="stat-icon-wrap">
              <span className="stat-emoji">💰</span>
            </div>
            <span className="stat-value">₹{totalSpent}</span>
            <span className="stat-label">Spent</span>
          </div>
        </div>
 
        {/* ── PROFILE DETAILS / EDIT FORM ── */}
        <div className="profile-card">
          <h3 className="section-title">
            {editMode ? "Edit Profile" : "Personal Information"}
          </h3>
 
          {editMode ? (
            <div className="edit-form">
 
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>
 
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={tempProfile.email}
                  onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
 
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={tempProfile.phone}
                  onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
 
              <div className="form-group">
                <label>Address / Room No.</label>
                <input
                  type="text"
                  value={tempProfile.address}
                  onChange={(e) => setTempProfile({ ...tempProfile, address: e.target.value })}
                  placeholder="Hostel / Room number"
                />
              </div>
 
              <div className="form-group">
                <label>Roll Number</label>
                <input
                  type="text"
                  value={tempProfile.rollNo}
                  onChange={(e) => setTempProfile({ ...tempProfile, rollNo: e.target.value })}
                  placeholder="e.g. 2024CS001"
                />
              </div>
 
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={tempProfile.department}
                  onChange={(e) => setTempProfile({ ...tempProfile, department: e.target.value })}
                  placeholder="e.g. Computer Science"
                />
              </div>
 
              <div className="form-group">
                <label>Year</label>
                <select
                  value={tempProfile.year}
                  onChange={(e) => setTempProfile({ ...tempProfile, year: e.target.value })}
                >
                  <option value="">Select Year</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
 
              <div className="edit-btns">
                <button className="save-btn" onClick={handleSave}>
                  <FaCheckCircle /> Save Changes
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  <FaTimesCircle /> Cancel
                </button>
              </div>
 
            </div>
          ) : (
            <div className="profile-details">
 
              <div className="detail-row">
                <FaEnvelope className="detail-icon" />
                <div>
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{display(profile.email)}</span>
                </div>
              </div>
 
              <div className="detail-row">
                <FaMobileAlt className="detail-icon" />
                <div>
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{display(profile.phone)}</span>
                </div>
              </div>
 
              <div className="detail-row">
                <FaMapMarkerAlt className="detail-icon" />
                <div>
                  <span className="detail-label">Address</span>
                  <span className="detail-value">{display(profile.address)}</span>
                </div>
              </div>
 
              <div className="detail-row">
                <FaIdBadge className="detail-icon" />
                <div>
                  <span className="detail-label">Roll Number</span>
                  <span className="detail-value">{display(profile.rollNo)}</span>
                </div>
              </div>
 
              <div className="detail-row">
                <FaUniversity className="detail-icon" />
                <div>
                  <span className="detail-label">Department</span>
                  <span className="detail-value">{display(profile.department)}</span>
                </div>
              </div>
 
              <div className="detail-row">
                <FaUserGraduate className="detail-icon" />
                <div>
                  <span className="detail-label">Year</span>
                  <span className="detail-value">{display(profile.year)}</span>
                </div>
              </div>
 
            </div>
          )}
        </div>
 
        {/* ── QUICK LINKS ── */}
        {!editMode && (
          <div className="quick-links">
            <h3 className="section-title">Quick Links</h3>
 
            <div className="quick-link-item" onClick={() => navigate("/orders")}>
              <div className="quick-link-left">
                <div className="quick-icon orders">
                  <FaBoxOpen />
                </div>
                <span>My Orders</span>
              </div>
              <FaChevronRight className="quick-arrow" />
            </div>
 
            <div className="quick-link-item" onClick={() => navigate("/favorites")}>
              <div className="quick-link-left">
                <div className="quick-icon favs">
                  <FaHeart />
                </div>
                <span>My Favorites</span>
              </div>
              <FaChevronRight className="quick-arrow" />
            </div>
 
            <div className="quick-link-item" onClick={() => navigate("/cart")}>
              <div className="quick-link-left">
                <div className="quick-icon cart">
                  <FaCartPlus />
                </div>
                <span>My Cart</span>
              </div>
              <FaChevronRight className="quick-arrow" />
            </div>
 
          </div>
        )}
 
        {/* ── LOGOUT — ORIGINAL UNCHANGED ── */}
        {!editMode && (
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        )}
 
      </div>
    </div>
  );
}
