import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/profile.css";
import {
  FaArrowLeft,
  FaUserCircle,
  FaEdit,
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCamera,
  FaSave,
  FaTimes,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@campus.edu",
    phone: "+91 98765 43210",
    address: "Room 204, Block B, Campus Hostel",
    rollNo: "CS2021001",
    department: "Computer Science",
    year: "3rd Year",
    avatar: null,
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  // 💾 LOAD DATA
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const favData = JSON.parse(localStorage.getItem("favorites")) || [];
    const orderData = JSON.parse(localStorage.getItem("orders")) || [];
    const savedProfile = JSON.parse(localStorage.getItem("profile"));

    setCart(cartData);
    setFavorites(favData);
    setOrders(orderData);
    if (savedProfile) setProfile(savedProfile);
  }, []);

  // ✅ SAVE PROFILE
  const handleSave = () => {
    setProfile(tempProfile);
    localStorage.setItem("profile", JSON.stringify(tempProfile));
    setEditMode(false);
  };

  // ❌ CANCEL EDIT
  const handleCancel = () => {
    setTempProfile({ ...profile });
    setEditMode(false);
  };

  // 📸 AVATAR UPLOAD
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 📊 STATS
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((t, o) => t + o.total, 0);
  const totalFavorites = favorites.length;
  const cartItems = cart.reduce((t, i) => t + i.qty, 0);

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        <FaArrowLeft
          className="profile-back-btn"
          onClick={() => navigate("/")}
          title="Go Back"
        />
        <h2>My Profile</h2>
        <FaEdit
          className="profile-edit-icon"
          onClick={() => setEditMode(true)}
          title="Edit Profile"
          style={{ opacity: editMode ? 0 : 1 }}
        />
      </div>

      <div className="profile-content">

        {/* AVATAR SECTION */}
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

            {/* CAMERA BUTTON - only in edit mode */}
            {editMode && (
              <label className="camera-btn" title="Change Photo">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  hidden
                />
              </label>
            )}
          </div>

          {/* NAME & ROLL */}
          {!editMode && (
            <div className="avatar-info">
              <h3>{profile.name}</h3>
              <p>{profile.rollNo} • {profile.department}</p>
              <span className="year-badge">{profile.year}</span>
            </div>
          )}
        </div>

        {/* STATS ROW */}
        <div className="stats-row">
          <div className="stat-card" onClick={() => navigate("/orders")}>
            <FaShoppingBag className="stat-icon orders" />
            <span className="stat-value">{totalOrders}</span>
            <span className="stat-label">Orders</span>
          </div>

          <div className="stat-card" onClick={() => navigate("/favorites")}>
            <FaHeart className="stat-icon favs" />
            <span className="stat-value">{totalFavorites}</span>
            <span className="stat-label">Favorites</span>
          </div>

          <div className="stat-card" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="stat-icon cart" />
            <span className="stat-value">{cartItems}</span>
            <span className="stat-label">In Cart</span>
          </div>

          <div className="stat-card">
            <FaStar className="stat-icon spent" />
            <span className="stat-value">₹{totalSpent}</span>
            <span className="stat-label">Spent</span>
          </div>
        </div>

        {/* PROFILE DETAILS / EDIT FORM */}
        <div className="profile-card">
          <h3 className="section-title">
            {editMode ? "✏️ Edit Profile" : "Personal Information"}
          </h3>

          {editMode ? (
            // ✏️ EDIT FORM
            <div className="edit-form">

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, name: e.target.value })
                  }
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={tempProfile.email}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, email: e.target.value })
                  }
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={tempProfile.phone}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, phone: e.target.value })
                  }
                  placeholder="Enter your phone"
                />
              </div>

              <div className="form-group">
                <label>Address / Room No.</label>
                <input
                  type="text"
                  value={tempProfile.address}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, address: e.target.value })
                  }
                  placeholder="Enter your address"
                />
              </div>

              <div className="form-group">
                <label>Roll Number</label>
                <input
                  type="text"
                  value={tempProfile.rollNo}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, rollNo: e.target.value })
                  }
                  placeholder="Enter roll number"
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={tempProfile.department}
                  onChange={(e) =>
                    setTempProfile({
                      ...tempProfile,
                      department: e.target.value,
                    })
                  }
                  placeholder="Enter department"
                />
              </div>

              <div className="form-group">
                <label>Year</label>
                <select
                  value={tempProfile.year}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, year: e.target.value })
                  }
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>

              {/* SAVE / CANCEL BUTTONS */}
              <div className="edit-btns">
                <button className="save-btn" onClick={handleSave}>
                  <FaSave /> Save Changes
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
              </div>

            </div>
          ) : (
            // 👁️ VIEW MODE
            <div className="profile-details">

              <div className="detail-row">
                <FaEnvelope className="detail-icon" />
                <div>
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{profile.email}</span>
                </div>
              </div>

              <div className="detail-row">
                <FaPhone className="detail-icon" />
                <div>
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{profile.phone}</span>
                </div>
              </div>

              <div className="detail-row">
                <FaMapMarkerAlt className="detail-icon" />
                <div>
                  <span className="detail-label">Address</span>
                  <span className="detail-value">{profile.address}</span>
                </div>
              </div>

              <div className="detail-row">
                <FaCheckCircle className="detail-icon" />
                <div>
                  <span className="detail-label">Roll Number</span>
                  <span className="detail-value">{profile.rollNo}</span>
                </div>
              </div>

              <div className="detail-row">
                <FaCheckCircle className="detail-icon" />
                <div>
                  <span className="detail-label">Department</span>
                  <span className="detail-value">{profile.department}</span>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* QUICK LINKS */}
        {!editMode && (
          <div className="quick-links">
            <h3 className="section-title">Quick Links</h3>

            <div
              className="quick-link-item"
              onClick={() => navigate("/orders")}
            >
              <div className="quick-link-left">
                <FaShoppingBag className="quick-icon orders" />
                <span>My Orders</span>
              </div>
              <span className="quick-arrow">›</span>
            </div>

            <div
              className="quick-link-item"
              onClick={() => navigate("/favorites")}
            >
              <div className="quick-link-left">
                <FaHeart className="quick-icon favs" />
                <span>My Favorites</span>
              </div>
              <span className="quick-arrow">›</span>
            </div>

            <div
              className="quick-link-item"
              onClick={() => navigate("/cart")}
            >
              <div className="quick-link-left">
                <FaShoppingCart className="quick-icon cart" />
                <span>My Cart</span>
              </div>
              <span className="quick-arrow">›</span>
            </div>
          </div>
        )}

        {/* LOGOUT BUTTON */}
        {!editMode && (
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        )}

      </div>
    </div>
  );
}