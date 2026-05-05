import React, { useState } from "react";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import "../../style/AdminCSS/order.css";

const Orders = () => {
  const [filter, setFilter] = useState("all");

  const orders = [
    { id: 1, customer: "John Doe",     item: "Burger",   status: "pending",   time: "2 mins ago",  amount: 150 },
    { id: 2, customer: "Jane Smith",   item: "Pizza",    status: "completed", time: "15 mins ago", amount: 200 },
    { id: 3, customer: "Bob Johnson",  item: "Coffee",   status: "preparing", time: "5 mins ago",  amount: 50  },
    { id: 4, customer: "Alice Brown",  item: "Sandwich", status: "cancelled", time: "1 hour ago",  amount: 120 },
  ];

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":    return <FiClock       className="status-icon pending"   />;
      case "preparing":  return <FiClock       className="status-icon preparing" />;
      case "completed":  return <FiCheckCircle className="status-icon completed" />;
      case "cancelled":  return <FiXCircle     className="status-icon cancelled" />;
      default:           return <FiClock       className="status-icon"           />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":   return "status-pending";
      case "preparing": return "status-preparing";
      case "completed": return "status-completed";
      case "cancelled": return "status-cancelled";
      default:          return "";
    }
  };

  return (
    <div className="orders-page">

      {/* ── Header (mirrors .menu-header) ── */}
      <div className="orders-header">
        <h1>📋 Order Management</h1>
        <p>Track and manage all customer orders</p>
      </div>

      {/* ── Controls ── */}
      <div className="orders-controls">
        <div className="orders-search-bar">
          <FiSearch className="orders-search-icon" />
          <input type="text" placeholder="Search orders..." />
        </div>
        <div className="filter-tabs">
          <FiFilter className="filter-icon" />
          {["all", "pending", "preparing", "completed"].map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${filter === tab ? "active" : ""}`}
              onClick={() => setFilter(tab)}
            >
              {tab === "all"
                ? "All Orders"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats (mirrors menu-item-card style) ── */}
      <div className="orders-stats">
        <div className="stat-card">
          <div className="stat-icon pending"><FiClock /></div>
          <div className="stat-info">
            <h3>{orders.filter((o) => o.status === "pending").length}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon preparing"><FiClock /></div>
          <div className="stat-info">
            <h3>{orders.filter((o) => o.status === "preparing").length}</h3>
            <p>Preparing</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed"><FiCheckCircle /></div>
          <div className="stat-info">
            <h3>{orders.filter((o) => o.status === "completed").length}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon cancelled"><FiXCircle /></div>
          <div className="stat-info">
            <h3>{orders.filter((o) => o.status === "cancelled").length}</h3>
            <p>Cancelled</p>
          </div>
        </div>
      </div>

      {/* ── Desktop Table ── */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Item</th>
              <th>Status</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">#{order.id.toString().padStart(4, "0")}</td>
                <td>{order.customer}</td>
                <td>{order.item}</td>
                <td>
                  <span className={`status-badge ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="order-time">{order.time}</td>
                <td className="amount">Rs {order.amount}</td>
                <td>
                  <button className="action-btn view-btn"><FiEye /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Card List ── */}
      <div className="orders-card-list">
        {filteredOrders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-card-header">
              <h4>#{order.id.toString().padStart(4, "0")}</h4>
              <span className={`status-badge ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="order-card-body">
              <div className="order-card-field">
                <label>Customer</label>
                <span>{order.customer}</span>
              </div>
              <div className="order-card-field">
                <label>Item</label>
                <span>{order.item}</span>
              </div>
              <div className="order-card-field">
                <label>Time</label>
                <span>{order.time}</span>
              </div>
              <div className="order-card-field">
                <label>Amount</label>
                <span className="amount">Rs {order.amount}</span>
              </div>
            </div>
            <div className="order-card-footer">
              <span className="amount">Rs {order.amount}</span>
              <button className="action-btn view-btn"><FiEye /></button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Orders;
