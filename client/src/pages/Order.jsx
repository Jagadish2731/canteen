import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/order.css";
import {
  FaArrowLeft,
  FaShoppingBag,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaReceipt,
} from "react-icons/fa";

const dummyOrders = [
  {
    id: "ORD001",
    date: "2025-01-20",
    time: "12:30 PM",
    status: "Delivered",
    items: [
      { name: "Veg Biryani",  qty: 2, price: 80 },
      { name: "Chai",         qty: 1, price: 10 },
    ],
    total: 170,
  },
  {
    id: "ORD002",
    date: "2025-01-21",
    time: "01:15 PM",
    status: "Preparing",
    items: [
      { name: "Masala Dosa", qty: 1, price: 50 },
      { name: "Vada Pav",    qty: 2, price: 30 },
    ],
    total: 110,
  },
  {
    id: "ORD003",
    date: "2025-01-22",
    time: "11:00 AM",
    status: "Cancelled",
    items: [
      { name: "Chicken Biryani", qty: 1, price: 200 },
      { name: "Paneer Wrap",     qty: 1, price: 60  },
    ],
    total: 260,
  },
  {
    id: "ORD004",
    date: "2025-01-23",
    time: "02:00 PM",
    status: "Delivered",
    items: [
      { name: "Paneer Wrap", qty: 3, price: 60 },
      { name: "Chai",        qty: 2, price: 10 },
    ],
    total: 200,
  },
];

export default function Order() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("All");

  // 📦 LOAD ORDERS
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders"));
    if (saved && saved.length > 0) {
      setOrders(saved);
    } else {
      setOrders(dummyOrders);
      localStorage.setItem("orders", JSON.stringify(dummyOrders));
    }
  }, []);

  // 🔍 FILTER ORDERS
  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((o) => o.status === filter);

  // 🎨 STATUS STYLE - updated for white/green theme
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return { color: "#2e7d32", icon: <FaCheckCircle /> };
      case "Preparing":
        return { color: "#f57c00", icon: <FaClock /> };
      case "Cancelled":
        return { color: "#e53935", icon: <FaTimesCircle /> };
      default:
        return { color: "#888",    icon: <FaClock /> };
    }
  };

  return (
    <div className="order-page">

      {/* HEADER */}
      <div className="order-header">
        <FaArrowLeft
          className="order-back-btn"
          onClick={() => navigate("/")}
          title="Go Back"
        />
        <h2>My Orders</h2>
        <FaShoppingBag className="order-bag-icon" />
      </div>

      {/* FILTER TABS */}
      <div className="order-filters">
        {["All", "Delivered", "Preparing", "Cancelled"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredOrders.length === 0 ? (
        <div className="order-empty">
          <FaShoppingBag className="order-empty-icon" />
          <h3>No Orders Found!</h3>
          <p>
            You have no{" "}
            {filter !== "All" ? filter.toLowerCase() : ""} orders
          </p>
          <button
            className="order-browse-btn"
            onClick={() => navigate("/")}
          >
            Order Now
          </button>
        </div>
      ) : (

        // ORDERS LIST
        <div className="order-list">
          {filteredOrders.map((order) => {
            const statusStyle = getStatusStyle(order.status);
            return (
              <div className="order-card" key={order.id}>

                {/* CARD TOP */}
                <div className="order-card-top">
                  <div className="order-id">
                    <FaReceipt className="receipt-icon" />
                    <span>#{order.id}</span>
                  </div>
                  <div
                    className="order-status"
                    style={{ color: statusStyle.color }}
                  >
                    {statusStyle.icon}
                    <span>{order.status}</span>
                  </div>
                </div>

                {/* ITEMS PREVIEW */}
                <div className="order-items-preview">
                  {order.items.map((item, index) => (
                    <span key={index} className="order-item-tag">
                      {item.name} x{item.qty}
                    </span>
                  ))}
                </div>

                {/* CARD BOTTOM */}
                <div className="order-card-bottom">
                  <div className="order-meta">
                    <span>📅 {order.date}</span>
                    <span>🕐 {order.time}</span>
                  </div>
                  <div className="order-footer">
                    <span className="order-total">₹{order.total}</span>
                    <button
                      className="order-details-btn"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ORDER DETAIL MODAL */}
      {selectedOrder && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="modal-header">
              <h3>Order #{selectedOrder.id}</h3>
              <FaTimesCircle
                className="modal-close"
                onClick={() => setSelectedOrder(null)}
              />
            </div>

            {/* MODAL STATUS */}
            <div
              className="modal-status"
              style={{
                color: getStatusStyle(selectedOrder.status).color,
              }}
            >
              {getStatusStyle(selectedOrder.status).icon}
              <span>{selectedOrder.status}</span>
            </div>

            {/* MODAL DATE TIME */}
            <div className="modal-datetime">
              <span>📅 {selectedOrder.date}</span>
              <span>🕐 {selectedOrder.time}</span>
            </div>

            <hr className="modal-divider" />

            {/* MODAL ITEMS */}
            <div className="modal-items">
              <h4>Items Ordered</h4>
              {selectedOrder.items.map((item, index) => (
                <div className="modal-item-row" key={index}>
                  <span className="modal-item-name">
                    {item.name} x{item.qty}
                  </span>
                  <span className="modal-item-price">
                    ₹{item.price * item.qty}
                  </span>
                </div>
              ))}
            </div>

            <hr className="modal-divider" />

            {/* MODAL TOTAL */}
            <div className="modal-total-row">
              <span>Total Amount</span>
              <span className="modal-total-price">
                ₹{selectedOrder.total}
              </span>
            </div>

            {/* REORDER BUTTON */}
            {selectedOrder.status !== "Preparing" && (
              <button
                className="reorder-btn"
                onClick={() => {
                  navigate("/");
                  setSelectedOrder(null);
                }}
              >
                🔁 Reorder
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}