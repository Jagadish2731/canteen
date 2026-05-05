import { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaCheckDouble,
  FaTrashAlt,
  FaShoppingBag,
  FaTag,
  FaBell,
  FaStar,
  FaMotorcycle,
} from "react-icons/fa";
import "../../style/UserCSS/Notification.css";
 
const DEFAULT_NOTIFICATIONS = [
  {
    id: 1,
    type: "order",
    title: "Order Confirmed! 🎉",
    message: "Your order of Veg Biryani & Masala Dosa has been confirmed. Preparing now!",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "delivery",
    title: "Order Ready for Pickup",
    message: "Your order #ORD-1042 is ready at the counter. Please collect it within 10 minutes.",
    time: "18 min ago",
    read: false,
  },
  {
    id: 3,
    type: "offer",
    title: "20% Off Today Only! 🔥",
    message: "Use code CANTEEN20 on orders above ₹100. Valid only today till 5 PM.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    type: "review",
    title: "Rate Your Last Order",
    message: "How was your Chicken Biryani? Share your experience and help others decide!",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "order",
    title: "Order Delivered ✅",
    message: "Your order #ORD-1038 has been delivered. Enjoy your meal!",
    time: "Yesterday, 1:15 PM",
    read: true,
  },
  {
    id: 6,
    type: "offer",
    title: "New Item: Paneer Burger 🍔",
    message: "We just added Paneer Burger to our menu at just ₹70. Try it today!",
    time: "Yesterday, 10:00 AM",
    read: true,
  },
  {
    id: 7,
    type: "system",
    title: "Canteen Timings Updated",
    message: "Canteen will now remain open till 8 PM on weekdays. Weekend hours unchanged.",
    time: "2 days ago",
    read: true,
  },
];
 
const ICON_MAP = {
  order:    <FaShoppingBag />,
  delivery: <FaMotorcycle />,
  offer:    <FaTag />,
  review:   <FaStar />,
  system:   <FaBell />,
};
 
export default function Notification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);
  const [filter, setFilter]               = useState("all");
 
  const unreadCount = notifications.filter((n) => !n.read).length;
 
  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "orders") return n.type === "order" || n.type === "delivery";
    if (filter === "offers") return n.type === "offer";
    return true;
  });
 
  const markAsRead  = (id) => setNotifications((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = ()   => setNotifications((p) => p.map((n) => ({ ...n, read: true })));
  const deleteOne   = (id) => setNotifications((p) => p.filter((n) => n.id !== id));
  const clearAll    = ()   => setNotifications([]);
 
  const content = (
    <div className="nf-page">
 
      {/* ── HEADER ── */}
      <div className="nf-topbar">
        <button className="nf-back" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h2 className="nf-topbar-title">
          <FaBell style={{ fontSize: "1rem" }} /> Notifications
          {unreadCount > 0 && <span className="nf-topbar-badge">{unreadCount}</span>}
        </h2>
        <button className="nf-cart-btn" onClick={() => navigate("/cart")}>
          <FaShoppingCart />
        </button>
      </div>
 
      {/* ── BODY ── */}
      <div className="nf-body">
 
        {/* Actions row */}
        {notifications.length > 0 && (
          <div className="nf-actions-row">
            {unreadCount > 0 && (
              <button className="nf-text-btn green" onClick={markAllRead}>
                <FaCheckDouble /> Mark all read
              </button>
            )}
            <button className="nf-text-btn red" onClick={clearAll}>
              <FaTrashAlt /> Clear all
            </button>
          </div>
        )}
 
        {/* Filter pills */}
        <div className="nf-filters">
          {["all", "unread", "orders", "offers"].map((f) => (
            <button
              key={f}
              className={`nf-pill ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "unread" && unreadCount > 0 && (
                <span className="nf-pill-badge">{unreadCount}</span>
              )}
            </button>
          ))}
        </div>
 
        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="nf-empty">
            <div className="nf-empty-icon">🔔</div>
            <h3>No Notifications Yet!</h3>
            <p>You're all caught up. Check back later ✨</p>
            <button className="nf-browse-btn" onClick={() => navigate("/home")}>
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="nf-list">
            {filtered.map((n, i) => (
              <div
                key={n.id}
                className={`nf-card ${n.read ? "read" : "unread"}`}
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => markAsRead(n.id)}
              >
                {!n.read && <span className="nf-dot" />}
 
                <div className={`nf-icon type-${n.type}`}>
                  {ICON_MAP[n.type]}
                </div>
 
                <div className="nf-card-body">
                  <p className="nf-card-title">{n.title}</p>
                  <p className="nf-card-msg">{n.message}</p>
                  <span className="nf-card-time">{n.time}</span>
                </div>
 
                <button
                  className="nf-x"
                  onClick={(e) => { e.stopPropagation(); deleteOne(n.id); }}
                >×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
 
  /* Render directly into document.body — escapes ALL parent containers */
  return ReactDOM.createPortal(content, document.body);
}
 