import React from "react";
import { FiCreditCard, FiDollarSign, FiCheckCircle, FiAlertCircle, FiClock, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import "../../style/AdminCSS/payment.css";

const Payments = () => {
  const transactions = [
    {
      id: 1,
      date: "2024-04-20",
      orderId: "#ORD001",
      amount: 250,
      method: "Credit Card",
      status: "completed",
      customer: "John Doe"
    },
    {
      id: 2,
      date: "2024-04-20",
      orderId: "#ORD002",
      amount: 150,
      method: "UPI",
      status: "completed",
      customer: "Jane Smith"
    },
    {
      id: 3,
      date: "2024-04-19",
      orderId: "#ORD003",
      amount: 320,
      method: "Debit Card",
      status: "completed",
      customer: "Bob Johnson"
    },
    {
      id: 4,
      date: "2024-04-19",
      orderId: "#ORD004",
      amount: 180,
      method: "Wallet",
      status: "pending",
      customer: "Alice Brown"
    }
  ];

  const paymentMethods = [
    { icon: "💳", name: "Credit Card", count: 120 },
    { icon: "📱", name: "UPI", count: 85 },
    { icon: "💰", name: "Wallet", count: 42 },
    { icon: "🏦", name: "Bank Transfer", count: 33 }
  ];

  const stats = [
    { label: "Total Revenue", value: "₹12,450", icon: FiDollarSign, color: "green" },
    { label: "Completed", value: "156", icon: FiCheckCircle, color: "blue" },
    { label: "Pending", value: "8", icon: FiClock, color: "orange" },
    { label: "Growth", value: "+12.5%", icon: FiTrendingUp, color: "teal" }
  ];

  return (
    <div className="payments">
      <div className="payments-header">
        <FiCreditCard className="header-icon" />
        <h1>Payment Management</h1>
        <p>Track and manage all transactions</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className={`stat-icon ${stat.color}`}>
                <Icon />
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="content-grid">
        <div className="payment-methods-section">
          <h2>Payment Methods</h2>
          <div className="methods-grid">
            {paymentMethods.map((method, index) => (
              <div key={index} className="method-card">
                <div className="method-icon">{method.icon}</div>
                <h4>{method.name}</h4>
                <p>{method.count} transactions</p>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-transactions-section">
          <h2>Recent Transactions</h2>
          <div className="transactions-list">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-left">
                    <div className={`transaction-icon ${transaction.status}`}>
                      {transaction.status === "completed" ? <FiCheckCircle /> : <FiClock />}
                    </div>
                    <div className="transaction-details">
                      <p className="transaction-order">{transaction.orderId}</p>
                      <span className="transaction-method">{transaction.method}</span>
                    </div>
                  </div>
                  <div className="transaction-amount">₹{transaction.amount}</div>
                </div>
                <div className="transaction-footer">
                  <span className="transaction-date">{transaction.date}</span>
                  <span className={`transaction-status ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;